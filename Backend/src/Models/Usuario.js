const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;


const UsuarioSchema = new Schema({
    nombre:  String,
    apellido: String,
    correo: String,
    password: String,
    rol: String
},{
    versionKey: false
});

module.exports = model('usuario', UsuarioSchema)