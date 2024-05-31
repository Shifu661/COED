import UsuarioModel from '../models/usuario_model.js'

// Controlador para registrar un nuevo usuario
export const createUsuario = async (req, res) => {
    const { nombresUsuario, apellidosUsuario, email, usuario, password } = req.body;

    try {
        UsuarioModel.createUsuario(nombresUsuario, apellidosUsuario, email, usuario, password, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'No se pudo registrar usuario' });
            } else {
                res.status(201).json({ message: 'Usuario creado' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'No se registró al usuario' });
    }
};

// Controlador para conseguir un usuario por ID
export const getUsuarioById = async (req, res) => {
    const idUsuario = req.params.idUsuario;

    try {
        UsuarioModel.getUsuarioById(idUsuario, (err, result) => {
            if (err) {
                res.status(404).json({ error: 'Usuario no encontrado' });
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        res.status(500).json({ error: `Error ${error}` });
    }
}

// Controlador para conseguir todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        UsuarioModel.getUsuarios((err, result) => {
            if (err) {
                res.status(500).json({ error: 'No se puede ver los usuarios' });
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

// Controlador para actualizar usuario
export const updateUsuario = async (req, res) => {
    const idUsuario = req.params.idUsuario;
    const { nombresUsuario, apellidosUsuario, email, usuario, password } = req.body;

    try {
        UsuarioModel.updateUsuario(idUsuario, nombresUsuario, apellidosUsuario, email, usuario, password, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error al actualizar el usuario' });
            } else {
                res.status(200).json({ message: 'Usuario actualizado' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: `Error de usuario ${error}` });
    }
}

// Controlador para eliminar usuario
export const deleteUsuarioId = async (req, res) => {
    const idUsuario = req.params.idUsuario;

    try {
        UsuarioModel.deleteUsuario(idUsuario, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error al eliminar el usuario' });
            } else {
                res.status(200).json({ message: 'Usuario eliminado!' });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en la eliminación del usuario' });
    }
}

// Controlador para iniciar sesión
export const loginUsuario = async (req, res) => {
    const { usuario, password } = req.body;

    try {
        UsuarioModel.loginUsuario(usuario, password, (err, result) => {
            if (err) {
                res.status(500).json({ success: false, error: 'Error al iniciar sesión' });
            } else if (result.length === 0) {
                res.status(401).json({ success: false, error: 'Credenciales inválidas' });
            } else {
                res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', user: result[0] });
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error al iniciar sesión' });
    }
};
