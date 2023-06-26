import fs from 'fs';

export default class Cart {
  constructor() {
    this.items = this.loadCartFromFile();
  }

  loadCartFromFile() {
    try {
      const data = fs.readFileSync('cart.json', 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // Si no existe el archivo o hay algún error, devuelve un array vacío
      return [];
    }
  }

  saveCartToFile() {
    fs.writeFile('cart.json', JSON.stringify(this.items), (error) => {
      if (error) {
        console.error('Error al guardar el carrito en el archivo:', error);
      }
    });
  }

  addProduct(productId, quantity) {
    const existingProductIndex = this.items.findIndex((item) => item.productId === productId);

    if (existingProductIndex > -1) {
      // Si el producto ya está en el carrito, aumenta la cantidad
      this.items[existingProductIndex].quantity += quantity;
    } else {
      // Si el producto no está en el carrito, agrega un nuevo elemento
      this.items.push({ productId, quantity });
    }

    this.saveCartToFile();
  }

  getCart() {
    return this.items;
  }
}