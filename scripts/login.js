
    async function validateLogin() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        // Laden der JSON-Daten
        const response = await fetch('./data/login.json');
        const data = await response.json();

        // Überprüfen von Benutzername und Passwort
        const user = data.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('username', username);
            console.log('Login successful');
            window.location.href = 'index.html';
        } else {
            showAlert('danger', 'Login failed');
        }
    }

    function showAlert(type, message) {
        var alertContainer = document.getElementById('alert-container');
        var alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.role = 'alert';
        alert.textContent = message;
        alertContainer.innerHTML = ''; // Löscht vorherige Meldungen
        alertContainer.appendChild(alert);
    }
