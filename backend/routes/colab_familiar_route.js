import { createColabFamiliar, getColabFamiliarByIdUsuario, getColabFamiliarUsuariosPermitidos, deleteColabFamiliarIdUsuarioPermitido } from '../controllers/colab_familiar_controller.js';
import express from 'express';

// Creamos la instancia de la clase express
const routerColabFamiliar = express.Router()

routerColabFamiliar.post('/colab_familiar', createColabFamiliar)
routerColabFamiliar.get('/colab_familiar/:idUsuario', getColabFamiliarByIdUsuario)
routerColabFamiliar.get('/colab_familiar', getColabFamiliarUsuariosPermitidos)
routerColabFamiliar.delete('/colab_familiar/:idUsuarioPermitido', deleteColabFamiliarIdUsuarioPermitido)

export default routerColabFamiliar