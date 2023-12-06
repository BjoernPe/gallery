    // Überprüfen, ob der Benutzer eingeloggt ist
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
        // Benutzer ist nicht eingeloggt, weiterleiten zur Login-Seite
        window.location.href = './login.html';
    }

// Funktion zum Abrufen des Benutzernamens
function getUsername() {
    return localStorage.getItem('username');
  }
