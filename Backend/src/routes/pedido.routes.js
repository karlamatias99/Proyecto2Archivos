const express = require('express');
const Pedido = require('../Models/Pedidos');
const pedidoControllers = require('../Controllers/pedidosController');

const router = express.Router();

router.post('/ingresarPedido', pedidoControllers.IngresoPedidos);
router.put('/editar', pedidoControllers.EditarPedidos);
router.get('/pedidos', pedidoControllers.MostrarPedidos);
router.get('/pedidosUsuario', pedidoControllers.MostrarPedidosPorUsuario);
router.get('/pedido/:id', pedidoControllers.TraerDatos);
router.put('/editarPedido/:id', pedidoControllers.EditarPedidos);
router.delete('/eliminarPedido/:id', pedidoControllers.EliminarPedidos);

module.exports = router;
