const { Client } = require('whatsapp-web.js');
const fs = require('fs');

const SESSION_FILE_PATH = './session.json';
let sessionData;

if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({ session: sessionData });

client.initialize();

const express = require('express');
const router = express.Router();

// Endpoint para verificar o status da conexão
router.get('/status', (req, res) => {
    if (client && client.pupPage && client.pupPage.isConnected) {
        res.json({ status: 'Conectado!' });
    } else {
        res.json({ status: 'Conectando...' });
    }
});

module.exports = router;
