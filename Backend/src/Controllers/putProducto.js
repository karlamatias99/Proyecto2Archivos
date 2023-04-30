const Carrito = require('../Models/Carrito');

const putProducto = async (req, res) => {

    const { productoID } = req.params;
    const { query } = req.query;
    const body = req.body;

    /*Busco el producto en el carrito */
    const buscarProducto = await Carrito.findById(productoID);

    if (!query) {
        res.status(400).json({
            mensaje: "Debes enviar una query"
        });

        /*Si el producto ya esta en el carrito pero deseamos comprar mas de una unidad */
    } else if (buscarProducto && query === "add") {
        body.cantidad = body.cantidad + 1;

        await Carrito.findByIdAndUpdate(productoID, body, {
            new: true,
        }).then((producto) => {
            res.json({
                mensaje: `El producto: ${producto.nombre} fue actualizado`,
                producto,
            });

        })

        /*Si deseo eliminar del carrito un producto */
    } else if (buscarProducto && query === "del") {
        body.cantidad = body.cantidad - 1;

        await Carrito.findByIdAndUpdate(productoID, body, {
            new: true,
        }).then((producto) => {
            res.json({
                mensaje: `El producto: ${producto.nombre} fue actualizado`,
                producto,
            });

        })
    } else {
        res.status(400).json({
            mensaje: "Ops! Ocurrio un error"
        });
    }

};

module.exports = {
    putProducto: putProducto
}