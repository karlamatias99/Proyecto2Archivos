const Producto = require('../Models/ProductoCompra');

const getProducto = async(req, res) => {

    const producto = await Producto.find();

    if (producto) {
        res.json({producto});     
    }else{
        res.json({mensaje: "No hay productos"})
    }
};

module.exports = {
    getProducto: getProducto
}