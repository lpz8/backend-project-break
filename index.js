require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('¡Conectado a MongoDB!');
}).catch((error) => {
  console.error('Error con MongoDB:', error.message);
});

// Hacer que el servidor entienda mensajes
app.use(express.json());

// Una página para probar
app.get('/', (req, res) => {
  res.send('¡Mi tienda funciona!');
});

// Encender el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor encendido en http://localhost:${PORT}`);
});