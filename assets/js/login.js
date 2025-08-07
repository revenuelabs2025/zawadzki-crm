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

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        const { data: sessionData, error: signInError } = await window.supabaseClient.auth.signInWithPassword({
            email: username,
            password: password
        });

        if (signInError) {
            console.error('Login error:', signInError);
            showToast(signInError.message || 'Nieprawidłowy login lub hasło.', 'error');
            return;
        }

        const { data: { user } } = await window.supabaseClient.auth.getUser();

        const { data: profileData, error: profileError } = await window.supabaseClient
            .from('profiles')
            .select('id, full_name')

            .eq('login', username)
            .eq('pass', password);

        if (error) {
            console.error('Login error:', error);
            console.error('Status:', error.status);
            console.error('Details:', error.details);
            console.error('Hint:', error.hint);
            if (error.status === 401 || error.status === 403) {
                showToast('Brak uprawnień do wykonania tej operacji.', 'error');
            } else {
                showToast(error.message || 'Nieprawidłowy login lub hasło.', 'error');
            }
        } else if (!data || data.length === 0) {
            showToast('Nieprawidłowy login lub hasło.', 'error');
        } else {
            const user = data[0];
            localStorage.setItem('currentUser', JSON.stringify(user));
            showToast('Logowanie pomyślne!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }

        localStorage.setItem('currentUser', JSON.stringify(profileData));
        showToast('Logowanie pomyślne!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });
});
