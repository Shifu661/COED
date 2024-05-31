import express from 'express';
import cors from 'cors';
import routerUsuario from './routes/usuario_route.js';
import routerDispositivo from './routes/dispositivo_route.js';
import routerColabFamiliar from './routes/colab_familiar_route.js';
import routerAlerta from './routes/alerta_route.js';
import routerConsumo from './routes/consumo_route.js';

import morgan from 'morgan';

// Instanciamos una "app" de la función express
const app = express()

// Habilitar CORS
app.use(cors());

// Configuramos el puerto del servidor
const port = 8003;
app.use(express.json());
app.use(morgan('combined'));

app.use('/COED', routerUsuario);
app.use('/COED', routerDispositivo);
app.use('/COED', routerColabFamiliar);
app.use('/COED', routerAlerta);
app.use('/COED', routerConsumo);

app.listen(port,()=>{
    console.log(`Servidor en: http://127.0.0.1:${port}`)
})
