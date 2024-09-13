// script.js
document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('input');
    const sendButton = document.getElementById('send-btn');
    const attachButton = document.getElementById('attach-btn');
    const fileInput = document.getElementById('file-input');
    const messagesContainer = document.getElementById('messages');

    const greetings = {
        'olá': 'Olá! Como posso ajudar você hoje?',
        'bom dia': 'Bom dia! Como posso ajudar você?',
        'boa tarde': 'Boa tarde! O que posso fazer por você?',
        'boa noite': 'Boa noite! Em que posso ajudar?',
    };

    const personalQuestions = {
        'como você está': 'Estou bem, obrigado! Como posso ajudar você hoje?',
        'tudo bem': 'Tudo ótimo, obrigado por perguntar! Em que posso ajudar?',
        'como vai': 'Vou bem, obrigado! E você, como está?',
    };

    const applianceProblems = {
        'geladeira': 'Verifique a temperatura e a vedação das portas. Caso o problema persista, entre em contato com um técnico.',
        'máquina de lavar': 'Certifique-se de que está nivelada e que o filtro está limpo. Caso continue com problemas, um técnico poderá ajudar.',
        'fogão': 'Verifique os queimadores e o fornecimento de gás. Se o problema for no forno, verifique o termostato.',
        'micro-ondas': 'Não tente consertar por conta própria. Agende uma visita técnica para uma avaliação profissional.',
    };

    const knowledgeBase = {
        'horário': 'Estamos disponíveis de segunda a sexta, das 8h às 18h, e aos sábados das 8h às 12h.',
        'endereço': 'Nosso endereço é Rua Exemplo, 123, São Paulo - SP.',
        'preço': 'Os preços variam conforme o serviço. Oferecemos orçamento gratuito para a maioria dos serviços.',
        'atendente': 'Se desejar falar com um atendente, ligue para (11) 1234-5678 ou envie um e-mail para atendimento@exemplo.com.',
    };

    const addMessage = (text, sender) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.innerHTML = `<div class="bubble">${text}</div>`;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    const getResponse = (message) => {
        const lowerMessage = message.toLowerCase();

        for (const [key, response] of Object.entries(greetings)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        for (const [key, response] of Object.entries(personalQuestions)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        for (const [key, response] of Object.entries(applianceProblems)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        for (const [key, response] of Object.entries(knowledgeBase)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        return "Desculpe, não consegui entender sua mensagem. Poderia me dar mais detalhes ou me dizer como posso ajudar de outra forma?";
    };

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

    sendButton.addEventListener('click', sendMessage);

    inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});
