import Cart from '../dao/models/cart.js';

class CartController {
  async removeProduct(req, res) {
    try {
      const { cid, pid } = req.params;

      const cart = await Cart.findById(cid);

      if (!cart) {
        return res.status(404).json({ status: 'error', message: 'Cart not found' });
      }

      cart.products = cart.products.filter((product) => product.toString() !== pid);

      await cart.save();

      res.json({ status: 'success', message: 'Product removed from cart' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }

  async updateCart(req, res) {
    try {
      const { cid } = req.params;
      const { products } = req.body;

      const cart = await Cart.findById(cid);

      if (!cart) {
        return res.status(404).json({ status: 'error', message: 'Cart not found' });
      }

      cart.products = products;

      await cart.save();

      res.json({ status: 'success', message: 'Cart updated successfully' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }

  async updateProductQuantity(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      const cart = await Cart.findById(cid);

      if (!cart) {
        return res.status(404).json({ status: 'error', message: 'Cart not found' });
      }

      const product = cart.products.find((product) => product.toString() === pid);

      if (!product) {
        return res.status(404).json({ status: 'error', message: 'Product not found in cart' });
      }

      product.quantity = quantity;

      await cart.save();

      res.json({ status: 'success', message: 'Product quantity updated successfully' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }

  async clearCart(req, res) {
    try {
      const { cid } = req.params;

      const cart = await Cart.findById(cid);

      if (!cart) {
        return res.status(404).json({ status: 'error', message: 'Cart not found' });
      }

      cart.products = [];

      await cart.save();

      res.json({ status: 'success', message: 'Cart cleared successfully' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }
}

export default CartController;