const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;


const PedidosSchema = new Schema({
    usuarioPedido: String,
    direccion: String,
    telefono: Number,
    totalcompra: String,
    FechaGeneracion: Date,
    FechaEntrega: Date,
    Tarjeta: Number,
    Estado: String
},{
    versionKey: false
});


module.exports = model('pedido', PedidosSchema)