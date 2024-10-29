// server.js

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS para aceptar solicitudes desde cualquier origen (ajustable en producción)
app.use(cors());
app.use(express.json());

// Configuración del módem (cambia los datos según corresponda)
const MODEM_IP = 'http://192.168.20.1';
const MODEM_USERNAME = 'admin';
const MODEM_PASSWORD = 'comtecoadsl';

// Ruta para probar la conexión al módem
app.get('/connect', async (req, res) => {
  try {
    const auth = Buffer.from(`${MODEM_USERNAME}:${MODEM_PASSWORD}`).toString('base64');
    const response = await axios.get(MODEM_IP, {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });

    if (response.status === 200) {
      res.status(200).json({ message: 'Conexión exitosa al módem' });
    } else {
      res.status(401).json({ message: 'No se pudo conectar al módem' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al intentar conectar', error: error.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Node.js corriendo en el puerto ${PORT}`);
});
