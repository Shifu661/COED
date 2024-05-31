import { createConsumo, getConsumoById, getConsumos, updateConsumo, deleteConsumo, compararConsumo } from "../controllers/consumo_controller.js";
import express from 'express';

// Creamos la instancia de la clase express
const routerConsumo = express.Router()

routerConsumo.post('/consumo', createConsumo)
routerConsumo.get('/consumo/:idConsumo', getConsumoById)
routerConsumo.get('/consumo', getConsumos)
routerConsumo.put('/consumo/:idConsumo', updateConsumo)
routerConsumo.delete('/consumo/:idConsumo', deleteConsumo)
routerConsumo.post('/consumo/comparar', compararConsumo)


export default routerConsumo