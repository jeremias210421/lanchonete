const { initializeClient, generateAutoResponse } = require('./whatsapp');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { message } = req.body;
    try {
      const client = await initializeClient();
      const response = await generateAutoResponse(message);
      await client.sendMessage(message.from, response);
      res.status(200).json({ response });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao processar mensagem', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
