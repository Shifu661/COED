// Importa Express y el controlador getAlertaById
import express from 'express';
import { getAlertaById } from "./controllers/alerta_controller.js";

// Crea una instancia de Express y configura la ruta para el controlador
const app = express();

app.get('/alertas/:idAlerta', (req, res) => {
    // Simula una solicitud GET con un parámetro idAlerta
    const idAlerta = req.params.idAlerta;

    // Llama al controlador getAlertaById como lo haría una solicitud real
    getAlertaById({ params: { idAlerta } }, {
        // Objeto simulado de respuesta con métodos como status y json
        status: (code) => {
            console.log('Código de estado:', code);
            return {
                json: (data) => {
                    console.log('Respuesta:', data);
                    res.destroy(); // Forzar cierre de la conexión
                },
            };
        },
    });
});

// Inicia el servidor en el puerto 3000 (o el puerto que desees)
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');

    // Simular una solicitud GET con un ID específico (por ejemplo, ID = 1)
    const simulatedReq = {
        params: { idAlerta: '1' }, // Aquí especifica el ID que deseas probar
    };

    // Llama al controlador getAlertaById con la solicitud simulada
    getAlertaById(simulatedReq);
});
