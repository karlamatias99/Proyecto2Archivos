const Producto = require('../Models/ProductoCompra');
const Carrito = require('../Models/Carrito');

const deletetProducto = async(req,res) => {

    const { productoID } = req.params;

    /*Busco el producto en el carrito */
    const buscarProducto = await Carrito.findById(productoID);

    const { nombre, imagen, precio, _id } = await Producto.findOne({
        nombre: buscarProducto.nombre,
    });

    await Carrito.findOneAndDelete(productoID);

    await Producto.findByIdAndUpdate(
        _id,
        { enCarro: false, nombre, imagen, precio},
        {new: true}
    )
    .then((producto) => {
        res.json({
            mensaje: `El producto ${producto.nombre} fue eliminado del carrito`,
        });
    })
    .catch((error) => res.json({mensaje: "Ops! Ocurrio un error"}));
};

module.exports = {
    deletetProducto: deletetProducto
}