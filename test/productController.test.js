const request = require('supertest');
const app = require('../index');

const request = require('supertest');
const express = require('express');
const productController = require('../controllers/productController');
const Product = require('../models/Product');
const connectDB = require('../config/db');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/products', productController.showProducts);
app.get('/products/:productId', productController.showProductById);
app.get('/api/products', productController.getProductsApi);

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await Product.deleteMany({});
  await mongoose.connection.close();
});

describe('Product Controller', () => {
  test('GET /products should return HTML with products', async () => {
    const product = new Product({
      name: 'Camiseta',
      description: 'Camiseta cómoda',
      image: 'http://example.com/image.jpg',
      category: 'Camisetas',
      size: 'M',
      price: 20,
    });
    await product.save();

    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Camiseta');
  });

  test('GET /api/products should return JSON with products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});