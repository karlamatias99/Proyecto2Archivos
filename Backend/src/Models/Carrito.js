const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;


const CarritoSchema = new Schema({
    nombre:  String,
    imagen: String,
    precio: Number,
    cantidad: Number
    
},{
    versionKey: false
});


module.exports = model('carrito', CarritoSchema)