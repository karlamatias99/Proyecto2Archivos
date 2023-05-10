const express = require('express');
const Usuario = require('../Models/Usuario');
const usuarioController = require('../Controllers/UsuarioController');

const router = express.Router();

router.post('/', usuarioController.IngresoUsuario);
router.post('/login', usuarioController.LoginUsuario);
router.get('/usuarios', usuarioController.MostrarUsuarios);
router.get('/usuario/:id', usuarioController.TraerDatos);
router.put('/editar/:id', usuarioController.EditarUsuario);
router.delete('/eliminar/:id', usuarioController.EliminarUsuario);
router.get('/TopClientes', usuarioController.TopClientes);

module.exports = router;
