const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/', productController.showProducts);
router.get('/:productId', productController.showProductById);


router.get('/dashboard', authMiddleware, productController.showDashboard);
router.get('/dashboard/new', authMiddleware, productController.showNewProduct);
router.post('/dashboard', authMiddleware, productController.createProduct);
router.get('/dashboard/:productId', authMiddleware, productController.showProductById);
router.get('/dashboard/:productId/edit', authMiddleware, productController.showEditProduct);
router.put('/dashboard/:productId', authMiddleware, productController.updateProduct);
router.delete('/dashboard/:productId/delete', authMiddleware, productController.deleteProduct);


router.get('/api/products', productController.getProductsApi);
router.get('/api/products/:productId', productController.getProductByIdApi);
router.post('/api/products', authMiddleware, productController.createProductApi);
router.put('/api/products/:productId', authMiddleware, productController.updateProductApi);
router.delete('/api/products/:productId', authMiddleware, productController.deleteProductApi);

module.exports = router;