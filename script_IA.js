document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('input');
    const sendButton = document.getElementById('send-btn');
    const attachButton = document.getElementById('attach-btn');
    const fileInput = document.getElementById('file-input');
    const messagesContainer = document.getElementById('messages');

    // Função para adicionar uma mensagem ao chat
    const addMessage = (text, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.innerHTML = `<div class="bubble">${text}</div>`;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    // Função para obter a resposta com base na mensagem do usuário
    const getResponse = (message) => {
        const lowerMessage = message.toLowerCase();
        
        // Respostas de boas-vindas
        for (const [key, response] of Object.entries(greetings)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        // Respostas pessoais
        for (const [key, response] of Object.entries(personalQuestions)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        // Problemas com eletrodomésticos
        for (const [key, response] of Object.entries(applianceProblems)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        // Outras perguntas
        for (const [key, response] of Object.entries(knowledgeBase)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        return "Desculpe, não consegui entender sua mensagem. Poderia me dar mais detalhes ou me dizer como posso ajudar de outra forma?";
    };

    // Adiciona uma mensagem quando o botão de enviar é clicado
    sendButton.addEventListener('click', () => {
        sendMessage();
    });

    // Adiciona uma mensagem quando a tecla Enter é pressionada
    inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Envia a mensagem e limpa o campo de entrada
    const sendMessage = () => {
        const messageText = inputField.value.trim();
        if (messageText) {
            addMessage(messageText, 'user');
            const response = getResponse(messageText);
            setTimeout(() => addMessage(response, 'ai'), 500);
            inputField.value = '';
            inputField.focus();
        }
    };
});
