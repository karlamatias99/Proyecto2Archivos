const Pedidos = require('../Models/Pedidos');
const moment = require('moment');

//Ingresar un nuevo pdido 
const IngresoPedidos = async (req, res) => {
    const insertar = new Pedidos({
        usuarioPedido: req.body.usuarioPedido,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        totalcompra: req.body.totalcompra,
        FechaGeneracion: req.body.FechaGeneracion,
        FechaEntrega: req.body.FechaEntrega,
        Tarjeta: req.body.Tarjeta,
        Estado: req.body.Estado,
        perfilUsuario: req.body.perfilUsuario
    });

    const RegistrarPedido = await insertar.save();
    res.json(RegistrarPedido);
}

//traer informacion de la base de datos 
const TraerDatos = async (req, res) => {
    try {
        const pedido = await Pedidos.findById(req.params.id);

        // Formatear las fechas antes de enviarlas en el resultado JSON
        const fechaGeneracion = moment(pedido.fechaGeneracion).format('YYYY-MM-DD');
        const fechaEntrega = moment(pedido.FechaEntrega).format('YYYY-MM-DD');


        // Crear un objeto con las propiedades que se quieren enviar en el resultado
        const resultado = {
            _id: pedido._id,
            usuarioPedido: pedido.usuarioPedido,
            direccion: pedido.direccion,
            telefono: pedido.telefono,
            totalcompra: pedido.totalcompra,
            FechaGeneracion: fechaGeneracion,
            FechaEntrega: fechaEntrega,
            Estado: pedido.Estado
        };

        // Enviar el resultado como JSON
        res.json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al buscar el pedido');
    }
};



//Editar el estado y la fecha de entrega de un pedido
const EditarPedidos = async (req, res) => {
    try {
        const { id } = req.params;

        const { Estado, FechaEntrega } = req.body;

        const actualizar = await Pedidos.findByIdAndUpdate(id, { Estado, FechaEntrega }, { new: true });

        res.json(actualizar);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el pedido');
    }
};

//Eliminar pedido 
const EliminarPedidos = async (req, res) => {
    try {
        const idPedidos = req.params.id;
        const PedidosEliminado = await Pedidos.findByIdAndDelete(idPedidos);

        if (!PedidosEliminado) {
            return res.status(404).send('No se encontró ningún pedido con ese ID');
        }

        res.status(200).send(`Se eliminó el pedido ${PedidosEliminado.usuarioPedido} con éxito`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al intentar eliminar el pedido');
    }
};

//Mostrar los pedidos, dependiendo de un usuario en especifico 
const MostrarPedidosPorUsuario = async (req, res) => {
    const perfilUsuario = req.query.perfilUsuario;

    try {
        const pedidos = await Pedidos.find({ perfilUsuario }).lean();
        const pedidosConFecha = pedidos.map(pedido => {
            return {
                _id: pedido._id,
                usuarioPedido: pedido.usuarioPedido,
                direccion: pedido.direccion,
                telefono: pedido.telefono,
                totalcompra: pedido.totalcompra,
                Tarjeta: pedido.Tarjeta,
                FechaEntrega: pedido.FechaEntrega.toISOString().substring(0, 10),
                Estado: pedido.Estado
            };
        });
        res.json(pedidosConFecha);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};


/*Mostrar Pedidos Ingresados*/
const MostrarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedidos.find();
        const pedidosFechas = pedidos.map(pedido => {
            return {
                _id: pedido._id,
                usuarioPedido: pedido.usuarioPedido,
                direccion: pedido.direccion,
                telefono: pedido.telefono,
                totalcompra: pedido.totalcompra,
                FechaGeneracion: pedido.FechaGeneracion.toISOString().substring(0, 10),
                FechaEntrega: pedido.FechaEntrega.toISOString().substring(0, 10),
                Estado: pedido.Estado
            };
        });
        res.json(pedidosFechas);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};

module.exports = {
    IngresoPedidos: IngresoPedidos,
    TraerDatos: TraerDatos,
    EditarPedidos: EditarPedidos,
    MostrarPedidos: MostrarPedidos,
    EliminarPedidos: EliminarPedidos,
    MostrarPedidosPorUsuario: MostrarPedidosPorUsuario
}