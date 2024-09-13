document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.getElementById('input');
  const sendButton = document.getElementById('send-btn');
  const messagesContainer = document.getElementById('messages');
  const addKnowledgeBtn = document.getElementById('add-knowledge-btn');
  const addRoutineBtn = document.getElementById('add-routine-btn');
  const knowledgeModal = document.getElementById('add-knowledge-modal');
  const routineModal = document.getElementById('add-routine-modal');
  const closeKnowledgeBtn = document.getElementById('close-knowledge');
  const closeRoutineBtn = document.getElementById('close-routine');
  const submitKnowledgeBtn = document.getElementById('submit-knowledge');
  const submitRoutineBtn = document.getElementById('submit-routine');

  const knowledgeBase = {
    "geladeira": "Entendo que você esteja tendo problemas com sua geladeira. Para começar, verifique se a temperatura está adequada e se as portas estão bem vedadas. Uma limpeza geral também pode ajudar. Se o problema persistir, talvez seja necessário um técnico. Posso te ajudar a agendar uma visita?",
    "máquina de lavar": "Sinto muito que você esteja enfrentando problemas com a máquina de lavar. Primeiramente, verifique se ela está nivelada, se o filtro está limpo e se não há sobrecarga de roupas. Se esses passos não resolverem, talvez um técnico precise dar uma olhada.",
    "fogão": "Sobre o fogão, certifique-se de que os queimadores estão limpos e que há um bom fornecimento de gás. Se o problema for com o forno, pode ser necessário verificar o termostato ou a resistência. Se precisar de ajuda adicional, estou aqui para ajudar!",
    "micro-ondas": "Por motivos de segurança, não recomendo tentar consertar o micro-ondas por conta própria. O ideal é agendar uma visita técnica para garantir que tudo seja feito de forma segura e correta. Posso te ajudar a marcar uma visita?",
    "horário": "Estamos aqui para atender você de segunda a sexta-feira, das 8h às 18h, e aos sábados das 8h às 12h. Se precisar de mais detalhes ou quiser saber sobre um horário específico, é só me avisar!",
    "agendamento": "Para agendar um serviço, você pode ligar para (11) 1234-5678 ou enviar um WhatsApp para (11) 98765-4321. Estamos aqui para ajudar com a marcação de horários que sejam convenientes para você.",
    "garantia": "Oferecemos uma garantia de 3 meses para todos os nossos serviços de reparo. Isso é para garantir que você esteja satisfeito com o serviço prestado. Se precisar de mais informações sobre a garantia, estou à disposição!",
    "preço": "Os preços podem variar conforme o serviço necessário. Para a maioria dos reparos, oferecemos orçamento gratuito. Se você tiver um serviço específico em mente, posso te fornecer uma estimativa de preço!"
  };

  const routines = [
    { trigger: 'agendar', response: 'Para agendar um serviço, por favor, ligue para (11) 1234-5678 ou envie um WhatsApp para (11) 98765-4321. Como posso ajudar com o agendamento?' },
    { trigger: 'horário de atendimento', response: 'Estamos disponíveis de segunda a sexta-feira, das 8h às 18h, e aos sábados das 8h às 12h. Se precisar de mais detalhes, estou aqui para ajudar!' }
  ];

  const greetings = {
    "olá": "Olá! Como posso ajudar você hoje? Se tiver alguma dúvida ou precisar de assistência, estou aqui para ajudar.",
    "oi": "Oi! Em que posso ajudar você hoje? Sinta-se à vontade para me perguntar qualquer coisa.",
    "bom dia": "Bom dia! Como posso assisti-lo hoje? Se precisar de ajuda com algo, é só me falar.",
    "boa tarde": "Boa tarde! Estou aqui para ajudar. O que você precisa hoje?",
    "boa noite": "Boa noite! Como posso ajudar você esta noite? Se tiver alguma dúvida, estou à disposição."
  };

  const showModal = (modal) => modal.style.display = 'flex';
  const hideModal = (modal) => modal.style.display = 'none';

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

    // Check greetings first
    for (const [key, value] of Object.entries(greetings)) {
      if (lowerMessage.includes(key)) return value;
    }

    // Check routines
    const matchedRoutine = routines.find(routine => lowerMessage.includes(routine.trigger.toLowerCase()));
    if (matchedRoutine) return matchedRoutine.response;

    // Check knowledge base
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(key.toLowerCase())) return value;
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

  // Handle modals
  addKnowledgeBtn.addEventListener('click', () => showModal(knowledgeModal));
  addRoutineBtn.addEventListener('click', () => showModal(routineModal));
  closeKnowledgeBtn.addEventListener('click', () => hideModal(knowledgeModal));
  closeRoutineBtn.addEventListener('click', () => hideModal(routineModal));

  submitKnowledgeBtn.addEventListener('click', () => {
    const key = document.getElementById('knowledge-key').value.trim();
    const value = document.getElementById('knowledge-value').value.trim();
    if (key && value) {
      knowledgeBase[key.toLowerCase()] = value;
      hideModal(knowledgeModal);
    }
  });

  submitRoutineBtn.addEventListener('click', () => {
    const trigger = document.getElementById('routine-trigger').value.trim();
    const response = document.getElementById('routine-response').value.trim();
    if (trigger && response) {
      routines.push({ trigger, response });
      hideModal(routineModal);
    }
  });
});
