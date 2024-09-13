document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const messagesContainer = document.getElementById('messages');
    const statusElement = document.getElementById('status');

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

        try {
            const response = await fetch('/api/webhook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            appendMessage(data.response, 'ai');
        } catch (error) {
            console.error('Error sending message:', error);
            appendMessage('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
        } finally {
            sendButton.disabled = false;
        }
    }

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    async function updateStatus() {
        try {
            const response = await fetch('/api/whatsapp');
            const data = await response.json();
            statusElement.textContent = data.status;
        } catch (error) {
            statusElement.textContent = 'Erro ao conectar.';
        }
    }

    // Atualiza o status a cada 5 segundos
    setInterval(updateStatus, 5000);
    updateStatus(); // Atualiza imediatamente ao carregar a página
});
