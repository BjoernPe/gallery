const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Multer-Konfiguration für den Dateiupload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'images', 'upload', 'hongkong'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Endpoint zum Lesen der Bilddateien
app.get('/images', async (req, res) => {
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
app.post('/upload', upload.array('images'), (req, res) => {
  // Hier könntest du zusätzliche Verarbeitung nach dem Hochladen implementieren
  res.json({ message: 'Upload successful' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
