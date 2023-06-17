import express, { Router } from 'express';
import CartController from '../controllers/cartController.js';

const router = express.Router();
const cartController = new CartController();

// DELETE /api/carts/:cid/products/:pid - Remove a product from the cart
router.delete('/:cid/products/:pid', cartController.removeProduct);

// PUT /api/carts/:cid - Update the cart with an array of products
router.put('/:cid', cartController.updateCart);

// PUT /api/carts/:cid/products/:pid - Update the quantity of a product in the cart
router.put('/:cid/products/:pid', cartController.updateProductQuantity);

// DELETE /api/carts/:cid - Remove all products from the cart
router.delete('/:cid', cartController.clearCart);

// GET CART
router.get('/:cid', cartController.getCart);

// CREATE CART
router.post('/', cartController.createCart);

export default router;