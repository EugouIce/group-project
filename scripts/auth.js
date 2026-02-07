// auth.js - Authentication logic using database.js
console.log('🔐 Loading authentication system...');

// Check if database is available
if (!window.supabaseClient) {
    console.error('⚠️ Database not connected. Make sure database.js loads first');
}

// Authentication functions
const Auth = {
    /**
     * Login user with student ID/email and password
     */
    async login(identifier, password) {
        if (!window.supabaseClient) {
            return { success: false, error: 'Database not available' };
        }
        
        try {
            // Try to find user by student_id or email
            const { data: user, error } = await window.supabaseClient
                .from('users')
                .select('*')
                .or(`student_id.eq.${identifier},email.eq.${identifier}`)
                .single();
            
            if (error || !user) {
                return { success: false, error: 'Account not found' };
            }
            
            // Check password
            if (user.password !== password) {
                return { success: false, error: 'Invalid password' };
            }
            
            // Create session
            const sessionData = {
                id: user.id,
                email: user.email,
                role: user.role,
                full_name: user.full_name,
                student_id: user.student_id,
                phone: user.phone_number,
                loggedInAt: new Date().toISOString()
            };
            
            localStorage.setItem('icct_user_session', JSON.stringify(sessionData));
            
            return {
                success: true,
                user: sessionData,
                redirect: user.role === 'student' ? 'student-dashboard.html' : 'teacher-dashboard.html' //change this if you have the updated dashboard
            };
            
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'System error' };
        }
    },
    
    /**
     * Get current logged in user
     */
    getCurrentUser() {
        const userStr = localStorage.getItem('icct_user_session');
        return userStr ? JSON.parse(userStr) : null;
    },
    
    /**
     * Check if user is logged in
     */
    isLoggedIn() {
        return !!localStorage.getItem('icct_user_session');
    },
    
    /**
     * Check user role
     */
    hasRole(role) {
        const user = this.getCurrentUser();
        return user && user.role === role;
    },
    
    /**
     * Logout user
     */
    logout() {
        localStorage.removeItem('icct_user_session');
        window.location.href = 'login.html';
    },
    
    /**
     * Require authentication for a page
     */
    requireAuth(requiredRole = null) {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        
        if (requiredRole && !this.hasRole(requiredRole)) {
            alert('Access denied. Insufficient permissions.');
            this.logout();
            return false;
        }
        
        return true;
    }
};

// Make Auth globally available
window.Auth = Auth;