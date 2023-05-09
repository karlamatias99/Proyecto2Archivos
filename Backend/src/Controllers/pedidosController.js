const Pedidos = require('../Models/Pedidos');
const moment = require('moment');


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

const TraerDatos = async (req, res) => {
    try {
        const pedido = await Pedidos.findById(req.params.id).select('idPedido usuarioPedido direccion telefono totalcompra FechaGeneracion FechaEntrega Estado');

        // Formatear las fechas antes de enviarlas en el resultado JSON
        const fechaGeneracion = moment(pedido.fechaGeneracion).format('YYYY-MM-DD');
        const fechaEntrega = moment(pedido.FechaEntrega).format('YYYY-MM-DD');


        // Crear un objeto con las propiedades que se quieren enviar en el resultado
        const resultado = {
            idPedido: pedido.idPedido,
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


/* document.getElementById("idPedido").value = data._id;
            document.getElementById("nombreUsuario").value = data.usuarioPedido;
            document.getElementById("direccion").value = data.direccion;
            document.getElementById("telefono").value = data.telefono;
            document.getElementById("totalCompra").value = data.totalCompra;
            document.getElementById("FechaGeneracion").value = data.FechaGeneracion;
            document.getElementById("FechaEntrega").value = data.FechaEntrega;
            document.getElementById("Estado").value = data.Estado; */

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