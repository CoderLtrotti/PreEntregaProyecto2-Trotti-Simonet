import express from 'express';
import ProductManager from './ProductManager.js';
import Cart from './cart.js';
import handlerbars from 'express-handlebars';
import { create } from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import ProductsManagers from './dao/productManagers.js';
import router from './routes/carts.js'
import MessageManager from './dao/messageManager.js';
import viewsRouter from './routes/views.router.js';
import Product from './dao/models/product.js';
import productRouter from './routes/products.js';

//import router from './routes/products.js';









// Creamos la aplicación
const app = express();
const productManager = new ProductManager(".");
const productManagers = new ProductsManagers();
const messageManager =  new MessageManager();


const cart = new Cart();


// Async function to connect to the database
const connectDB = async () => {
    try {

      await mongoose.connect('mongodb+srv://CoderLtrotti:TGtIEtoEcViniEQZ@codercluster.lbz1fl7.mongodb.net/?retryWrites=true&w=majority');
      console.log('Connected to MongoDB');

    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }
  
connectDB(); // Call the function to connect to the DB










app.use(express.json());
// mongoose.connect('mongodb+srv://CoderLtrotti:TGtIEtoEcViniEQZ@codercluster.lbz1fl7.mongodb.net/?retryWrites=true&w=majority');

app.post('/api/cart/:cartId/product/:productId', (req, res) => {
	const { cartId, productId } = req.params;
  
	// Verificar si el carrito existe
	if (!cartManager.hasCart(cartId)) {
	  cartManager.createCart(cartId);
	}
  
	// Agregar el producto al carrito
	cartManager.addToCart(cartId, productId);
  
	res.json({ message: 'Producto agregado al carrito' });
  });
  






// Utilizamos el middleware para parsear los datos de la petición
app.use(express.urlencoded({ extended: true }));
app.use('/apiv2/products', productRouter);
app.use('/apiv2/carts', router);
app.use('/',viewsRouter);



//PRODUCTO.

// Definimos el metodo Get para la ruta /pro
app.get('/api1/products', async (req, res) => {
	
	try {
		let allProduct = await productManager.getProductsFromFile();
		const limit = parseInt(req.query.limit, 10) || allProduct.length; 
		const limitedProducts = allProduct.slice(0, limit);
		res.json(limitedProducts);
	} catch (err) {
		res.json(err);
	}
});

// Definimos el metodo Get para la ruta /user/:id
app.get('/api/product/:id', async (req, res) => {
	// Buscamos el usuario por id
	const productId = parseInt(req.params.id, 10);
	let product = await productManager.getProductsById(productId);
	// Enviamos la respuesta
	if (product) {
		res.json(product);
	  } else {
		res.status(404).json({ message: 'Producto no encontrado' });
	  }
	
});

// DELETE /api/products/:id - Elimina un producto específico por ID
app.delete('/api/products/:id', async (req, res) => {
	const productId = parseInt(req.params.id, 10);
	const productIndex = await productManager.deleteProduct(productId);

	if (productIndex > -1) {
	  res.json({ message: 'Producto eliminado' });
	} else {
	  res.status(404).json({ message: 'Producto no encontrado' });
	}
  });
  

  
// PUT /api/products/:id - Actualiza un producto específico por ID
app.put('/api/products/:id', async (req, res) => {
	const productId = parseInt(req.params.id, 10);
	const productData = req.body;
	
	const productUpdated = await productManager.modifyProductById(productId, productData);
	res.json(productUpdated);
  });

  
//CARRITO
app.post('/api/cart', (req, res) => {
	const { productId, quantity } = req.body;
  
	if (!productId || !quantity) {
	  return res.status(400).json({ message: 'Faltan datos del producto' });
	}
  
	cart.addProduct(productId, quantity);
	res.json({ message: 'Producto agregado al carrito' });
  });
  
  // GET /api/cart - Obtiene el contenido del carrito
  app.get('/api/cart', (req, res) => {
	res.json(cart.getCart());
  });
 

  app.get('/api/products', async (req, res) => {
	try {
	  const { category, availability, sort, limit = 10, page = 1 } = req.query;
  
	  // Construir el objeto de filtro para la consulta
	  const filter = {};
  
	  // Agregar filtro por categoría si se proporciona
	  if (category) {
		filter.category = category;
	  }
  
	  // Agregar filtro por disponibilidad si se proporciona
	  if (availability) {
		filter.availability = availability;
	  }
  
	  // Construir el objeto de opciones para la consulta
	  const options = {
		limit: parseInt(limit, 10),
		skip: (parseInt(page, 10) - 1) * parseInt(limit, 10),
	  };
  
	  // Aplicar el ordenamiento si se proporciona
	  if (sort) {
		const sortOrder = sort === 'asc' ? 1 : -1;
		options.sort = { price: sortOrder };
	  }
  
	  // Realizar la consulta a la base de datos
	  const products = await productManagers.find(filter, null, options);
	  const totalProducts = await productManagers.countDocuments(filter);
	  const totalPages = Math.ceil(totalProducts / parseInt(limit, 10));

	  
  
	  // Construir el objeto de respuesta
	


  
	  res.json(response);
	} catch (error) {
	  res.status(500).json({ status: 'error', message: 'Internal server error' });
	}
  });



  app.delete('/carts/:cid/products/:pid', async (req, res) => {
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
  });
  
  // Actualizar el carrito con un arreglo de productos
  app.put('/carts/:cid', async (req, res) => {
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
  });

  app.get('/api/carts/:cid', async (req, res) => {
	try {
	  const { cid } = req.params;
  
	  // Buscar el carrito por su ID y realizar el populate en la propiedad 'products'
	  const cart = await Cart.findById(cid).populate('products');
  
	  if (!cart) {
		return res.status(404).json({ status: 'error', message: 'Cart not found' });
	  }
  
	  res.json({ status: 'success', payload: cart });
	} catch (error) {
	  res.status(500).json({ status: 'error', message: 'Internal server error' });
	}
  });
  
  // Actualizar la cantidad de ejemplares

  app.get('/products', async (req, res) => {
	try {
	  const { page = 1, limit = 10, category, availability, sort } = req.query;
  
	  const filters = {
		category,
		availability,
	  };
  
	  const sortOptions = {};
  
	  if (sort) {
		const [sortField, sortOrder] = sort.split(':');
		sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
	  }
  
	  const skip = (page - 1) * limit;
  
	  const products = await Product.find(filters)
		.sort(sortOptions)
		.skip(skip)
		.limit(limit);

		const totalProducts = await Product.countDocuments(filters);
    	const totalPages = Math.ceil(totalProducts / limit);

		const response = {
			status: 'success',
			payload: products,
			totalPages,
			prevPage: page > 1 ? page - 1 : null,
			nextPage: page < totalPages ? page + 1 : null,
			page: parseInt(page),
			hasPrevPage: page > 1,
			prevLink: page > 1 ? `/products?limit=${limit}&page=${page - 1}` : null,
			nextLink: page < totalPages ? `/products?limit=${limit}&page=${page + 1}` : null,
		  };

		  
		  
  
	  res.render('product-details', {
		products,
		hasPrevPage: page > 1,
		prevPage: page > 1 ? page - 1 : null,
		hasNextPage: products.length === limit,
		nextPage: page + 1,
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Internal server error' });
	}
  });

  app.get('/products/:id', async (req, res) => {
	try {
	  const product = await Product.findById(req.params.id);
	  if (!product) {
		return res.status(404).json({ error: 'Producto no encontrado' });
	  }
	  res.json(product);
	} catch (error) {
	  res.status(500).json({ error: 'Error al obtener el producto' });
	}
  });
  
  // Ruta para crear un nuevo producto
  app.post('/products', async (req, res) => {
	try {
	  const product = new Product(req.body);
	  await product.save();
	  res.status(201).json(product);
	} catch (error) {
	  res.status(500).json({ error: 'Error al crear el producto' });
	}
  });
  
  // Ruta para actualizar un producto existente
  app.put('/products/:id', async (req, res) => {
	try {
	  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
	  if (!product) {
		return res.status(404).json({ error: 'Producto no encontrado' });
	  }
	  res.json(product);
	} catch (error) {
	  res.status(500).json({ error: 'Error al actualizar el producto' });
	}
  });
  
  // Ruta para eliminar un producto
  app.delete('/products/:id', async (req, res) => {
	try {
	  const product = await Product.findByIdAndRemove(req.params.id);
	  if (!product) {
		return res.status(404).json({ error: 'Producto no encontrado' });
	  }
	  res.json({ message: 'Producto eliminado correctamente' });
	} catch (error) {
	  res.status(500).json({ error: 'Error al eliminar el producto' });
	}
  });

  app.get('/products', (req, res) => {
	const { category, availability, minPrice, maxPrice, sort } = req.query;
  
	const filter = {};
  
	if (category && category !== 'Todas') {
	  filter.category = category;
	}
  
	if (availability) {
	  // Validar si availability tiene un valor válido ('true' o 'false')
	  if (availability === 'true' || availability === 'false') {
		filter.availability = availability === 'true';
	  }
	}
  
	if (minPrice) {
	  filter.price = { $gte: parseFloat(minPrice) };
	}
  
	if (maxPrice) {
	  if (filter.price) {
		filter.price.$lte = parseFloat(maxPrice);
	  } else {
		filter.price = { $lte: parseFloat(maxPrice) };
	  }
	}
  
	const query = Product.find(filter);
  
	// Ordenamiento
	if (sort === 'asc') {
	  query.sort({ price: 1 });
	} else if (sort === 'desc') {
	  query.sort({ price: -1 });
	}
  
	query.exec((err, products) => {
	  if (err) {
		console.error('Error al obtener los productos:', err);
		return res.status(500).send('Error interno del servidor');
	  }
  
	  res.render('products', { products });
	});
  });
  


  messageManager.createMessage('Hola, este es un mensaje');
  const allMessages = messageManager.getAllMessages();
  console.log(allMessages);

  
//   routerProduct.get('/product/:productId', async (req, res) => {
// 	try {
// 	  // Obtener el ID del producto seleccionado desde los parámetros de la ruta
// 	  const productId = req.params.productId;
  
// 	  // Obtener el producto por su ID
// 	  const product = await Product.findById(productId);
  
// 	  // Renderizar la vista 'product-details.ejs' con los datos del producto y el ID del carrito
// 	  res.render('product-details', { product, cartId: req.params.cid });
  
// 	} catch (error) {
// 	  console.log(error);
// 	  res.status(500).send('Error al obtener los detalles del producto.');
// 	}
//   });

  
  
  app.engine('handlebars', handlerbars.engine());
  app.set('views', '../views/');
  app.set('view engine', 'handlebars');
  const hbs = create({
	defaultLayout: '',
	runtimeOptions: {
	  allowProtoPropertiesByDefault: true,
	  allowProtoMethodsByDefault: true,
	}
  });
  
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
  
  
  // Seteo el directorio de archivos estáticos
  

  app.get('./view', (req, res) => {
	res.render('index');
  });
  // Rutas

 
  
  // Route for real-time product updates
  app.get('/realtimeproducts', (req, res) => {
	res.render('realtimeproducts', { products });
  });
  
  // Inicialización del servidor
  const webServer = app.listen(8080, () => {
	  console.log('Escuchando 8080');
  });
  
  // Inicialización de socket.io
  const io = new Server(webServer);
  
  // Eventos de socket.io
  io.on('connection', (socket) => {
	console.log('A user connected');
  
	// Handle 'addProduct' event
	socket.on('addProduct', (product) => {
	  products.push(product);
  
	  // Broadcast the updated products to all connected clients
	  io.emit('newProduct', product);
	});
  
	// Handle 'disconnect' event
	socket.on('disconnect', () => {
	  console.log('A user disconnected');
	});
  });
  
  