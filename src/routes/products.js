import express, { Router } from 'express';
import ProductController from '../controllers/ProductController.js';


// Create a new router instance
const router = express.Router();

// Initialize the product controller
const productController = new ProductController();

// Define the routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// Export the router
export default router;