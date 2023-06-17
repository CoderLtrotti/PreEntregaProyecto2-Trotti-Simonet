

// Llamo a la libreria fs y la guardo en variable fs
import fs from 'fs';

/*
 * 
 * 
 */


export default class ProductManager {
	
	#precioBaseGanancia = 0.15;
	#id = 0;
	#path = "";

	
constructor(path) {
		this.#path = path + '/products.json';
		if (!fs.existsSync(this.#path)) {
			// escribo el archivo de forma sincronica con un array vacio
			fs.writeFileSync(this.#path, JSON.stringify([]));
		}
	}
	/**
	 * 
	 * 
	 * @param {string} title
	 * @param {string} description
	 * @param {string} thumbnail
	 * @param {number} precio 
	 * @param {number} code
	 * @param {number} stock 
	 * @param {Date} fecha 
	 */
	async addProducts(title, description ,precio, stock = 100,code, thumbnail, fecha = new Date()) {
		
		const actualProducts = await this.getProductsFromFile();
		let filtro = actualProducts.filter((event) => event.title === title);
		if (filtro.length > 0) {
			console.log('El nombre del Producto ya existe');
			return;
		}

		const product = {
			code,
			description,
			title,
			precio: precio + precio * this.#precioBaseGanancia, 
			stock,
			fecha,
			thumbnail
		};

		product.id = this.#getID();
		// Agrego el nuevo usuario
		actualProducts.push(product);

		// Escribo nuevamente le archivo ./users.json
		await fs.promises.writeFile(
			this.#path,
			JSON.stringify(actualProducts) // Transformo el array en string
		);
	}

	/**
	 * Permite obtener los usuarios
	 * @returns Un array con los usuarios
	 */

	async getProductsFromFile(){
		// Intento...
		try {
			// Guardo en actualUsers el contenido de ./users.json
			const actualProducts = await fs.promises.readFile(
				this.#path,
				'utf-8'
			);
			// Retorno actualUsers parseado
			return JSON.parse(actualProducts);
		} catch (err) {
			// Si hay error imprimo el error en consola
			console.log('No puedo darte usuarios');
		}
	}
	
	#getID() {
		this.#id++; 
		return this.#id;
	}

	/**
	 * 
	 * @param {number} productId
	 * @returns {object} product
	 */
	/*idProductos*/
	async getProductsById(productId) {
		const actualProducts = await this.getProductsFromFile();
		
		return actualProducts.find((p) => p.id === productId);
	}
	

	async deleteProduct(productId)
	{
		const actualProducts = await this.getProductsFromFile();
		const filteredProducts = actualProducts.filter((p) => p.id !== productId);
		if (filteredProducts.length === actualProducts.length) {
			console.log(`Product with ID ${productId} not found`);
		}

		// Escribo nuevamente le archivo ./products.json
		await this.deleteFile();
		await fs.promises.writeFile(
			this.#path,
			JSON.stringify(filteredProducts) // Transformo el array en string
		);
		return true;
	}
	
	async modifyProductById(productId, updatedProductData) {
		const actualProducts = await this.getProductsFromFile();
		const modifiedProducts = actualProducts.map((p) => {
		  if (p.id === productId) {
			return { ...p, ...updatedProductData };
		  }
		  return p;
		});
		
		if (modifiedProducts.length === products.length) {
		  throw new Error(`Product with ID ${productId} not found`);
		}
		
		// Escribo nuevamente le archivo ./products.json
		await this.deleteFile();
		await fs.promises.writeFile(
			this.#path,
			JSON.stringify(filteredProducts) // Transformo el array en string
		);

		return true;
	  };

	async deleteFile(){
		fs.unlink(this.#path, (error) => {
			if (error) {
			  console.error(error);
			  throw new Error('Failed to delete file');
			}
			console.log(`File ${this.#path} has been deleted`);
		  });
	}
}



const productMananager = new ProductManager(".");
const test = async () => {
	await productMananager.addProducts('producto prueba 1', 'Este es un producto prueba', 200, 25, 213123, "thispath/rutaimagen");
	await productMananager.addProducts('producto prueba 2', 'Este es un producto prueba', 200, 25, 2321344, "thispath/rutaimagen");
	await productMananager.addProducts('producto prueba 3', 'Este es un producto prueba', 200, 25, 4214321312, "thispath/rutaimagen");
	await productMananager.deleteProduct(2);
	console.log(await productMananager.getProductsFromFile());
}

test();

// Diferencia entre Clase y Objeto instancia de clase
console.log(`CLASS: ${productMananager}`);
console.log(`INSTANCIA: ${productMananager}`);