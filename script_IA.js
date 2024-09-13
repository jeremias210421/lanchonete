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
    "geladeira": "Para problemas com geladeiras, verifique a temperatura, a vedação das portas e a limpeza geral. Se persistir, agende uma visita técnica.",
    "máquina de lavar": "Verifique se a máquina está nivelada, o filtro limpo e não há sobrecarga de roupas. Caso contrário, um técnico pode ser necessário.",
    "fogão": "Certifique-se de que os queimadores estão limpos e há fornecimento adequado de gás. Para problemas no forno, verifique o termostato ou resistência.",
    "micro-ondas": "Não tente consertar micro-ondas sozinho. Agende uma visita técnica para uma avaliação segura.",
    "horário": "Estamos à disposição de segunda a sexta, das 8h às 18h, e aos sábados das 8h às 12h.",
    "agendamento": "Para agendar um serviço, ligue para (11) 1234-5678 ou envie um WhatsApp para (11) 98765-4321.",
    "garantia": "Oferecemos uma garantia de 3 meses para todos os nossos serviços de reparo.",
    "preço": "Os preços variam conforme o serviço. Oferecemos orçamento gratuito para a maioria dos reparos."
  };

  const routines = [
    { trigger: 'como posso agendar', response: 'Você pode agendar um serviço ligando para (11) 1234-5678 ou enviando um WhatsApp para (11) 98765-4321.' },
    { trigger: 'qual o horário de atendimento', response: 'Estamos disponíveis de segunda a sexta, das 8h às 18h, e aos sábados das 8h às 12h.' }
  ];

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

    // Check routines first
    const matchedRoutine = routines.find(routine => lowerMessage.includes(routine.trigger.toLowerCase()));
    if (matchedRoutine) return matchedRoutine.response;

    // Check knowledge base
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(key.toLowerCase())) return value;
    }

    // Default response
    return "Desculpe, não tenho uma resposta específica para isso. Como posso ajudar de outra forma?";
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
