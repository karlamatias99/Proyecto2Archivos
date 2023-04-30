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


module.exports = {
    addProductoCarrito: addProductoCarrito
}