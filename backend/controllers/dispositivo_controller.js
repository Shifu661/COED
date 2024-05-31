import DispositivoModel from '../models/dispositivo_model.js';

// Controlador para registrar un nuevo dispositivo
export const createDispositivo = async (req, res) => {
    const { nombreDispositivo, tipoDispositivo, descripcion, idUsuario } = req.body;

    try {
        DispositivoModel.createDispositivo(nombreDispositivo, tipoDispositivo, descripcion, idUsuario, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'No se pudo registrar el dispositivo' });
            } else {
                res.status(201).json({ message: 'Dispositivo creado' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'No se registró el dispositivo' });
    }
};

// Controlador para obtener un dispositivo por ID
export const getDispositivoById = async (req, res) => {
    const idDispositivo = req.params.idDispositivo;

    try {
        DispositivoModel.getDispositivoById(idDispositivo, (err, result) => {
            if (err) {
                res.status(404).json({ error: 'Dispositivo no encontrado' });
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        res.status(500).json({ error: `Error ${error}` });
    }
};

// Controlador para obtener todos los dispositivos
export const getDispositivos = async (req, res) => {
    try {
        DispositivoModel.getDispositivos((err, result) => {
            if (err) {
                res.status(500).json({ error: 'No se pueden obtener los dispositivos' });
            } else {
                if (Array.isArray(result)) {
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

// Controlador para actualizar un dispositivo
export const updateDispositivo = async (req, res) => {
    const idDispositivo = req.params.idDispositivo;
    const { nombreDispositivo, tipoDispositivo, descripcion } = req.body;

    try {
        DispositivoModel.updateDispositivo(idDispositivo, nombreDispositivo, tipoDispositivo, descripcion, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error al actualizar el dispositivo' });
            } else {
                res.status(200).json({ message: 'Dispositivo actualizado' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: `Error ${error}` });
    }
};

// Controlador para eliminar un dispositivo por ID
export const deleteDispositivoId = async (req, res) => {
    const idDispositivo = req.params.idDispositivo;

    try {
        DispositivoModel.deleteDispositivo(idDispositivo, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error al eliminar el dispositivo' });
            } else {
                res.status(200).json({ message: 'Dispositivo eliminado' });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en la eliminación del dispositivo' });
    }
};
