document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('input');
    const sendButton = document.getElementById('send-btn');
    const attachButton = document.getElementById('attach-btn');
    const fileInput = document.getElementById('file-input');
    const messagesContainer = document.getElementById('messages');

    const knowledgeBase = {
        "geladeira": "Para problemas com a geladeira, verifique a temperatura, a vedação das portas e faça uma limpeza geral. Se o problema persistir, agende uma visita técnica.",
        "máquina de lavar": "Verifique se a máquina está nivelada, se o filtro está limpo e se não há sobrecarga. Se o problema persistir, um técnico pode ajudar.",
        "fogão": "Verifique se os queimadores estão limpos e se há fornecimento adequado de gás. Para problemas no forno, pode ser necessário verificar o termostato.",
        "micro-ondas": "Não recomendamos consertar o micro-ondas sozinho. Agende uma visita técnica para uma avaliação segura.",
        "ar condicionado": "Para o ar condicionado, verifique se o filtro está limpo e se o aparelho está bem instalado. Se houver vazamento, um técnico pode ajudar.",
        "horário de atendimento": "Estamos disponíveis de segunda a sexta-feira, das 8h às 18h, e aos sábados das 8h às 12h.",
        "preço": "Os preços variam conforme o serviço necessário. Oferecemos orçamento gratuito para a maioria dos reparos.",
        "contato com atendente": "Para falar com um atendente humano, ligue para (11) 1234-5678 ou envie um WhatsApp para (11) 98765-4321.",
        "buscamos": "Sim, oferecemos serviço de busca e entrega dos aparelhos em nossa loja. Para mais detalhes, entre em contato conosco.",
        "endereço": "Estamos localizados na Rua Exemplo, 123, Bairro Exemplo, Cidade, Estado.",
        "localização": "Estamos na Rua Exemplo, 123, Bairro Exemplo, Cidade, Estado."
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

    const
