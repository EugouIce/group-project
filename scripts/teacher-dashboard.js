// teacher-dashboard.js - Teacher dashboard logic
console.log('👨‍🏫 Loading teacher dashboard...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Teacher dashboard ready');
    
    // Check authentication
    if (!window.Auth || !Auth.requireAuth('teacher')) {
        return;
    }
    
    // Get teacher data
    const teacher = Auth.getCurrentUser();
    console.log('Teacher data:', teacher);
    
    // Update UI
    updateTeacherUI(teacher);
    
    // Setup logout button
    const logoutBtn = document.querySelector('.btn');
    if (logoutBtn && logoutBtn.textContent.includes('Logout')) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            Auth.logout();
        });
    }
});

function updateTeacherUI(teacher) {
    // Update name
    const nameElement = document.getElementById('teacherName');
    if (nameElement && teacher) {
        nameElement.textContent = teacher.full_name || 'Teacher';
    }
    
    // Update email/ID display
    const userInfo = document.querySelector('.user-info p');
    if (userInfo && teacher) {
        userInfo.innerHTML = `
            ${teacher.email || 'teacher@icct.edu.ph'} <br>
            ${teacher.student_id ? `ID: ${teacher.student_id}` : ''}
        `;
    }
    
    // Update page title
    if (teacher && teacher.full_name) {
        document.title = `${teacher.full_name} - Teacher Dashboard`;
    }
}

// Add to teacher-dashboard.html head:
// <script src="teacher-dashboard.js"></script>