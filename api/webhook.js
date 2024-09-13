module.exports = async (req, res) => {
    const { message } = req.body;
    
    // Encaminha a mensagem para o whatsapp.js
    const response = await fetch(`${process.env.WHATSAPP_API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    }).then(res => res.json());

    res.status(200).json(response);
};
