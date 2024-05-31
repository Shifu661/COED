import {connection} from '../conexion_db.js'; 

const UsuarioModel = {
  // Create (Crear) - Crear un nuevo usuario
  createUsuario: (nombres, apellidos, email, usuario, password, callback) => {
    connection.query('SELECT COUNT(*) AS num_registros FROM usuario', (err, result) => {
      const num_registros = parseInt(result.rows[0].num_registros) + 1;


      const sql = 'INSERT INTO usuario (idUsuario, nombresUsuario, apellidosUsuario, email, usuario, password) VALUES (' + num_registros + ', $1, $2, $3, $4, $5)';
      // console.log(sql);
      connection.query(sql, [nombres, apellidos, email, usuario, password], (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      });
    });
  },
  
  // Read (Leer) - Obtener un usuario por ID
  getUsuarioById: (idUsuario, callback) => {
      const sql = 'SELECT * FROM usuario WHERE idUsuario = $1';
      // console.log(idUsuario);
      connection.query(sql, [idUsuario], (err, result) => {
          // console.log(sql);
          if (err) {
              return callback(err);
          }
          // Verificar si result.rows es un array antes de devolverlo
          if (Array.isArray(result.rows)) {
              return callback(null, result.rows[0]); // Devuelve el primer usuario encontrado
          } else {
              return callback(new Error('Usuario no encontrado'));
          }
      });
  },

  // Read (Leer) - Obtener todos los usuarios
  getUsuarios: (callback) => {
      const sql = 'SELECT * FROM usuario';
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

  // Update (Actualizar) - Actualizar información de usuario
  updateUsuario: (idUsuario, nombres, apellidos, email, usuario, password, callback) => {
    const sql = 'UPDATE usuario SET nombresUsuario = $2, apellidosUsuario = $3, email = $4, usuario = $5, password = $6 WHERE idUsuario = $1';
    // console.log(idUsuario, nombres, apellidos, email, usuario, password);
    // console.log(sql);
    connection.query(sql, [idUsuario, nombres, apellidos, email, usuario, password], (err, result) => {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  },

  // Delete (Eliminar) - Eliminar un usuario por ID
  deleteUsuario: (idUsuario, callback) => {
    const deleteSql = 'DELETE FROM usuario WHERE idUsuario = $1';
    const updateSql = 'UPDATE usuario SET idUsuario = idUsuario - 1 WHERE idUsuario > $1';
  
    connection.query(deleteSql, [idUsuario], (err, result) => {
      if (err) {
        return callback(err);
      }
  
      connection.query(updateSql, [idUsuario], (updateErr, updateResult) => {
        if (updateErr) {
          return callback(updateErr);
        }
        return callback(null, result);
      });
    });
  },  

  // loginUsuario: (usuario, password, callback) => {
  //   const sql = 'SELECT * FROM usuario WHERE usuario = $1 AND password = $2';
  //   connection.query(sql, [usuario, password], (err, result) => {
  //       if (err) {
  //           return callback(err);
  //       }
  //       return callback(null, result.rows);
  //   });
  // },

  loginUsuario: (usuario, password, callback) => {
    const sql = 'SELECT * FROM usuario WHERE usuario = $1 AND password = $2';
    connection.query(sql, [usuario, password], (err, result) => {
        if (err) {
            return callback(err);
        }
        return callback(null, result.rows);
    });
  },

};

export default UsuarioModel;