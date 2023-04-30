const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;


const ListaSchema = new Schema({
    nombre:  String,
    precio: Number,
},{
    versionKey: false
});


module.exports = model('lista', ListaSchema)