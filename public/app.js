document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const messagesContainer = document.getElementById('messages');
    const statusElement = document.getElementById('status');
    const qrCodeContainer = document.getElementById('qrCodeContainer');

    function appendMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}`;
        messageElement.innerHTML = `<p>${text}</p>`;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;

        appendMessage(message, 'user');
        messageInput.value = '';
        sendButton.disabled = true;

        const response = await fetch('/api/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        }).then(res => res.json());

        appendMessage(response.response, 'ai');
        sendButton.disabled = false;
    }

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    // Função para simular QR Code e conexão
    function simulateQRCode() {
        qrCodeContainer.innerHTML = '<img src="https://via.placeholder.com/150" alt="QR Code" />';
    }

    function updateStatus(status) {
        statusElement.textContent = status;
    }

    simulateQRCode();
    updateStatus('Conectado!');

    // Atualize o status de conexão com a API do WhatsApp
    // Use a API de backend para saber o status real
});
