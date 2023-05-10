const Usuario = require('../Models/Usuario');
const Producto = require('../Models/Producto');

//Registrar nuevo usuario
const IngresoUsuario = async (req, res) => {
    const insertar = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        password: req.body.password,
        rol: req.body.rol
    });

    const RegistrarUsuario = await insertar.save();
    res.json(RegistrarUsuario);
}

const TraerDatos = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        res.json(usuario); // Devuelve el producto en formato JSON
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al buscar el usuario');
    }
};

//Editar registro de un usuario 
const EditarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, correo, password, rol } = req.body;

        const actualizar = await Usuario.findByIdAndUpdate(id, { nombre, apellido, correo, password, rol }, { new: true });

        res.json(actualizar);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el usuario');
    }
};

//Eliminar registro de un usuario
const EliminarUsuario = async (req, res) => {
    try {
        const idUsuario = req.params.id;
        const UsuarioEliminado = await Usuario.findByIdAndDelete(idUsuario);

        if (!UsuarioEliminado) {
            return res.status(404).send('No se encontró ningún usuario con ese ID');
        }

        res.status(200).send(`Se eliminó el usuario ${UsuarioEliminado.nombre} con éxito`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al intentar eliminar el usuario');
    }
};

//Login 
const LoginUsuario = async (req, res) => {
    const { correo, password, rol } = req.body;

    try {
        // Verifica las credenciales del usuario en la base de datos
        const user = await Usuario.findOne({ correo, password });
        if (!user) {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        } else {
            // Devuelve una respuesta con el rol y el usuario
            const userRole = user.rol;
            res.json({ correo: correo, rol: userRole });
        }
    } catch (error) {
        console.error('Error al consultar la base de datos', error);
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
};





/*Mostrar Usuarios Ingresados*/
const MostrarUsuarios = async (req, res) => {
    try {
        const usuario = await Usuario.find();
        res.json(usuario);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};


const TopClientes = async (req, res) => {
    try {
        const resultado = await Producto.aggregate([
            // Agrupar los productos por el cliente propietario
            {
                $group: {
                    _id: "$nombreUsuario",
                    totalProductos: { $sum: 1 },
                },
            },
            // Ordenar por el número de productos de forma descendente
            { $sort: { totalProductos: -1 } },
            // Limitar los resultados a 10
            { $limit: 10 },
            // Buscar los detalles del cliente propietario
            {
                $lookup: {
                    from: "usuarios",
                    localField: "_id",
                    foreignField: "_id",
                    as: "nombreUsuario",
                },
            },
            // Deshacer el array del resultado anterior para obtener un objeto de cliente
            { $unwind: "$nombreUsuario" },
            // Seleccionar los campos a mostrar
            {
                $project: {
                    _id: "$nombreUsuario._id",
                    nombre: "$nombreUsuario.nombre",
                    correo: "$nombreUsuario.correo",
                    totalProductos: 1,
                },
            },
        ]);

        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: "Hubo un error en el servidor" });
    }
};



module.exports = {
    IngresoUsuario: IngresoUsuario,
    LoginUsuario: LoginUsuario,
    TraerDatos: TraerDatos,
    EditarUsuario: EditarUsuario,
    MostrarUsuarios: MostrarUsuarios,
    EliminarUsuario: EliminarUsuario,
    TopClientes: TopClientes
}