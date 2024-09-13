document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('input');
    const sendButton = document.getElementById('send-btn');
    const messagesContainer = document.getElementById('messages');

    const knowledgeBase = {
        "geladeira": {
            response: "Para problemas com a geladeira, verifique a temperatura, a vedação das portas e faça uma limpeza geral. Se o problema persistir, agende uma visita técnica.",
            followUp: "Qual o problema específico que você está enfrentando com a geladeira?"
        },
        "máquina de lavar": {
            response: "Verifique se a máquina está nivelada, se o filtro está limpo e se não há sobrecarga. Se o problema persistir, um técnico pode ajudar.",
            followUp: "Você notou algum barulho estranho ou vazamento?"
        },
        "fogão": {
            response: "Verifique se os queimadores estão limpos e se há fornecimento adequado de gás. Para problemas no forno, pode ser necessário verificar o termostato.",
            followUp: "Pode me dizer mais sobre o problema com o fogão?"
        },
        "micro-ondas": {
            response: "Não recomendamos consertar o micro-ondas sozinho. Agende uma visita técnica para uma avaliação segura.",
            followUp: "Qual sintoma específico você está observando no micro-ondas?"
        },
        "ar condicionado": {
            response: "Para o ar condicionado, verifique se o filtro está limpo e se o aparelho está bem instalado. Se houver vazamento, um técnico pode ajudar.",
            followUp: "O que exatamente está acontecendo com o ar condicionado?"
        },
        "horário de atendimento": "Estamos disponíveis de segunda a sexta-feira, das 8h às 18h, e aos sábados das 8h às 12h.",
        "preço": "Os preços variam conforme o serviço necessário. Oferecemos orçamento gratuito para a maioria dos reparos.",
        "contato com atendente": "Para falar com um atendente humano, ligue para (11) 1234-5678 ou envie um WhatsApp para (11) 98765-4321. Estamos à disposição para ajudar."
    };

    const personalQuestions = {
        "tudo bem": "Sim, estou bem, obrigado por perguntar! Como posso ajudar você hoje?",
        "como você está": "Estou bem, obrigado! E você, como está? Em que posso ajudar hoje?",
        "como vai": "Estou indo bem, obrigado! Há algo específico com o que eu possa ajudar?",
        "como está": "Estou ótimo, obrigado por perguntar! Em que posso ajudar você hoje?",
        "está bem": "Sim, estou bem. E você, como está? Como posso ajudar?",
        "como está você": "Estou bem, obrigado por perguntar. Como posso assisti-lo hoje?",
        "como está indo": "Estou indo bem, obrigado! Há algo específico com o que eu possa ajudar?"
    };

    const greetings = {
        "olá": "Olá! Como posso ajudar você hoje? Se tiver alguma dúvida ou precisar de assistência, estou aqui para ajudar.",
        "oi": "Oi! Em que posso ajudar você hoje? Sinta-se à vontade para me perguntar qualquer coisa.",
        "bom dia": "Bom dia! Como posso assisti-lo hoje? Se precisar de ajuda com algo, é só me falar.",
        "boa tarde": "Boa tarde! Estou aqui para ajudar. O que você precisa hoje?",
        "boa noite": "Boa noite! Como posso ajudar você esta noite? Se tiver alguma dúvida, estou à disposição."
    };

    const applianceProblems = {
        "não liga": "Se o aparelho não está ligando, pode ser um problema com a fonte de energia ou um fusível queimado. Verifique essas questões e, se necessário, um técnico pode ajudar.",
        "faz barulho": "Barulhos estranhos podem indicar problemas com o motor, rolamentos ou outras partes internas. Recomendo verificar se há obstruções e, se necessário, chamar um técnico.",
        "vaza água": "Se o aparelho está vazando água, pode ser um problema com as mangueiras ou a vedação. Verifique se há vazamentos e, se necessário, um técnico pode avaliar o problema.",
        "não resfria": "Se o aparelho não está resfriando adequadamente, pode ser um problema com o termostato, gás refrigerante ou outros componentes. Verifique e, se necessário, um técnico pode ajudar."
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

    const getResponse = (message) => {
        const lowerMessage = message.toLowerCase();

        // Check personal questions
        for (const [key, value] of Object.entries(personalQuestions)) {
            if (lowerMessage.includes(key)) return value;
        }

        // Check greetings first
        for (const [key, value] of Object.entries(greetings)) {
            if (lowerMessage.includes(key)) return value;
        }

        // Check appliance problems
        for (const [key, value] of Object.entries(applianceProblems)) {
            if (lowerMessage.includes(key)) return value;
        }

        // Check knowledge base
        for (const [key, value] of Object.entries(knowledgeBase)) {
            if (lowerMessage.includes(key)) {
                // If we have a follow-up question, include it in the response
                const response = value.response;
                const followUp = value.followUp;
                return `${response} ${followUp}`;
            }
        }

        // Default response
        return "Desculpe, não consegui entender sua mensagem. Poderia me dar mais detalhes ou me dizer como posso ajudar de outra forma?";
    };

    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<div class="bubble">${text}</div>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
    };

    // Handle Enter key
    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    // Handle Send button click
    sendButton.addEventListener('click', sendMessage);
});
