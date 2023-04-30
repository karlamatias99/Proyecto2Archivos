const Carrito = require('../Models/Carrito');

const getProductoCarrito = async(req, res) => {

    const productoCarro = await Carrito.find();

    if (productoCarro) {
        res.json({productoCarro});     
    }else{
        res.json({mensaje: "Carrito Vacio"})
    }
};

module.exports = {
   getProductoCarrito: getProductoCarrito
}