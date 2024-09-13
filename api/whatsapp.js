const { Client } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

let client;

async function initializeClient() {
  if (!client) {
    const SESSION_FILE_PATH = path.join('/tmp', 'session.json');
    let sessionData;

    if (fs.existsSync(SESSION_FILE_PATH)) {
      sessionData = JSON.parse(fs.readFileSync(SESSION_FILE_PATH, 'utf8'));
    }

    client = new Client({ session: sessionData });

    client.on('authenticated', (session) => {
      fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(session));
    });

    await client.initialize();
  }
  return client;
}

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
  if (req.method === 'POST') {
    const { message } = req.body;
    const response = await generateAutoResponse(message);
    res.status(200).json({ response });
  } else if (req.method === 'GET') {
    try {
      const client = await initializeClient();
      if (client && client.pupPage && client.pupPage.isConnected()) {
        res.status(200).json({ status: 'Conectado!' });
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
