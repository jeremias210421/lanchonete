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
        // ... (mantenha a função sendMessage como estava antes)
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
            
            if (data.qrCode) {
                qrCodeContainer.innerHTML = `<img src="${data.qrCode}" alt="QR Code" />`;
                qrCodeContainer.style.display = 'block';
            } else {
                qrCodeContainer.style.display = 'none';
            }
        } catch (error) {
            statusElement.textContent = 'Erro ao conectar.';
            qrCodeContainer.style.display = 'none';
        }
    }

    // Atualiza o status a cada 5 segundos
    setInterval(updateStatus, 5000);
    updateStatus(); // Atualiza imediatamente ao carregar a página
});
