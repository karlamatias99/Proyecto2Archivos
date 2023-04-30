const Producto = require('../Models/ProductoCompra');
const ProductoDB = require('../Models/Producto');
const Carrito = require('../Models/Carrito');

const addProductoCarrito = async (req, res) => {
    const { nombre, imagen, precio } = req.body;

    try {
        // Busca el producto en la base de datos
        const productoExistente = await ProductoDB.findOne({ nombre });

        if (!productoExistente) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        // Verifica si el producto ya está en el carrito
      //  const productoEnCarrito = await Carrito.findOne({ nombre });

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

        res.json({
            mensaje: "Producto agregado al carrito",
            producto: nuevoProductoCarrito,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al agregar producto al carrito" });
    }
};

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