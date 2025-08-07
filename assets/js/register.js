document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const fullNameInput = document.getElementById('full_name');
    const roleInput = document.getElementById('role');
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

        const email = emailInput.value;
        const password = passwordInput.value;
        const fullName = fullNameInput.value;
        const role = roleInput.value;

        const { data, error } = await window.supabaseClient.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            showToast(error.message, 'error');
            return;
        }

        const user = data.user;
        const { error: profileError } = await window.supabaseClient
            .from('profiles')
            .insert({ id: user.id, full_name: fullName, role: role });

        if (profileError) {
            showToast('Rejestracja powiodła się, ale zapis profilu nie powiódł się.', 'error');
        } else {
            showToast('Rejestracja pomyślna!', 'success');
        }
    });
});
