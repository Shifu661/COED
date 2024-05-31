import AlertaModel from '../models/alerta_model.js';

// Controlador para registrar una nueva alerta (Recordatorio)
export const createAlertaR = async (req, res) => {
    const { nombreAlerta, descripcion, fecha, hora, idUsuario } = req.body;

    try {
        AlertaModel.createAlertaR(nombreAlerta, descripcion, fecha, hora, idUsuario, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'No se pudo registrar alerta' });
            } else {
                res.status(201).json({ message: 'Alerta creada' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'No se registró la alerta' });
    }
};

// Controlador para registrar una nueva alerta (AlertaConsumo)
export const createAlertaAC = async (req, res) => {
    const { idUsuario, idConsumo } = req.body;

    try {
        AlertaModel.createAlertaAC(idUsuario, idConsumo, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'No se pudo registrar alerta del consumo' });
            } else {
                res.status(201).json({ message: 'Alerta del consumo creada' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'No se registró la alerta del consumo' });
    }
};

// Controlador para conseguir una alerta por ID
export const getAlertaById = async (req, res) => {
    const idAlerta = req.params.idAlerta;

    try {
        AlertaModel.getAlertaById(idAlerta, (err, result) => {
            if (err) {
                res.status(404).json({ error: 'Alerta no encontrada' });
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        res.status(500).json({ error: `Error ${error}` });
    }
}

// Controlador para conseguir todas las alertas
export const getAlertas = async (req, res) => {
    try {
        AlertaModel.getAlertas((err, result) => {
            if (err) {
                res.status(500).json({ error: 'No se puede ver las alertas' });
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
}

// Controlador para actualizar alerta
export const updateAlerta = async (req, res) => {
    const idAlerta = req.params.idAlerta;
    const { nombreAlerta, descripcion, fecha, hora } = req.body;

    try {
        AlertaModel.updateAlerta(idAlerta, nombreAlerta, descripcion, fecha, hora, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'No se pudo actualizar la alerta' });
            } else {
                res.status(200).json({ message: 'Alerta actualizada' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: `Error ${error}` });
    }
}

// Controlador para eliminar alerta
export const deleteAlerta = async (req, res) => {
    const idAlerta = req.params.idAlerta;

    try {
        AlertaModel.deleteAlerta(idAlerta, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'No se pudo eliminar la alerta' });
            } else {
                res.status(200).json({ message: 'Alerta eliminada' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: `Error ${error}` });
    }
}

//Controlador para cambiar el estado de la alerta
export const updateEstadoAlerta = async (req, res) => {
    const idAlerta = req.params.idAlerta;
    const { estado } = req.body;

    try {
        AlertaModel.updateEstadoAlerta(idAlerta, estado, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'No se pudo actualizar el estado de la alerta' });
            } else {
                res.status(200).json({ message: 'Estado de la alerta actualizado' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: `Error ${error}` });
    }
}