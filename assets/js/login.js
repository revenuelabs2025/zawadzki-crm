document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginToast = document.getElementById('login-toast');
    const toastMessage = loginToast.querySelector('#toast-message');

    // Clear any existing session on load
    localStorage.removeItem('currentUser');

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

        const username = usernameInput.value;
        const password = passwordInput.value;

        const { data, error } = await window.supabaseClient
            .from('profiles')
            .select('id, full_name')
            .eq('login', username)
            .eq('pass', password)
            .single();

        if (error) {
            console.error('Login error:', error);
            showToast(error.message || 'Nieprawidłowy login lub hasło.', 'error');
        } else if (!data) {
            showToast('Nieprawidłowy login lub hasło.', 'error');
        } else {
            localStorage.setItem('currentUser', JSON.stringify(data));
            showToast('Logowanie pomyślne!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    });
});
