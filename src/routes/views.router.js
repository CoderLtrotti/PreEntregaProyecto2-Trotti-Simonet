import { Router } from 'express';

 
const viewsRouter = Router();


viewsRouter.get('/product-details', (req, res) =>{
    res.render('product-details');
});

viewsRouter.post('/add-to-cart/:id', (req, res) => {
    // Aquí obtendrías el id del producto desde la URL y la cantidad desde el cuerpo de la solicitud (req.body.quantity)
    const productId = req.params.id;
    const quantity = req.body.quantity;
  
    // Aquí podrías agregar el producto al carrito según el id y la cantidad
  
    res.redirect('/cart');
  });

viewsRouter.get('/cart-details', (req, res) =>{
    res.render('cart-details');
});
  

  export default viewsRouter;