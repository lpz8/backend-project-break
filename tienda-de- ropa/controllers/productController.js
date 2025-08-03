const Product = require('../models/Product');
const { getProductCards, getProductForm, baseHtml, getNavBar } = require('../helpers/template');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.showProducts = async (req, res) => {
  const products = await Product.find();
  const productCards = getProductCards(products, false);
  const html = baseHtml('Tienda de Ropa', getNavBar(false) + productCards);
  res.send(html);
};


exports.showProductById = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return res.status(404).send('Producto no encontrado');
  
  const isDashboard = req.url.includes('dashboard');
  const html = baseHtml(
    product.name,
    getNavBar(isDashboard) +
    `
      <div class="product-detail">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Categoría: ${product.category}</p>
        <p>Talla: ${product.size}</p>
        <p>Precio: ${product.price}€</p>
        ${isDashboard ? `
          <a href="/dashboard/${product._id}/edit">Editar</a>
          <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST">
            <button type="submit">Eliminar</button>
          </form>
        ` : ''}
      </div>
    `
  );
  res.send(html);
};


exports.showDashboard = async (req, res) => {
  const products = await Product.find();
  const productCards = getProductCards(products, true);
  const html = baseHtml('Dashboard', getNavBar(true) + productCards);
  res.send(html);
};


exports.showNewProduct = (req, res) => {
  const html = baseHtml('Nuevo Producto', getNavBar(true) + getProductForm());
  res.send(html);
};


exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, size, price } = req.body;
    let imageUrl = req.body.image; 

    
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const product = new Product({ name, description, image: imageUrl, category, size, price });
    await product.save();
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('Error al crear el producto');
  }
};


exports.showEditProduct = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return res.status(404).send('Producto no encontrado');
  
  const html = baseHtml('Editar Producto', getNavBar(true) + getProductForm(product));
  res.send(html);
};


exports.updateProduct = async (req, res) => {
  try {
    const { name, description, category, size, price } = req.body;
    let imageUrl = req.body.image;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    await Product.findByIdAndUpdate(req.params.productId, {
      name,
      description,
      image: imageUrl,
      category,
      size,
      price,
    });
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('Error al actualizar el producto');
  }
};


exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.productId);
  res.redirect('/dashboard');
};


exports.getProductsApi = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProductByIdApi = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(product);
};

exports.createProductApi = async (req, res) => {
  try {
    const { name, description, image, category, size, price } = req.body;
    const product = new Product({ name, description, image, category, size, price });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

exports.updateProductApi = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

exports.deleteProductApi = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};