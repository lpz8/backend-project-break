require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);


app.use(express.static('public'));


app.use('/products', productRoutes);
app.use('/auth', authRoutes);


app.get('/', (req, res) => {
  res.redirect('/products');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});