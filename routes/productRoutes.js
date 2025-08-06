const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/authMiddleware');

router.get('/', isAdmin, (req, res) => {
  res.send('Lista de productos');
});

router.get('/new', isAdmin, (req, res) => {
  res.send('Formulario para nuevo producto');
});

module.exports = router;