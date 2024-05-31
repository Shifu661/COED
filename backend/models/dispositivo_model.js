import { connection } from '../conexion_db.js';

const DispositivoModel = {
  // Create (Crear) - Crear un nuevo dispositivo
  createDispositivo: (nombreDispositivo, tipoDispositivo, descripcion, idUsuario, callback) => {
    connection.query('SELECT COUNT(*) AS num_registros FROM dispositivo', (err, result) => {
      const num_registros = parseInt(result.rows[0].num_registros) + 1;

      const sql = 'INSERT INTO dispositivo (idDispositivo, nombreDispositivo, tipoDispositivo, descripcion, idUsuario) VALUES (' + num_registros + ', $1, $2, $3, $4)';
      connection.query(sql, [nombreDispositivo, tipoDispositivo, descripcion, idUsuario], (err, result) => {
        if (err) {
          return callback(err);
        }

        //Manejando estos tipos de dispositivos: 'Televisor', 'Laptop', 'Celular', 'Consola', 'Electrodomestico'
        const tipo = tipoDispositivo;
        if (tipo === 'Televisor') {
            connection.query('SELECT COUNT(*) AS num_televisores FROM televisores', (err, result) => {
                const num_televisores = parseInt(result.rows[0].num_televisores) + 1;
          
                const sql = 'INSERT INTO televisores (idTelevisor, idDispositivo) VALUES (' + num_televisores + ', '+ num_registros + ')';
                connection.query(sql, (err, result) => {
                    if (err) {
                        return callback(err);
                    }
                    console.log('Televisor creado');
                });
            });
        }
        else if (tipo === 'Laptop') {
            connection.query('SELECT COUNT(*) AS num_laptops FROM laptops', (err, result) => {
                const num_laptops = parseInt(result.rows[0].num_laptops) + 1;
          
                const sql = 'INSERT INTO televisores (idTelevisor, idDispositivo) VALUES (' + num_laptops + ', '+ num_registros + ')';
                connection.query(sql, (err, result) => {
                    if (err) {
                        return callback(err);
                    }
                    console.log('Laptop creada');
                });
            });
        }
        else if (tipo === 'Celular') {
            connection.query('SELECT COUNT(*) AS num_celulares FROM celulares', (err, result) => {
                const num_celulares = parseInt(result.rows[0].num_celulares) + 1;
          
                const sql = 'INSERT INTO celulares (idCelular, idDispositivo) VALUES (' + num_celulares + ', '+ num_registros + ')';
                connection.query(sql, (err, result) => {
                    if (err) {
                        return callback(err);
                    }
                    console.log('Celular creado');
                });
            });
        }
        else if (tipo === 'Consola') {
            connection.query('SELECT COUNT(*) AS num_consolas FROM consolas', (err, result) => {
                const num_consolas = parseInt(result.rows[0].num_consolas) + 1;
          
                const sql = 'INSERT INTO consolas (idConsola, idDispositivo) VALUES (' + num_consolas + ', '+ num_registros + ')';
                connection.query(sql, (err, result) => {
                    if (err) {
                        return callback(err);
                    }
                    console.log('Consola creada');
                });
            });                
        }
        else if (tipo === 'Electrodomestico') {
            connection.query('SELECT COUNT(*) AS num_electrodomesticos FROM electrodomesticos', (err, result) => {
                const num_electrodomesticos = parseInt(result.rows[0].num_electrodomesticos) + 1;
          
                const sql = 'INSERT INTO electrodomesticos (idElectrodomestico, idDispositivo) VALUES (' + num_electrodomesticos + ', '+ num_registros + ')';
                connection.query(sql, (err, result) => {
                    if (err) {
                        return callback(err);
                    }
                    console.log('Electrodomestico creado');
                });
            });
        }

        return callback(null, result);
      });
    });
  },

  // Read (Leer) - Obtener un dispositivo por ID
  getDispositivoById: (idDispositivo, callback) => {
    const sql = 'SELECT * FROM dispositivo WHERE idDispositivo = $1';
    connection.query(sql, [idDispositivo], (err, result) => {
      if (err) {
        return callback(err);
      }
      if (Array.isArray(result.rows)) {
        return callback(null, result.rows[0]);
      } else {
        return callback(new Error('Dispositivo no encontrado'));
      }
    });
  },

  // Read (Leer) - Obtener todos los dispositivos
  getDispositivos: (callback) => {
    const sql = 'SELECT * FROM dispositivo';
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

  // Update (Actualizar) - Actualizar información de dispositivo
  updateDispositivo: (idDispositivo, nombreDispositivo, tipoDispositivo, descripcion, callback) => {
    connection.query('SELECT tipoDispositivo AS tipoViejo FROM dispositivo WHERE idDispositivo = $1', [idDispositivo], (err, result) => {
        if (err) {
            return callback(err);
        }

        //RECUERDA PASAR LA VARIABLE tipoViejo TODO CON MINUSCULAS, SINO SERA UNFDEFINED
        const tipoViejo = String(result.rows[0].tipoviejo);

        if (tipoViejo !== tipoDispositivo){
            var new_table;
            if (tipoDispositivo === 'Televisor') {
              new_table = 'televisores';
            } else if (tipoDispositivo === 'Laptop') {
              new_table = 'laptops';
            } else if (tipoDispositivo === 'Celular') {
              new_table = 'celulares';
            } else if (tipoDispositivo === 'Consola') {
              new_table = 'consolas';
            } else if (tipoDispositivo === 'Electrodomestico') {
              new_table = 'electrodomesticos';
            }


            if (tipoViejo === 'Televisor') {
              const televisor = 'SELECT idTelevisor AS idtele FROM televisores WHERE idDispositivo = $1'
              connection.query(televisor,  [idDispositivo], (err, result) => {
                  if (err) {
                      return callback(err);
                  }

                  const identificadorT = parseInt(result.rows[0].idtele);
        
                  const updateTelevisorSql = 'UPDATE televisores SET idTelevisor = idTelevisor - 1 WHERE idTelevisor > '+ identificadorT;
                  connection.query('DELETE FROM televisores WHERE idDispositivo = $1', [idDispositivo], (err, result) => {
                      if (err) {
                        return callback(err);
                      }
                      console.log('Televisor eliminado');
                      
                      connection.query(updateTelevisorSql, (updateErr, updateResult) => {
                        if (updateErr) {
                          return callback(updateErr);
                        }

                        connection.query('SELECT COUNT(*) AS num_reg_nuevo FROM ' + new_table, (err, result) => {
                          if (err) {
                            return callback(err);
                          }

                          const num_reg_nuevo = parseInt(result.rows[0].num_reg_nuevo) + 1;
                          const sql = 'INSERT INTO ' + new_table + ' (id' + tipoDispositivo + ', idDispositivo) VALUES (' + num_reg_nuevo + ', '+ idDispositivo + ');';
                          connection.query(sql, (err, result) => {
                              if (err) {
                                  return callback(err);
                              }
                              console.log(tipoDispositivo + ' creado');
                          });
                        });
                      });
                  });
              });
            }
            else if (tipoViejo === 'Laptop') {
              const laptop = 'SELECT idLaptop AS idlap FROM laptops WHERE idDispositivo = $1'
              connection.query(laptop, [idDispositivo], (err, result) => {
                  if (err) {
                      return callback(err);
                  }

                  const identificadorL = parseInt(result.rows[0].idlap);
        
                  const updateLaptopSql = 'UPDATE laptops SET idLaptop = idLaptop - 1 WHERE idLaptop > '+ identificadorL;
                  connection.query('DELETE FROM laptops WHERE idDispositivo = $1', [idDispositivo], (err, result) => {
                      if (err) {
                          return callback(err);
                      }
                      console.log('Laptop eliminado');
                      
                      connection.query(updateLaptopSql, (updateErr, updateResult) => {
                        if (updateErr) {
                          return callback(updateErr);
                        }

                        connection.query('SELECT COUNT(*) AS num_reg_nuevo FROM ' + new_table, (err, result) => {
                          if (err) {
                            return callback(err);
                          }

                          const num_reg_nuevo = parseInt(result.rows[0].num_reg_nuevo) + 1;
                          const sql = 'INSERT INTO ' + new_table + ' (id' + tipoDispositivo + ', idDispositivo) VALUES (' + num_reg_nuevo + ', '+ idDispositivo + ');';
                          connection.query(sql, (err, result) => {
                              if (err) {
                                  return callback(err);
                              }
                              console.log(tipoDispositivo + ' creado');
                          });
                        });
                      });
                  });
              });
            }
            else if (tipoViejo === 'Celular') {
              const celular = 'SELECT idCelular AS idcel FROM celulares WHERE idDispositivo = $1';
              connection.query(celular, [idDispositivo], (err, result) => {
                  if (err) {
                      return callback(err);
                  }

                  const identificadorC = parseInt(result.rows[0].idcel);
        
                  const updateCelularSql = 'UPDATE celulares SET idCelular = idCelular - 1 WHERE idCelular > '+ identificadorC;
                  connection.query('DELETE FROM celulares WHERE idDispositivo = $1', [idDispositivo], (err, result) => {
                      if (err) {
                        return callback(err);
                      }
                      console.log('Celular eliminado');
                      
                      connection.query(updateCelularSql, (updateErr, updateResult) => {
                        if (updateErr) {
                          return callback(updateErr);
                        }

                        connection.query('SELECT COUNT(*) AS num_reg_nuevo FROM ' + new_table, (err, result) => {
                          if (err) {
                            return callback(err);
                          }

                          const num_reg_nuevo = parseInt(result.rows[0].num_reg_nuevo) + 1;
                          const sql = 'INSERT INTO ' + new_table + ' (id'+ tipoDispositivo +', idDispositivo) VALUES (' + num_reg_nuevo + ', '+ idDispositivo + ');';
                          connection.query(sql, (err, result) => {
                              if (err) {
                                  return callback(err);
                              }
                              console.log('LLEGAMOS 4');
                              console.log(tipoDispositivo + ' creado');
                          });
                        });
                      });
                  });
              });
            }
            else if (tipoViejo === 'Consola') {
              const consola = 'SELECT idConsola AS idcons FROM consolas WHERE idDispositivo = $1'
              connection.query(consola, [idDispositivo], (err, result) => {
                  if (err) {
                      return callback(err);
                  }

                  const identificadorCo = parseInt(result.rows[0].idcons);
        
                  const updateConsolaSql = 'UPDATE consolas SET idConsola = idConsola - 1 WHERE idConsola > '+ identificadorCo;
                  connection.query('DELETE FROM consolas WHERE idDispositivo = $1', [idDispositivo], (err, result) => {
                      if (err) {
                          return callback(err);
                      }
                      console.log('Consola eliminada');
                      
                      connection.query(updateConsolaSql, (updateErr, updateResult) => {
                        if (updateErr) {
                          return callback(updateErr);
                        }

                        connection.query('SELECT COUNT(*) AS num_reg_nuevo FROM ' + new_table, (err, result) => {
                          if (err) {
                            return callback(err);
                          }

                          const num_reg_nuevo = parseInt(result.rows[0].num_reg_nuevo) + 1;
                          const sql = 'INSERT INTO ' + new_table + ' (id' + tipoDispositivo + ', idDispositivo) VALUES (' + num_reg_nuevo + ', '+ idDispositivo + ');';
                          connection.query(sql, (err, result) => {
                              if (err) {
                                  return callback(err);
                              }
                              console.log(tipoDispositivo + ' creado');
                          });
                        });
                      });
                  });
              });
            }
            else if (tipoViejo === 'Electrodomestico') {
              const electrodomestico = 'SELECT idElectrodomestico AS idelec FROM electrodomesticos WHERE idDispositivo = $1'
              connection.query(electrodomestico, [idDispositivo], (err, result) => {
                  if (err) {
                      return callback(err);
                  }

                  const identificadorE = parseInt(result.rows[0].idelec);
        
                  const updateElectrodomesticoSql = 'UPDATE electrodomesticos SET idElectrodomestico = idElectrodomestico - 1 WHERE idElectrodomestico > '+ identificadorE;
                  connection.query('DELETE FROM electrodomesticos WHERE idDispositivo = $1', [idDispositivo], (err, result) => {
                      if (err) {
                          return callback(err);
                      }
                      console.log('Electrodomestico eliminado');
                      
                      connection.query(updateElectrodomesticoSql, (updateErr, updateResult) => {
                        if (updateErr) {
                          return callback(updateErr);
                        }

                        connection.query('SELECT COUNT(*) AS num_reg_nuevo FROM ' + new_table, (err, result) => {
                          if (err) {
                            return callback(err);
                          }

                          const num_reg_nuevo = parseInt(result.rows[0].num_reg_nuevo) + 1;
                          const sql = 'INSERT INTO ' + new_table + ' (id' + tipoDispositivo + ', idDispositivo) VALUES (' + num_reg_nuevo + ', '+ idDispositivo + ');';
                          connection.query(sql, (err, result) => {
                              if (err) {
                                  return callback(err);
                              }
                              console.log(tipoDispositivo + ' creado');
                          });
                        });
                      });
                  });
              });
            }            
        }

        const sql = 'UPDATE dispositivo SET nombreDispositivo = $2, tipoDispositivo = $3, descripcion = $4 WHERE idDispositivo = $1';
        connection.query(sql, [idDispositivo, nombreDispositivo, tipoDispositivo, descripcion], (err, result) => {
          if (err) {
            return callback(err);
          }

          return callback(null, result);
        });
    });    
  },

  // Delete (Eliminar) - Eliminar un dispositivo por ID
  deleteDispositivo: (idDispositivo, callback) => {
    const deleteSql = 'DELETE FROM dispositivo WHERE idDispositivo = $1';
    const updateSql = 'UPDATE dispositivo SET idDispositivo = idDispositivo - 1 WHERE idDispositivo > $1';

    connection.query(deleteSql, [idDispositivo], (err, result) => {
      if (err) {
        return callback(err);
      }

      connection.query(updateSql, [idDispositivo], (updateErr, updateResult) => {
        if (updateErr) {
          return callback(updateErr);
        }
        return callback(null, result);
      });
    });
  },

};

export default DispositivoModel;
