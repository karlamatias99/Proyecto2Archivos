const express = require('express');
const Pedido = require('../Models/Pedidos');
const tarjetaControllers = require('../Controllers/TarjetaController');

const router = express.Router();

router.post('/ingresarTarjeta', tarjetaControllers.addTarjeta);
router.put('/editarTarjeta', tarjetaControllers.editarTarjeta);
router.get('/tarjeta/:id', tarjetaControllers.TraerDatos);
router.delete('/eliminarTarjeta', tarjetaControllers.EliminarTarjeta);

module.exports = router;