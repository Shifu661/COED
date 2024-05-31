import { connection } from "../conexion_db.js";
import express from 'express';
// import { createAlertaAC } from "../controllers/alerta_controller.js";

const app = express();

const ConsumoModel = {
    // Create (Crear) - Crear un nuevo consumo
    createConsumo: (consumo, idDispositivo, callback) => {        
        connection.query('SELECT COUNT(*) AS num_registros FROM consumo', (err, result) => {
            const num_registros = parseInt(result.rows[0].num_registros) + 1;

            const sql = 'INSERT INTO consumo(idConsumo, consumo, idDispositivo) VALUES (' + num_registros + ', $1, $2)';
            //console.log(sql);
            connection.query(sql, [consumo, idDispositivo], (err, result) => {
                if (err) {
                    console.log('ERROR AQUI 1 : ' + err );
                    return callback(err);
                }

                // Verificar si el consumo es mayor que 100
                // if (consumo > 100) {
                //     // Obtener el idUsuario para llamar a createAlertaAC
                //     connection.query('SELECT u.idUsuario AS idu FROM usuario u JOIN dispositivo d ON d.idUsuario = u.idUsuario WHERE idDispositivo = $2', (err, result) => {
                //         if (err) {
                //             console.log('ERROR AQUI 2: ' + err);
                //             return callback(err);
                //         }

                //         const idu = parseInt(result.rows[0].idu);
                //         // Llamar a la función createAlertaAC
                //         createAlertaAC(idu, idDispositivo, callback);
                //     });
                // } else {
                //     return callback(null, result);
                // }
            });
        });
    },

    // Read (Leer) - Leer un consumo por ID
    getConsumoById: (idConsumo, callback) => {
        const sql = 'SELECT * FROM consumo WHERE idConsumo = $1';
        connection.query(sql, [idConsumo], (err, result) => {
            if (err) {
                return callback(err);
            }
            // Verificar si result.rows es un array antes de devolverlo
            if (Array.isArray(result.rows)) {
                return callback(null, result.rows[0]); // Devuelve el primer usuario encontrado
            } else {
                return callback(new Error('Consumo no encontrado'));
            }
        });
    },

    // Read (Leer) - Leer todos los consumos
    getConsumos: (callback) => {
        const sql = 'SELECT * FROM consumo';
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

    // Update (Actualizar) - Actualizar un consumo
    updateConsumo: (idConsumo, consumo, idDispositivo, callback) => {
        const sql = 'UPDATE consumo SET consumo = $2, idDispositivo = $3 WHERE idConsumo = $1';
        connection.query(sql, [idConsumo, consumo, idDispositivo], (err, result) => {
            if (err) {
                console.log('ERROR AQUI: ' + err);
                return callback(err);
            }

            // Verificar si el consumo es mayor que 100
            // if (consumo > 100) {
            //     // Obtener el idUsuario para llamar a createAlertaAC
            //     connection.query('SELECT u.idUsuario AS idu FROM usuario u JOIN dispositivo d ON d.idUsuario = u.idUsuario WHERE idDispositivo = $1', [idDispositivo],(err, result) => {
            //         if (err) {
            //             console.log('ERROR AQUI 2: ' + err);
            //             return callback(err);
            //         }

            //         const idu = parseInt(result.rows[0].idu);
            //         console.log('IDU: ' + idu);
            //         // Llamar a la función createAlertaAC
            //         createAlertaAC(idu, idDispositivo, callback);
            //     });
            // } else {
            //     return callback(null, result);
            // }

            return callback(null, result);
        });
    },

    // Delete (Eliminar) - Eliminar un consumo
    deleteConsumo: (idConsumo, callback) => {
        const sql = 'DELETE FROM consumo WHERE idConsumo = $1';
        connection.query(sql, [idConsumo], (err, result) => {
            if (err) {
                return callback(err);
            }

            return callback(null, result);
        });
    },

    // Comparación de consumo electrico entre 2 dispositivos
    compararConsumo: (idDispositivo1, idDispositivo2, callback) => {
        connection.query('SELECT consumo AS consumo1 FROM consumo WHERE idDispositivo = $1', [idDispositivo1], (err, result) => {
            if (err) {
                console.log('ERROR AQUI: ' + err);
                return callback(err);
            }
            
            const consumo1 = parseFloat(result.rows[0].consumo1);
            console.log('Consumo 1: ' + consumo1);

            connection.query('SELECT consumo AS consumo2 FROM consumo WHERE idDispositivo = $1', [idDispositivo2], (err, result) => {
                if (err) {
                    return callback(err);
                }

                const consumo2 = parseFloat(result.rows[0].consumo2);
                console.log('Consumo 2: ' + consumo2);

                let mensaje = '';

                if (consumo1 > consumo2) {
                    mensaje = 'El dispositivo ' + idDispositivo1 + ' consume más que el dispositivo ' + idDispositivo2;
                } else if (consumo1 < consumo2) {
                    mensaje = 'El dispositivo ' + idDispositivo2 + ' consume más que el dispositivo ' + idDispositivo1;
                } else {
                    mensaje = 'Ambos dispositivos consumen lo mismo';
                }

                return callback(null, mensaje);
            });
        });
    }
};

export default ConsumoModel;