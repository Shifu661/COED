import ColabFamiliarModel from '../models/colab_familiar_model.js';

// Controlador para registrar una nueva colaboración familiar
export const createColabFamiliar = async (req, res) => {
    const { idUsuarioPermitido, idUsuario } = req.body;

    try {
        ColabFamiliarModel.createColabFamiliar(idUsuarioPermitido, idUsuario, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'No se pudo registrar al usuario permitido' });
            } else {
                res.status(201).json({ message: 'Usuario Permitido agregado' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'No se registró la colaboración familiar' });
    }
};

// Controlador para conseguir una colaboración familiar por ID de Usuario
export const getColabFamiliarByIdUsuario = async (req, res) => {
    const idUsuario = req.params.idUsuario;

    try {
        ColabFamiliarModel.getColabFamiliarByIdUsuario(idUsuario, (err, result) => {
            if (err) {
                res.status(404).json({ error: 'Usuario permitido no encontrado' });
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        res.status(500).json({ error: `Error ${error}` });
    }
}

// Controlador para conseguir todas las colaboraciones familiares
export const getColabFamiliarUsuariosPermitidos = async (req, res) => {
    try {
        ColabFamiliarModel.getColabFamiliarUsuariosPermitidos((err, result) => {
            if (err) {
                res.status(500).json({ error: 'No se pueden ver los usuarios permitidos' });
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

// Controlador para eliminar una colaboración familiar por ID de usuario permitido
export const deleteColabFamiliarIdUsuarioPermitido = async (req, res) => {
    const idUsuarioPermitido = req.params.idUsuarioPermitido;
    const idUsuario = req.body.idUsuario; // Agregar esta línea si el ID de usuario también se envía en el cuerpo de la solicitud

    try {
        ColabFamiliarModel.deleteColabFamiliar(idUsuarioPermitido, idUsuario, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error al eliminar un usuario permitido' });
            } else {
                res.status(200).json({ message: 'Usuario permitido eliminado' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: `Error ${error}` });
    }
}

