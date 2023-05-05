const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;


const TarjetaSchema = new Schema({
    numeroTarjeta: Number,
    nombreUsuario: String,
    vencimiento: Date,
    CVV: Number
},{
    versionKey: false
});


module.exports = model('tarjeta', TarjetaSchema)