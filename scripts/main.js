// main.js - Login page specific logic
console.log('📄 Loading login page logic...');

// Wait for Auth to be available
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Login page ready');
    
    // Setup login form
    const loginForm = document.querySelector('.online-student');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
        console.log('✅ Login form initialized');
    }
    
    // Setup new student form
    const newStudentForm = document.querySelector('.new-student');
    if (newStudentForm) {
        newStudentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Contact admissions for new student accounts.');
        });
    }
    
    // Setup other buttons
    document.querySelectorAll('.secondary').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('For assistance, contact the IT department.');
        });
    });
    
    // Auto-fill for testing
    setupTestAutoFill();
    
    // Clear errors on input
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', clearMessages);
    });
});

/**
 * Handle login form submission
 */
async function handleLoginSubmit(event) {
    event.preventDefault();
    
    const identifier = document.getElementById('os-id').value.trim();
    const password = document.getElementById('os-password').value;
    
    // Validation - allow empty identifier if using email
    if (!identifier && !password) {
        showMessage('Please enter Student ID/Email and Password', 'error');
        return;
    }
    
    if (!password) {
        showMessage('Please enter Password', 'error');
        return;
    }
    
    // Show loading
    const loginBtn = document.querySelector('.online-student .primary');
    const originalText = loginBtn.textContent;
    loginBtn.textContent = 'Logging in...';
    loginBtn.disabled = true;
    
    try {
        const result = await Auth.login(identifier, password);
        
        if (result.success) {
            showMessage(`Welcome, ${result.user.full_name}!`, 'success');
            
            // Redirect after delay
            setTimeout(() => {
                window.location.href = result.redirect;
            }, 1000);
            
        } else {
            showMessage(result.error, 'error');
        }
        
    } catch (error) {
        console.error('Login error:', error);
        showMessage('System error. Please try again.', 'error');
        
    } finally {
        loginBtn.textContent = originalText;
        loginBtn.disabled = false;
    }
}

/**
 * Show message to user
 */
function showMessage(text, type = 'info') {
    // Remove existing messages
    clearMessages();
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    
    const styles = {
        error: 'background:#ffebee;color:#c62828;border-color:#ffcdd2;',
        success: 'background:#e8f5e9;color:#2e7d32;border-color:#c8e6c9;',
        info: 'background:#e3f2fd;color:#1565c0;border-color:#bbdefb;'
    };
    
    messageDiv.style.cssText = `
        ${styles[type]}
        padding: 12px;
        border-radius: 6px;
        margin: 15px 0;
        border: 1px solid;
        font-size: 14px;
        animation: fadeIn 0.3s ease;
    `;
    
    messageDiv.textContent = text;
    
    // Add to form
    const form = document.querySelector('.online-student');
    if (form) {
        const desc = form.querySelector('.desc');
        if (desc) {
            desc.insertAdjacentElement('afterend', messageDiv);
        }
    }
    
    // Add animation style if not exists
    if (!document.querySelector('#message-animations')) {
        const style = document.createElement('style');
        style.id = 'message-animations';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Clear all messages
 */
function clearMessages() {
    document.querySelectorAll('.error-message, .success-message, .info-message')
        .forEach(el => el.remove());
}

/**
 * Setup test auto-fill
 */
function setupTestAutoFill() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('test')) {
        const testType = params.get('test');
        
        if (testType === 'student') {
            document.getElementById('os-id').value = '2023-001';
            document.getElementById('os-password').value = 'student123';
            showMessage('Student test account auto-filled', 'info');
            
        } else if (testType === 'teacher') {
            // Now teachers can use either ID or email
            document.getElementById('os-id').value = 'TEA-002'; // or 'teacher@icct.edu.ph'
            document.getElementById('os-password').value = 'teacher123';
            showMessage('Teacher test account auto-filled', 'info');
        }
    }
}

// Test function
window.testLogin = function(type = 'student') {
    if (type === 'student') {
        document.getElementById('os-id').value = '2023-001';
        document.getElementById('os-password').value = 'student123';
    } else {
        // Teachers can now use their ID
        document.getElementById('os-id').value = 'TEA-002';
        document.getElementById('os-password').value = 'teacher123';
    }
    showMessage(`${type} account filled for testing`, 'info');
};