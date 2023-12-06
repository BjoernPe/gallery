const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');
const cors = require('cors'); // CORS-Modul hinzugefügt

const app = express();
const port = process.env.PORT || 3000; // Dynamischer Port für Netlify

// Middleware für den Dateiupload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'images', 'upload', 'hongkong'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// CORS aktivieren
app.use(cors());

// Statisches Verzeichnis für die Client-Anwendung
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint zum Lesen der Bilddateien
app.get('../images', async (req, res) => {
  try {
    const imageDir = path.join(__dirname, 'public', 'images', 'upload', 'hongkong');
    const files = await fs.readdir(imageDir);

    const images = files.map(file => ({
      name: file,
      path: path.join('images', 'upload', 'hongkong', file),
    }));

    res.json(images);
  } catch (error) {
    console.error('Error reading images:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint zum Hochladen von Bildern
app.post('../upload', upload.array('images'), (req, res) => {
  // Hier könntest du zusätzliche Verarbeitung nach dem Hochladen implementieren
  res.json({ message: 'Upload successful' });
});

// Endpoint zum Löschen von Bildern
app.delete('/delete', async (req, res) => {
  try {
    const imagePath = req.query.path;
    const absolutePath = path.join(__dirname, 'public', 'images', 'upload', 'hongkong', path.basename(imagePath));
    console.log('Bild:', absolutePath);
    await fs.unlink(absolutePath);
    
    res.json({ success: true, message: 'Bild erfolgreich gelöscht' });
  } catch (error) {
    console.error('Bild:',  req.query.path);
    console.error('Fehler beim Löschen des Bildes:', error);
    res.status(500).json({ success: false, message: 'Interner Serverfehler' });
  }
});

// Alle anderen Anfragen werden zur index.html weitergeleitet
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
