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

const { Client } = require('whatsapp-web.js');
const fs = require('fs');

const SESSION_FILE_PATH = './session.json';
let sessionData;

if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({ session: sessionData });

client.on('qr', (qr) => {
    console.log('QR Code:', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('authenticated', (session) => {
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error('Failed to save session:', err);
        }
    });
});

client.on('auth_failure', (message) => {
    console.error('Authentication failed:', message);
});

client.on('message', async (msg) => {
    console.log(`Received message: ${msg.body}`);
    
    const response = await generateAutoResponse(msg.body);
    if (response) {
        client.sendMessage(msg.from, response);
    }
});

client.initialize();

async function generateAutoResponse(message) {
    const responses = {
        'oi': 'Olá! Como posso ajudar?',
        'bom dia': 'Bom dia! Em que posso ajudar?',
        'tudo bem': 'Estou bem, obrigado! E você?',
        'horário': 'Estamos abertos de 8h às 18h de segunda a sexta.',
        'endereço': 'Nosso endereço é Rua Exemplo, 123, São Paulo - SP.',
        'preço': 'Os preços variam conforme o serviço. Por favor, entre em contato para um orçamento específico.',
    };
    const lowerCaseMessage = message.toLowerCase();
    return responses[lowerCaseMessage] || `Resposta automática para: ${message}`;
}

module.exports = async (req, res) => {
    const { message } = req.body;
    const response = await generateAutoResponse(message);
    res.status(200).json({ response });
};
