import { connection } from "../conexion_db.js";

const AlertaModel = {
    // Create (Crear) - Crear una nueva alerta (Recordatorio)
    createAlertaR: (nombreAlerta, descripcion, fecha, hora, idUsuario, callback) => {
        connection.query('SELECT COUNT(*) AS num_registros FROM alerta', (err, result) => {
            const num_registros = parseInt(result.rows[0].num_registros) + 1;

            const tipoAlertaR = 'Recordatorio';

            const sql = 'INSERT INTO alerta(idalerta, nombreAlerta, tipoalerta, descripcion, estado, fecha, hora, idusuario) VALUES (' + num_registros + ', $1, \'' + tipoAlertaR + '\', $2, true, $3, $4, $5)';
            //console.log(sql);
            connection.query(sql, [nombreAlerta, descripcion, fecha, hora, idUsuario], (err, result) => {
                //console.log('LLEGAMOS AQUI');

                if (err) {
                    console.log('ERROR AQUI: ' + err );
                    return callback(err);
                }

                //console.log('LLEGAMOS AQUI');

                connection.query('SELECT COUNT(*) AS num_recordatorios FROM recordatorio', (err, result) => {
                    const num_recordatorios = parseInt(result.rows[0].num_recordatorios) + 1;
                    
                    const sql = 'INSERT INTO recordatorio (idRecordatorio, idAlerta) VALUES (' + num_recordatorios + ', ' + num_registros + ')';
                    connection.query(sql, (err, result) => {
                        if (err) {
                            return callback(err);
                        }
                        console.log('Recordatorio creado');
                    });
                });

                return callback(null, result);
            });
        });
    },



    //Create (Crear) - Crear una nueva alerta (AlertaConsumo)
    createAlertaAC: (idUsuario, idConsumo, callback) => {
        connection.query('SELECT idAlertaConsumo AS total FROM alertaConsumo WHERE idConsumo = $1', [idConsumo], (err, result) => {            
            if (err) {
                // console.log('ERROR AQUI: ' + err );
                return callback(err);
            }            
            
            const total = result.rows.length;
            // console.log('LLEGAMOS AQUI: ' + total);

            if (result.rows.length > 0) {
                return callback(new Error('Alerta del consumo ya existe'));
            } else {
                console.log('Alerta del consumo no existe');
                connection.query('SELECT COUNT(*) AS num_registros FROM alerta', (err, result) => {
                    const num_registros = parseInt(result.rows[0].num_registros) + 1;
        
                    const dispositivoSQL = 'SELECT d.nombreDispositivo AS dispositivo FROM dispositivo d JOIN consumo c ON d.idDispositivo = c.idDispositivo WHERE c.idConsumo = $1;';
                    connection.query(dispositivoSQL, [idConsumo], (err, result) => {
                        if (err) {
                            // console.log('ERROR AQUI 1: ' + err );
                            return callback(err);
                        }
                        
                        const dispositivo = String(result.rows[0].dispositivo);
                        const descripcion = 'El ' + dispositivo + ' está consumiendo demasiada energía eléctrica!';
                        const tipoAlertaAC = 'AlertaConsumo';
                        // Obtener la fecha y hora actuales
                        const fechaActual = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
                        console.log('fecha: ' + fechaActual);
                        const horaActual = new Date().toLocaleTimeString([], { hour12: false }); // Formato HH:MM:SS
                        console.log('hora: ' + horaActual);
        
                        const sql = 'INSERT INTO alerta(idalerta, nombreAlerta, tipoalerta, descripcion, estado, fecha, hora, idusuario) VALUES (' + num_registros + ', \'AlertaConsumo\', \'' + tipoAlertaAC + '\', \'' + descripcion + '\', true, \'' + fechaActual + '\', \'' + horaActual + '\', $1)';
                        
                        connection.query(sql, [idUsuario], (err, result) => {
        
                            if (err) {
                                console.log('ERROR AQUI 2: ' + err );
                                return callback(err);
                            }
        
                            connection.query('SELECT COUNT(*) AS num_alertaconsumo FROM alertaConsumo', (err, result) => {
                                const num_alertaconsumo = parseInt(result.rows[0].num_alertaconsumo) + 1;
                                
                                const sql = 'INSERT INTO alertaConsumo (idAlertaConsumo, idAlerta, idConsumo) VALUES (' + num_alertaconsumo + ', ' + num_registros + ', $2)';
                                connection.query(sql, (err, result) => {
                                    if (err) {
                                        return callback(err);
                                    }
                                    console.log('Alerta del consumo creado');
                                });
                            });
                        });
                    });
                });
            }
        });
    },

    // Read (Leer) - Obtener una alerta por ID
    getAlertaById: (idAlerta, callback) => {
        const sql = 'SELECT * FROM alerta WHERE idAlerta = $1';
        connection.query(sql, [idAlerta], (err, result) => {
            if (err) {
                return callback(err);
            }
            if (Array.isArray(result.rows)) {
                return callback(null, result.rows[0]);
            } else {
                return callback(new Error('Alerta no encontrada'));
            }
        });
    },

    // Read (Leer) - Obtener todas las alertas
    getAlertas: (callback) => {
        const sql = 'SELECT * FROM alerta';
        connection.query(sql, (err, result) => {
            if (err) {
                return callback(err);
            }
            if (Array.isArray(result.rows)) {
                return callback(null, result.rows);
            } else {
                return callback(new Error('Resultados inválidos'));
            }
        });
    },

    // Update (Actualizar) - Actualizar información de alerta
    updateAlerta: (idAlerta, nombreAlerta, descripcion, fecha, hora, callback) => {
        connection.query('SELECT tipoAlerta AS tipoDato FROM alerta WHERE idAlerta = $1', [idAlerta], (err, result) => {
            if (err) {
                return callback(err);
            }

            //RECUERDA PASAR LA VARIABLE tipoDato TODO CON MINUSCULAS, SINO SERA UNFDEFINED
            const tipoDato = String(result.rows[0].tipodato);

            if (tipoDato === 'Recordatorio') {
                const sql = 'UPDATE alerta SET nombreAlerta = $2, descripcion = $3, estado = true, fecha = $4, hora = $5 WHERE idAlerta = $1';
                connection.query(sql, [idAlerta, nombreAlerta, descripcion, fecha, hora], (err, result) => {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null, result);
                });
            } else {
                return callback(new Error('No se puede actualizar esta alerta'));
            }
        });
    },

    // Delete (Eliminar) - Eliminar una alerta por ID
    deleteAlerta: (idAlerta, callback) => {
        const deleteSql = 'DELETE FROM alerta WHERE idAlerta = $1';
        const updateSql = 'UPDATE alerta SET idAlerta = idAlerta - 1 WHERE idAlerta > $1';

        connection.query(deleteSql, [idAlerta], (err, result) => {
            if (err) {
                return callback(err);
            }

            connection.query(updateSql, [idAlerta], (err, result) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result);
            });
        });
    },

    // Update (Actualizar) - Actualizar estado de alerta
    updateEstadoAlerta: (idAlerta, callback) => {
        connection.query('SELECT estado AS estadoDato FROM alerta WHERE idAlerta = $1', [idAlerta], (err, result) => {
            if (err) {
                return callback(err);
            }

            const estadoDato = String(result.rows[0].estadodato);

            if (estadoDato === 'true') {
                const sql = 'UPDATE alerta SET estado = false WHERE idAlerta = $1';
                connection.query(sql, [idAlerta], (err, result) => {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null, result);
                });
            } else {
                const sql = 'UPDATE alerta SET estado = true WHERE idAlerta = $1';
                connection.query(sql, [idAlerta], (err, result) => {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null, result);
                });
            }
        });
    },
};

export default AlertaModel;