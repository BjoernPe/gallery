// Funktion zum Ausloggen
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  window.location.href = "./login.html"; // Weiterleitung zur Login-Seite
}

function uploadImages() {
  const input = document.getElementById("imageUploadModal");
  const files = input.files;

  if (files.length > 0) {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Upload response:", data);
        location.reload();
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
        alert("Fehler beim Hochladen");
      });
  } else {
    console.warn("No files selected for upload.");
  }
}

// Lade Bilder vom Server
document.addEventListener("DOMContentLoaded", function () {
  const imageContainer = document.getElementById("imageContainer");

  fetch("/images")
    .then((response) => response.json())
    .then((images) => {
      images.forEach((image) => {
        const galleryItem = document.createElement("div");
        galleryItem.className = "col-md-4 mb-4 gallery-item";

        const img = document.createElement("img");
        img.src = image.path; // Hier die Bild-URL direkt setzen
        img.alt = image.name;

        galleryItem.appendChild(img);
        imageContainer.appendChild(galleryItem);
      });
    })
    .catch((error) => {
      console.error('Error fetching images:', error);
      alert("Fehler beim Abrufen von Bildern");
    });
});
  

document.addEventListener("DOMContentLoaded", function () {
  const uploadLink = document.getElementById("uploadLink");

  const username = getUsername();

  if (username == "admin") {
    // Wenn der Benutzer admin eingeloggt ist, zeige den Upload-Link an
    console.log(`Benutzer eingeloggt als: ${username}`);
    uploadLink.style.display = "block";
  } else {
    // Andernfalls verstecke den Upload-Link
    console.log(`Benutzer eingeloggt als: ${username}`);
    uploadLink.style.display = "none";
  }
});
