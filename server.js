const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const dataDir = path.join(__dirname, 'data');
const contactsPath = path.join(dataDir, 'contacts.json');

function ensureDataStorage() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  if (!fs.existsSync(contactsPath)) {
    fs.writeFileSync(contactsPath, '[]', 'utf-8');
  }
}

function saveContactMessage(contact) {
  const existingData = JSON.parse(fs.readFileSync(contactsPath, 'utf-8')); 
  existingData.push(contact);
  fs.writeFileSync(contactsPath, JSON.stringify(existingData, null, 2), 'utf-8');
}

ensureDataStorage();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Abrelazos backend activo'
  });
});

app.get('/api/servicios', (req, res) => {
  res.json([
    { id: 1, title: 'Orientación legal', description: 'Apoyo y asesoría para procesos migratorios y derechos humanos.' },
    { id: 2, title: 'Acompañamiento social', description: 'Programas comunitarios de integración y bienestar.' },
    { id: 3, title: 'Capacitación', description: 'Talleres de inclusión laboral, idiomas y empoderamiento.' }
  ]);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const contactMessage = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString()
  };

  try {
    saveContactMessage(contactMessage);
    res.json({ success: true, message: 'Mensaje enviado correctamente. Gracias por escribirnos.' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Error interno del servidor. Intenta de nuevo más tarde.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
