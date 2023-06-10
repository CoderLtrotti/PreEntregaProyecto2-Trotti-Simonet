import Product from './models/product.js'

class ProductsManagers {
  async getAllProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw new Error('Error retrieving products from the database');
    }
  }

  async getProductById(productId) {
    try {
      const product = await Product.findById(productId);
      return product;
    } catch (error) {
      throw new Error('Error retrieving product from the database');
    }
  }

  async addProduct(productData) {
    try {
      const product = new Product(productData);
      await product.save();
      return product;
    } catch (error) {
      throw new Error('Error adding product to the database');
    }
  }

  async updateProduct(productId, productData) {
    try {
      const product = await Product.findByIdAndUpdate(productId, productData, { new: true });
      return product;
    } catch (error) {
      throw new Error('Error updating product in the database');
    }
  }

  async deleteProduct(productId) {
    try {
      const product = await Product.findByIdAndRemove(productId);
      return product;
    } catch (error) {
      throw new Error('Error deleting product from the database');
    }
  }
}

export default ProductsManagers;