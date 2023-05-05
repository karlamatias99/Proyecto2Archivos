const express = require('express');
const Producto = require('../Models/Producto');
const productoController = require('../Controllers/ProductoController');

const router = express.Router();

router.post('/ingresar', productoController.IngresoProducto);
router.put('/editar', productoController.EditarProducto);
router.get('/ver', productoController.MostrarProductos);
router.get('/productos', productoController.MostrarProductosVenta);
router.get('/producto/:id', productoController.TraerDatos);
router.get('/buscar', productoController.buscarProductos);
router.put('/editarProd/:id', productoController.EditarProducto);
router.delete('/eliminarProd/:id', productoController.EliminarProducto);


module.exports = router;
