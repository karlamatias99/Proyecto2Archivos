const Tarjeta = require('../Models/Tarjeta');

const addTarjeta = async (req, res) => {
    const insertar = new Tarjeta({
        numeroTarjeta: req.body.numeroTarjeta,
        nombreUsuario: req.body.nombreUsuario,
        vencimiento: req.body.vencimiento,
        CVV: req.body.CVV

    });

    const RegistrarTarjeta = await insertar.save();
    res.json(RegistrarTarjeta);
}

const editarTarjeta = async (req, res) => {
    try {
        const { id } = req.params;
        const { nuevaTarjeta, nombreUsuario, vencimiento, cvv } = req.body;

        const actualizar = await Tarjeta.findByIdAndUpdate(id, { nuevaTarjeta, nombreUsuario, vencimiento, cvv }, { new: true });

        res.json(actualizar);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar su forma de pago');
    }
};

const EliminarTarjeta = async (req, res) => {
    try {
        const idTarjeta = req.params.id;
        const TarjetaEliminada = await Tarjeta.findByIdAndDelete(idTarjeta);

        if (!TarjetaEliminada) {
            return res.status(404).send('No se encontró ningúna tarjeta con ese ID');
        }

        res.status(200).send(`Se eliminó su forma de pago correctamente`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al intentar eliminar su forma de pago');
    }
};

const TraerDatos = async (req, res) => {
    try {
        const tarjeta = await Tarjeta.findById(req.params.id);
        res.json(tarjeta); // Devuelve el producto en formato JSON
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al buscar el metodo de pago');
    }
};

module.exports = {
    addTarjeta: addTarjeta,
    editarTarjeta: editarTarjeta,
    EliminarTarjeta: EliminarTarjeta,
    TraerDatos: TraerDatos
}