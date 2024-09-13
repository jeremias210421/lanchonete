const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const fs = require('fs');
const express = require('express');

const SESSION_FILE_PATH = './session.json';
let sessionData;

if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({ session: sessionData });

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR Code recebido! Abra o WhatsApp e leia o código QR.');
});

client.on('ready', () => {
    console.log('Cliente está pronto!');
});

client.on('authenticated', (session) => {
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error('Falha ao salvar sessão:', err);
        }
    });
});

client.on('auth_failure', (message) => {
    console.error('Falha na autenticação:', message);
});

client.on('message', async (msg) => {
    console.log(`Mensagem recebida: ${msg.body}`);
    const response = await generateAutoResponse(msg.body);
    if (response) {
        client.sendMessage(msg.from, response);
    }
});

client.initialize();

// Função para gerar uma resposta automática
async function generateAutoResponse(message) {
    // Lógica para gerar uma resposta automática
    return `Resposta automática para: ${message}`;
}

// Configuração do servidor Express
const app = express();
app.use(express.json());

app.get('/api/status', (req, res) => {
    if (client && client.pupPage && client.pupPage.isConnected) {
        res.json({ status: 'Conectado!' });
    } else {
        res.json({ status: 'Conectando...' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
