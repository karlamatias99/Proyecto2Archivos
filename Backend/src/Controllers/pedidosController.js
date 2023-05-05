const Pedidos = require('../Models/Pedidos');

const IngresoPedidos = async (req, res) => {
    const insertar = new Pedidos({
        usuarioPedido: req.body.usuarioPedido,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        totalcompra: req.body.totalcompra,
        FechaGeneracion: req.body.FechaGeneracion,
        FechaEntrega: req.body.FechaEntrega,
        Estado: req.body.Estado
    });

    const RegistrarPedido = await insertar.save();
    res.json(RegistrarPedido);
}

const TraerDatos = async (req, res) => {
    try {
        const pedido = await Pedidos.findById(req.params.id);
        res.json(pedido); // Devuelve el producto en formato JSON
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al buscar el pedido');
    }
};


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



/*Mostrar Pedidos Ingresados*/
const MostrarPedidos = async (req, res) => {
    try {
        const pedido = await Pedidos.find();
        res.json(pedido);
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
    EliminarPedidos: EliminarPedidos 
}