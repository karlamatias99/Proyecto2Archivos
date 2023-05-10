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

