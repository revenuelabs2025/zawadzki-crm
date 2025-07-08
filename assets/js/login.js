        document.addEventListener('DOMContentLoaded', function() {
            const loginForm = document.getElementById('login-form');
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const loginToast = document.getElementById('login-toast');
            const toastMessage = loginToast.querySelector('#toast-message');

            function showToast(message, type = 'info') {
                toastMessage.textContent = message;
                loginToast.classList.remove('hidden');
                loginToast.classList.add('show');

                // Update icon and color based on type
                const icon = loginToast.querySelector('i');
                icon.className = ''; // Clear existing classes
                if (type === 'success') {
                    icon.classList.add('fas', 'fa-check-circle', 'text-green-400');
                } else if (type === 'error') {
                    icon.classList.add('fas', 'fa-times-circle', 'text-red-400');
                } else { // info
                    icon.classList.add('fas', 'fa-info-circle', 'text-blue-400');
                }

                setTimeout(() => {
                    loginToast.classList.remove('show');
                    loginToast.classList.add('hidden');
                }, 3000);
            }

            loginForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent default form submission

                const username = usernameInput.value;
                const password = passwordInput.value;

                // Simple validation (replace with actual authentication logic)
                if (username === 'user@example.com' && password === 'password123') {
                    showToast('Logowanie pomyślne!', 'success');
                    // In a real application, redirect to the main dashboard
                    // window.location.href = '/dashboard';
                } else {
                    showToast('Nieprawidłowa nazwa użytkownika lub hasło.', 'error');
                }
            });
        });
