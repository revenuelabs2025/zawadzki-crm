document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    const fullNameInput = document.getElementById('full_name');
    const registerToast = document.getElementById('register-toast');
    const toastMessage = registerToast.querySelector('#toast-message');

    function showToast(message, type = 'info') {
        toastMessage.textContent = message;
        registerToast.classList.remove('hidden');
        registerToast.classList.add('show');

        const icon = registerToast.querySelector('i');
        icon.className = '';
        if (type === 'success') {
            icon.classList.add('fas', 'fa-check-circle', 'text-green-400');
        } else if (type === 'error') {
            icon.classList.add('fas', 'fa-times-circle', 'text-red-400');
        } else {
            icon.classList.add('fas', 'fa-info-circle', 'text-blue-400');
        }

        setTimeout(() => {
            registerToast.classList.remove('show');
            registerToast.classList.add('hidden');
        }, 3000);
    }

    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const login = loginInput.value;
        const password = passwordInput.value;
        const fullName = fullNameInput.value;

        const { error } = await window.supabaseClient
            .from('profiles')
            .insert({ full_name: fullName, login: login, pass: password });

        if (error) {
            console.error('Registration error:', error);
            console.error('Status:', error.status);
            console.error('Details:', error.details);
            console.error('Hint:', error.hint);
            if (error.status === 401 || error.status === 403) {
                showToast('Brak uprawnień do wykonania tej operacji.', 'error');
            } else {
                showToast(error.message, 'error');
            }
        } else {
            showToast('Rejestracja pomyślna!', 'success');
        }
    });
});
