const express = require('express');
const Producto = require('../Models/Producto');
const carritoController = require('../Controllers/carritoController');

const carrito = express.Router();

carrito.post('/add', carritoController.addProductoCarrito);
carrito.put('/editarCarrito/:id', carritoController.putProducto);
carrito.get('/verC', carritoController.getProducto);
carrito.get('/VerCarrito', carritoController.getProductoCarrito);
carrito.delete('/eliminarCarrito/:id', carritoController.deletetProducto);



module.exports = carrito;


/*const express = require('express');
const Carrito = require('../Models/Carrito');
const ProductoCarrito = require('../Models/ProductoCompra');
const agregar = require('../Controllers/addProductoCarrito');
const editar = require('../Controllers/putProducto');
const eliminar = require('../Controllers/deleteProducto');
const verCarrito = require('../Controllers/getProductoCarrito');
const ver = require('../Controllers/getProducto');
const carritoController = require('../Controllers/carritoController');

const router = express.Router();

router.get('/ver', carritoController.getProducto);
router.get('/verCarrito', carritoController.getProductoCarrito);

router.post('/add', carritoController.addProductoCarrito);
router.put('/producto-carrito/:id', carritoController.putProducto);
router.delete('/producto-carrito/:id', carritoController.deletetProducto);

module.exports = router;*/