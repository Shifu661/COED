import ConsumoModel from '../models/consumo_model.js';

// Controlador para registrar un nuevo consumo
export const createConsumo = async (req, res) => {
    const { consumo, idDispositivo } = req.body;

    try {
        ConsumoModel.createConsumo(consumo, idDispositivo, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'No se pudo registrar consumo' });
            } else {
                res.status(201).json({ message: 'Consumo creado' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'No se registró el consumo' });
    }
};

// Controlador para conseguir un consumo por ID
export const getConsumoById = async (req, res) => {
    const idConsumo = req.params.idConsumo;

    try {
        ConsumoModel.getConsumoById(idConsumo, (err, result) => {
            if (err) {
                res.status(404).json({ error: 'Consumo no encontrado' });
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        res.status(500).json({ error: `Error ${error}` });
    }
};

// Controlador para conseguir todos los consumos
export const getConsumos = async (req, res) => {
    try {
        ConsumoModel.getConsumos((err, result) => {
            if (err) {
                res.status(500).json({ error: 'No se puede ver los consumos' });
            } else {
                if (Array.isArray(result)) { // Verificar si result es un array
                    res.status(200).json(result);
                } else {
                    res.status(500).json({ error: 'Resultados inválidos' });
                }
            }
        });
    } catch (error) {
        res.status(500).json({ error: `Error ${error}` });
    }
};

// Controlador para actualizar un consumo
export const updateConsumo = async (req, res) => {
    const idConsumo = req.params.idConsumo;
    const { consumo, idDispositivo, } = req.body;

    try {
        ConsumoModel.updateConsumo(idConsumo, consumo, idDispositivo, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'No se pudo actualizar consumo' });
            } else {
                res.status(200).json({ message: 'Consumo actualizado' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'No se actualizó el consumo' });
    }
};

// Controlador para eliminar un consumo
export const deleteConsumo = async (req, res) => {
    const idConsumo = req.params.idConsumo;

    try {
        ConsumoModel.deleteConsumo(idConsumo, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'No se pudo eliminar el consumo' });
            } else {
                res.status(200).json({ message: 'Consumo eliminado' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'No se eliminó el consumo' });
    }
};

// Controlador para la comparación de consumo eléctrico entre 2 dispositivos
export const compararConsumo = async (req, res) => {
    const idDispositivo1 = req.body.idDispositivo1; // Captura el idDispositivo1 del cuerpo de la solicitud
    const idDispositivo2 = req.body.idDispositivo2; // Captura el idDispositivo2 del cuerpo de la solicitud

    try {
        ConsumoModel.compararConsumo(idDispositivo1, idDispositivo2, (err, result) => {
            if (err) {
                console.log('ERROR AQUI: ' + err);
                res.status(500).json({ error: 'No se pudo comparar los consumos' });
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        console.log('ERROR AQUI: ' + error);
        res.status(500).json({ error: 'No se comparó los consumos' });
    }
};

