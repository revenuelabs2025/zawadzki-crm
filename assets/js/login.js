document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    const loginToast = document.getElementById('login-toast');
    const toastMessage = loginToast.querySelector('#toast-message');

    function showToast(message, type = 'info') {
        toastMessage.textContent = message;
        loginToast.classList.remove('hidden');
        loginToast.classList.add('show');

        const icon = loginToast.querySelector('i');
        icon.className = '';
        if (type === 'success') {
            icon.classList.add('fas', 'fa-check-circle', 'text-green-400');
        } else if (type === 'error') {
            icon.classList.add('fas', 'fa-times-circle', 'text-red-400');
        } else {
            icon.classList.add('fas', 'fa-info-circle', 'text-blue-400');
        }

        setTimeout(() => {
            loginToast.classList.remove('show');
            loginToast.classList.add('hidden');
        }, 3000);
    }

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const login = loginInput.value.trim();
        const password = passwordInput.value.trim();

        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email: login,
            password: password,
        });

        if (error) {
            console.error('Login error:', error);
            if (error.status === 401 || error.status === 403) {
                showToast('Nieprawidłowe dane logowania.', 'error');
            } else {
                showToast(error.message, 'error');
            }
        } else {
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            showToast('Zalogowano pomyślnie!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    });
});
