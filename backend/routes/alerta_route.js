import { createAlertaR, createAlertaAC, getAlertaById, getAlertas, updateAlerta, deleteAlerta, updateEstadoAlerta } from "../controllers/alerta_controller.js";
import express from 'express';

// Creamos la instancia de la clase express
const routerAlerta = express.Router()

routerAlerta.post('/alertaR', createAlertaR)
routerAlerta.post('/alertaAC', createAlertaAC)

routerAlerta.get('/alerta/:idAlerta', getAlertaById)
routerAlerta.get('/alerta', getAlertas)
routerAlerta.put('/alerta/:idAlerta', updateAlerta)
routerAlerta.delete('/alerta/:idAlerta', deleteAlerta)
routerAlerta.put('/alerta/estado/:idAlerta', updateEstadoAlerta)


export default routerAlerta