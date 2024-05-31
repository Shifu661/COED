import { connection } from '../conexion_db.js';

const ColabFamiliarModel = {
    // Create (Crear) - Crear una nueva colaboración familiar
    createColabFamiliar: (idUsuarioPermitido, idUsuario, callback) => {
        // Verificar que idUsuarioPermitido y idUsuario no sean iguales
        if (idUsuarioPermitido === idUsuario) {
            return callback(new Error("El idUsuarioPermitido no puede ser igual al idUsuario"));
        }

        connection.query('SELECT COUNT(*) AS num_registros FROM colabfamiliar', (err, result) => {
            const num_registros = parseInt(result.rows[0].num_registros) + 1;
    
            const sql = 'INSERT INTO colabfamiliar (idColabFamiliar, idUsuarioPermitido, idUsuario) VALUES (' + num_registros + ', $1, $2)';
            // console.log(idColabFamiliar, idUsuarioPermitido, idUsuario);
            // console.log(sql);
            connection.query(sql, [idUsuarioPermitido, idUsuario], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
            });
        });
    },
    
    // Read (Leer) - Obtener la colaboración familiar por ID de Usuario
    getColabFamiliarByIdUsuario: (idUsuario, callback) => {
        const sql = 'SELECT u.nombresUsuario FROM usuario u JOIN colabFamiliar cf ON u.idUsuario = cf.idUsuarioPermitido WHERE cf.idUsuario = $1';
        // console.log(idUsuarioPermitido);
        connection.query(sql, [idUsuario], (err, result) => {
        // console.log(sql);
        if (err) {
            return callback(err);
        }
        // Verificar si result.rows es un array antes de devolverlo
        if (Array.isArray(result.rows)) {
            return callback(null, result.rows); // Devuelve la primera colaboración familiar encontrada
        } else {
            return callback(new Error('Usuario permitido no encontrada'));
        }
        });
    },
    
    // Read (Leer) - Obtener todas las colaboraciones familiares
    getColabFamiliarUsuariosPermitidos: (callback) => {
        const sql = 'SELECT u.nombresUsuario FROM usuario u JOIN colabFamiliar cf ON u.idUsuario = cf.idUsuarioPermitido';
        connection.query(sql, (err, result) => {
        if (err) {
            return callback(err);
        }
        // Verificar si result.rows es un array antes de devolverlo
        if (Array.isArray(result.rows)) {
            return callback(null, result.rows);
        } else {
            return callback(new Error('Resultados inválidos'));
        }
        });
    },
    
    // Delete (Eliminar) - Eliminar un usuario de la colaboración familiar por ID
    deleteColabFamiliar: (idUsuarioPermitido, idUsuario, callback) => {
        const selectSql = 'SELECT idColabFamiliar AS idcolfam FROM colabfamiliar WHERE idUsuarioPermitido = $1 AND idUsuario = $2';
        const deleteSql = 'DELETE FROM colabfamiliar WHERE idUsuarioPermitido = $1 AND idUsuario = $2';
    
        connection.query(selectSql, [idUsuarioPermitido, idUsuario], (selectErr, selectResult) => {
            if (selectErr) {
                return callback(selectErr);
            }
    
            const idcolfam = parseInt(selectResult.rows[0].idcolfam);
            const updateSql = 'UPDATE colabfamiliar SET idColabFamiliar = idColabFamiliar - 1 WHERE idColabFamiliar > $1';
    
            connection.query(deleteSql, [idUsuarioPermitido, idUsuario], (deleteErr, deleteResult) => {
                if (deleteErr) {
                    return callback(deleteErr);
                }
    
                connection.query(updateSql, [idcolfam], (updateErr, updateResult) => {
                    if (updateErr) {
                        return callback(updateErr);
                    }
    
                    return callback(null, deleteResult);
                });
            });
        });
    },     
};

export default ColabFamiliarModel;