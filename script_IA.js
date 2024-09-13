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
    "geladeira": "Parece que você está enfrentando problemas com a geladeira. Verifique a temperatura, a vedação das portas e faça uma limpeza geral. Se isso não resolver, talvez seja hora de agendar uma visita técnica. Posso te ajudar com isso?",
    "máquina de lavar": "Problemas com a máquina de lavar podem ser bem inconvenientes. Confira se ela está nivelada, se o filtro está limpo e se não há sobrecarga de roupas. Se o problema continuar, um técnico pode ser necessário para uma análise mais detalhada.",
    "fogão": "Sobre o fogão, verifique se os queimadores estão limpos e se há um bom fornecimento de gás. Se o problema estiver no forno, pode ser necessário checar o termostato ou a resistência.",
    "micro-ondas": "Por questões de segurança, recomendamos não tentar consertar o micro-ondas sozinho. O melhor é agendar uma visita técnica para garantir uma avaliação segura e profissional.",
    "horário": "Estamos disponíveis para te ajudar de segunda a sexta, das 8h às 18h, e aos sábados das 8h às 12h. Se precisar, posso te fornecer mais informações sobre nossos horários.",
    "agendamento": "Para agendar um serviço, você pode ligar para (11) 1234-5678 ou enviar um WhatsApp para (11) 98765-4321. Como posso te ajudar a marcar um horário que seja conveniente para você?",
    "garantia": "Oferecemos uma garantia de 3 meses para todos os nossos serviços de reparo. Isso mostra nossa confiança na qualidade do nosso trabalho e te dá a tranquilidade necessária.",
    "preço": "Os preços variam dependendo do serviço necessário. Oferecemos orçamento gratuito para a maioria dos reparos. Posso te ajudar com um orçamento para algum serviço específico?"
  };

  const routines = [
    { trigger: 'como posso agendar', response: 'Para agendar um serviço, ligue para (11) 1234-5678 ou envie um WhatsApp para (11) 98765-4321. Estou aqui para ajudar com o agendamento!' },
    { trigger: 'qual o horário de atendimento', response: 'Nosso horário de atendimento é de segunda a sexta, das 8h às 18h, e aos sábados das 8h às 12h. Se precisar de mais detalhes, é só me avisar!' }
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
