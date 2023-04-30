const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;


const ProductoCompraSchema = new Schema({
    nombre:  String,
    imagen: String,
    EnCarro: { type: Boolean, default: false },
    precio: Number
},{
    versionKey: false
});


module.exports = model('productoCarro', ProductoCompraSchema)