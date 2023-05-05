const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usuarioRoutes = require("./routes/usuario.routes");
const productoRoutes = require("./routes/producto.routes");
const listaRoutes = require("./routes/lista.routes");
const carritoRoutes = require("./routes/carrito.routes");
const pedidoRoutes = require("./routes/pedido.routes");
const tarjetaRoutes = require("./routes/tarjeta.routes");



const app = express();
app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


async function start() {

    try {
        const db = await mongoose.connect('mongodb://localhost:27017/Proyecto2', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4

        });
        console.log("Conectado a la base de datos ", db.connection.name);
    } catch (error) {
        console.log(error);
    }
}

start();


app.use('/api', carritoRoutes);
app.use('/api', tarjetaRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', productoRoutes);
app.use('/api', pedidoRoutes);

app.listen(3000);
console.log("Servidor escuchando en el puerto 3000");
