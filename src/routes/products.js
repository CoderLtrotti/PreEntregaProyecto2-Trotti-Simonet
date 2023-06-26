import { Router } from 'express';
import ProductController from '../controllers/ProductController.js';


// Create a new router instance
const productRouter = Router();

// Initialize the product controller
const productController = new ProductController();

// Define the routes
productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.post('/', productController.createProduct);
productRouter.put('/:id', productController.updateProduct);
productRouter.delete('/:id', productController.deleteProduct);

// Export the router
export default productRouter;