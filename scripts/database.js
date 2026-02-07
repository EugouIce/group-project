// database.js - Global Supabase connection ONLY
console.log('🔌 Loading database connection...');

// Configuration
const SUPABASE_URL = 'https://skbfjjqardcgdfaupzog.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrYmZqanFhcmRjZ2RmYXVwem9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0Njc0NTUsImV4cCI6MjA4NjA0MzQ1NX0.80-raIjAfQmoFGpRsfZgwn7QDCW9ByvGATcU8f4cN1g';

// Initialize Supabase
let supabaseClient = null;

try {
    if (typeof supabase === 'undefined') {
        throw new Error('Supabase CDN not loaded');
    }
    
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Database connection established');
    
    // Make it globally available
    window.supabaseClient = supabaseClient;
    
} catch (error) {
    console.error('❌ Database connection failed:', error);
    window.supabaseClient = null;
}

// Optional: Test connection function
window.testDbConnection = async function() {
    if (!window.supabaseClient) {
        console.error('No database connection');
        return false;
    }
    
    try {
        const { error } = await window.supabaseClient
            .from('users')
            .select('count')
            .limit(1);
        
        if (error) throw error;
        console.log('✅ Database test successful');
        return true;
    } catch (err) {
        console.error('❌ Database test failed:', err);
        return false;
    }
};

// Auto test on load
setTimeout(() => {
    if (window.supabaseClient) {
        window.testDbConnection();
    }
}, 1000);