import { createDispositivo, getDispositivos, getDispositivoById, updateDispositivo, deleteDispositivoId } from "../controllers/dispositivo_controller.js";
import express from 'express';

// Creamos la instancia de la clase express
const routerDispositivo = express.Router()

routerDispositivo.post('/dispositivo', createDispositivo)
routerDispositivo.get('/dispositivo/:idDispositivo', getDispositivoById)
routerDispositivo.get('/dispositivo', getDispositivos)
routerDispositivo.put('/dispositivo/:idDispositivo', updateDispositivo)
routerDispositivo.delete('/dispositivo/:idDispositivo', deleteDispositivoId)

export default routerDispositivo