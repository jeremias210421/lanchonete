const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const fs = require('fs');
const path = require('path');

let client;
let qrCodeData = null;

async function initializeClient() {
  if (!client) {
    const SESSION_FILE_PATH = path.join('/tmp', 'session.json');
    let sessionData;

    if (fs.existsSync(SESSION_FILE_PATH)) {
      sessionData = JSON.parse(fs.readFileSync(SESSION_FILE_PATH, 'utf8'));
    }

    client = new Client({ 
      session: sessionData,
      puppeteer: {
        args: ['--no-sandbox']
      }
    });

    client.on('qr', async (qr) => {
      qrCodeData = await qrcode.toDataURL(qr);
    });

    client.on('authenticated', (session) => {
      fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(session));
      qrCodeData = null;
    });

    client.on('ready', () => {
      console.log('Client is ready!');
      qrCodeData = null;
    });

    await client.initialize();
  }
  return client;
}

async function generateAutoResponse(message) {
  // ... (mantenha a função generateAutoResponse como estava antes)
}

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { message } = req.body;
    const response = await generateAutoResponse(message);
    res.status(200).json({ response });
  } else if (req.method === 'GET') {
    try {
      const client = await initializeClient();
      if (client.pupPage && client.pupPage.isConnected()) {
        if (qrCodeData) {
          res.status(200).json({ status: 'QR Code disponível', qrCode: qrCodeData });
        } else {
          res.status(200).json({ status: 'Conectado!' });
        }
      } else {
        res.status(200).json({ status: 'Conectando...' });
      }
    } catch (error) {
      res.status(500).json({ status: 'Erro ao verificar status', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
