import ProductsManagers  from '../dao/productManagers.js'

class ProductController {
  constructor() {
    this.productsManager = new ProductsManagers();
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getProductById = this.getProductById.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }
  async getAllProducts(req, res) {
    try {
      const { category, availability, sort, limit = 10, page = 1 } = req.query;

      // Construct the filters object
      const filters = {
        category,
        availability,
        sort: sort ? JSON.parse(sort) : undefined,
        limit: parseInt(limit),
        page: parseInt(page)
      };

      const products = await this.productsManager.getAllProducts(filters);

      res.json(products);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get a product by ID
  async getProductById(req, res) {
    try {
      const product = await this.productsManager.getProductById(req.params.id);
      if (product) {
        console.log(product);
        res.render('product-details', { product: product });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Create a new product
  async createProduct(req, res) {
    try {
      const newProduct = await this.productsManager.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update a product by ID
  async updateProduct(req, res) {
    try {
      const updatedProduct = await this.productsManager.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (updatedProduct) {
        res.json(updatedProduct);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Delete a product by ID
  async deleteProduct(req, res) {
    try {
      const deletedProduct = await this.productsManager.deleteProduct(req.params.id);
      if (deletedProduct) {
        res.json({ message: 'Product deleted successfully' });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal server error' });
      
    }
  }
}

export default ProductController;