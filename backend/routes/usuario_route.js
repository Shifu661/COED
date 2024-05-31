import { createUsuario, getUsuarioById, getUsuarios, updateUsuario, deleteUsuarioId, loginUsuario } from "../controllers/usuario_controller.js";
import express from 'express';

// Creamos la instancia de la clase express
const routerUsuario = express.Router()

routerUsuario.post('/usuario',createUsuario)
routerUsuario.get('/usuario/:idUsuario',getUsuarioById)
routerUsuario.get('/usuario',getUsuarios)
routerUsuario.put('/usuario/:idUsuario',updateUsuario)
routerUsuario.delete('/usuario/:idUsuario',deleteUsuarioId)
routerUsuario.post('/usuario/login',loginUsuario)


export default routerUsuario