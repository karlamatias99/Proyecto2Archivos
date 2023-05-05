const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;


const ProductoSchema = new Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    existencia: String,
    imagen: String,
    categoria: String,
    nombreUsuario: String
}, {
    versionKey: false
});


module.exports = model('producto', ProductoSchema)