const Producto = require('../Models/Producto');

//Ingreso de un nuevo producto 
const IngresoProducto = async (req, res) => {
    const agregar = new Producto({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        existencia: req.body.existencia,
        imagen: req.body.imagen,
        categoria: req.body.categoria,
        nombreUsuario: req.body.nombreUsuario
    });

    const RegistrarProducto = await agregar.save();
    res.json(RegistrarProducto);
}

//obtentgo datos desde la base de datos 
const TraerDatos = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id); // Busca el producto en MongoDB por su ID
        res.json(producto); // Devuelve el producto en formato JSON
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al buscar el producto');
    }
};


//edito un producto 
const EditarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, existencia, imagen, categoria } = req.body;

        const actualizar = await Producto.findByIdAndUpdate(id, { nombre, descripcion, precio, existencia, imagen, categoria }, { new: true });

        res.json(actualizar);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el producto');
    }
};

//eliminar producto 
const EliminarProducto = async (req, res) => {
    try {
        const idProducto = req.params.id;
        const productoEliminado = await Producto.findByIdAndDelete(idProducto);

        if (!productoEliminado) {
            return res.status(404).send('No se encontró ningún producto con ese ID');
        }

        res.status(200).send(`Se eliminó el producto ${productoEliminado.nombre} con éxito`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al intentar eliminar el producto');
    }
};


/*Mostrar Productos Ingresados por algun usuario en especifico */
const MostrarProductos = async (req, res) => {
    const nombreUsuario = req.query.nombreUsuario;

    try {
        const productos = await Producto.find({ nombreUsuario });
        res.json(productos);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};

//mostrar todos los productos que se han ingresado y estan a la venta 
const MostrarProductosVenta = async (req, res) => {
    try {
        const productos = await Producto.find(); // Busca todos los productos en la base de datos
        res.json(productos); // Devuelve los productos como respuesta en formato JSON
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};

//Buscar algun producto, en base a su nombre 
const buscarProductos = async (req, res) => {
    const nombreProducto = req.query.nombreProducto;
    const regex = new RegExp(nombreProducto, 'i');

    try {
        const productos = await Producto.find({ nombre: regex });
        res.json(productos);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
}


module.exports = {
    IngresoProducto: IngresoProducto,
    EditarProducto: EditarProducto,
    MostrarProductos: MostrarProductos,
    MostrarProductosVenta: MostrarProductosVenta,
    TraerDatos: TraerDatos,
    EliminarProducto: EliminarProducto,
    buscarProductos: buscarProductos
}