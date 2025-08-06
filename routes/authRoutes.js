const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
  res.send('Página de login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USER && bcrypt.compareSync(password, process.env.ADMIN_PASSWORD)) {
    req.session.user = username;
    res.send('Inicio de sesión exitoso');
  } else {
    res.status(401).send('Credenciales inválidas');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send('Sesión cerrada');
  });
});

module.exports = router;