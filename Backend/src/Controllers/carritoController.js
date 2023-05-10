const Producto = require('../Models/ProductoCompra');
const ProductoDB = require('../Models/Producto');
const Carrito = require('../Models/Carrito');

const addProductoCarrito = async (req, res) => {
    const productos = req.body.productos;
    console.log(productos);

    try {
        // Verifica si se envió un arreglo de productos
        if (!Array.isArray(productos)) {
            return res.status(400).json({ mensaje: "Se debe enviar un arreglo de productos" });
        }

        // Verifica si el arreglo de productos está vacío
        if (productos.length === 0) {
            return res.status(400).json({ mensaje: "El arreglo de productos está vacío" });
        }

        // Itera sobre la lista de productos y los agrega al carrito
        for (let i = 0; i < productos.length; i++) {
            const { nombre, imagen, precio } = productos[i];

            // Busca el producto en la base de datos
            const productoExistente = await ProductoDB.findOne({ nombre });

            if (!productoExistente) {
                return res.status(404).json({ mensaje: "Producto no encontrado" });
            }

            // Verifica si el producto ya está en el carrito
            // const productoEnCarrito = await Carrito.findOne({ nombre });

            /* if (productoEnCarrito) {
                return res.status(400).json({ mensaje: "Producto ya agregado al carrito" });
            }*/

            // Crea un nuevo producto en el carrito
            const nuevoProductoCarrito = new Carrito({
                nombre: productoExistente.nombre,
                imagen: productoExistente.imagen,
                precio: productoExistente.precio,
                cantidad: 1,
            });

            await nuevoProductoCarrito.save();
        }

        res.json({
            mensaje: "Productos agregados al carrito",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al agregar productos al carrito" });
    }
};




const deletetProducto = async (req, res) => {

    const { productoID } = req.params;

    /*Busco el producto en el carrito */
    const buscarProducto = await Carrito.findById(productoID);

    const { nombre, imagen, precio, _id } = await Producto.findOne({
        nombre: buscarProducto.nombre,
    });

    await Carrito.findOneAndDelete(productoID);

    await Producto.findByIdAndUpdate(
        _id,
        { enCarro: false, nombre, imagen, precio },
        { new: true }
    )
        .then((producto) => {
            res.json({
                mensaje: `El producto ${producto.nombre} fue eliminado del carrito`,
            });
        })
        .catch((error) => res.json({ mensaje: "Ops! Ocurrio un error" }));
};

const getProductoCarrito = async (req, res) => {

    const productoCarro = await Carrito.find();

    if (productoCarro) {
        res.json({ productoCarro });
    } else {
        res.json({ mensaje: "Carrito Vacio" })
    }
};

const getProducto = async (req, res) => {

    const producto = await Producto.find();

    if (producto) {
        res.json({ producto });
    } else {
        res.json({ mensaje: "No hay productos" })
    }
};


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
    addProductoCarrito: addProductoCarrito,
    deletetProducto: deletetProducto,
    getProducto: getProducto,
    getProductoCarrito: getProductoCarrito,
    putProducto: putProducto
}

