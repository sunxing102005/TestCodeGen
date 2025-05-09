document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const togglePasswordIcon = document.getElementById('toggle-password-icon');
    
    // Toggle password visibility
    togglePasswordIcon.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePasswordIcon.classList.remove('fa-eye');
            togglePasswordIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            togglePasswordIcon.classList.remove('fa-eye-slash');
            togglePasswordIcon.classList.add('fa-eye');
        }
    });
    
    // Form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Reset error message
        errorMessage.textContent = '';
        
        // Get input values
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Basic validation
        if (username === '' || password === '') {
            errorMessage.textContent = 'Please enter both username and password';
            return;
        }
        
        // Email validation if username is an email
        if (username.includes('@')) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(username)) {
                errorMessage.textContent = 'Please enter a valid email address';
                return;
            }
        }
        
        // Password validation (minimum 6 characters)
        if (password.length < 6) {
            errorMessage.textContent = 'Password must be at least 6 characters long';
            return;
        }
        
        // Simulate login API call
        simulateLogin(username, password);
    });
    
    // Simulate login API call
    function simulateLogin(username, password) {
        // Show loading state
        const loginBtn = document.querySelector('.login-btn');
        const originalBtnText = loginBtn.textContent;
        loginBtn.textContent = 'Logging in...';
        loginBtn.disabled = true;
        
        // Simulate API delay
        setTimeout(function() {
            // This is where you would normally make an API call to your backend
            // For demo purposes, we'll just check for a demo account
            if (username === 'demo@example.com' && password === 'password123') {
                // Successful login
                errorMessage.textContent = '';
                errorMessage.style.color = '#2ecc71';
                errorMessage.textContent = 'Login successful! Redirecting...';
                
                // Redirect after a short delay (in a real app, this would go to your dashboard)
                setTimeout(function() {
                    alert('Login successful! In a real application, you would be redirected to the dashboard.');
                    loginForm.reset();
                    errorMessage.textContent = '';
                    errorMessage.style.color = '#e74c3c';
                }, 1500);
            } else {
                // Failed login
                errorMessage.textContent = 'Invalid username or password';
            }
            
            // Reset button state
            loginBtn.textContent = originalBtnText;
            loginBtn.disabled = false;
        }, 1500);
    }
    
    // Add input event listeners for real-time validation
    usernameInput.addEventListener('input', function() {
        if (errorMessage.textContent !== '') {
            // Clear error when user starts typing
            errorMessage.textContent = '';
        }
    });
    
    passwordInput.addEventListener('input', function() {
        if (errorMessage.textContent !== '') {
            // Clear error when user starts typing
            errorMessage.textContent = '';
        }
    });
});

