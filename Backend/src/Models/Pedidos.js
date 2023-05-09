const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;


const PedidosSchema = new Schema({
    usuarioPedido: String,
    direccion: String,
    telefono: Number,
    totalcompra: Number,
    FechaGeneracion: Date,
    FechaEntrega: Date,
    Tarjeta: String,
    Estado: String,
    perfilUsuario: String
},{
    versionKey: false
});


module.exports = model('pedido', PedidosSchema)