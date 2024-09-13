document.addEventListener('DOMContentLoaded', () => {
  const messages = document.getElementById('messages');
  const input = document.getElementById('input');
  const sendBtn = document.getElementById('send-btn');
  const addKnowledgeBtn = document.getElementById('add-knowledge-btn');
  const addRoutineBtn = document.getElementById('add-routine-btn');
  const knowledgeModal = document.getElementById('add-knowledge-modal');
  const routineModal = document.getElementById('add-routine-modal');
  const closeKnowledge = document.getElementById('close-knowledge');
  const closeRoutine = document.getElementById('close-routine');
  const submitKnowledge = document.getElementById('submit-knowledge');
  const submitRoutine = document.getElementById('submit-routine');
  const knowledgeKey = document.getElementById('knowledge-key');
  const knowledgeValue = document.getElementById('knowledge-value');
  const routineTrigger = document.getElementById('routine-trigger');
  const routineResponse = document.getElementById('routine-response');

  function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = text;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
  }

  sendBtn.addEventListener('click', () => {
    const userInput = input.value.trim();
    if (userInput) {
      addMessage(userInput, 'user');
      input.value = '';

      // Simular resposta AI
      setTimeout(() => {
        addMessage('Resposta do assistente para: ' + userInput, 'ai');
      }, 500);
    }
  });

  addKnowledgeBtn.addEventListener('click', () => {
    knowledgeModal.style.display = 'flex';
  });

  closeKnowledge.addEventListener('click', () => {
    knowledgeModal.style.display = 'none';
  });

  submitKnowledge.addEventListener('click', () => {
    const key = knowledgeKey.value.trim();
    const value = knowledgeValue.value.trim();
    if (key && value) {
      // Adicionar lógica para adicionar conhecimento à base
      console.log(`Adicionado ao conhecimento: ${key} - ${value}`);
      knowledgeKey.value = '';
      knowledgeValue.value = '';
      knowledgeModal.style.display = 'none';
    }
  });

  addRoutineBtn.addEventListener('click', () => {
    routineModal.style.display = 'flex';
  });

  closeRoutine.addEventListener('click', () => {
    routineModal.style.display = 'none';
  });

  submitRoutine.addEventListener('click', () => {
    const trigger = routineTrigger.value.trim();
    const response = routineResponse.value.trim();
    if (trigger && response) {
      // Adicionar lógica para adicionar rotina
      console.log(`Adicionada rotina: ${trigger} - ${response}`);
      routineTrigger.value = '';
      routineResponse.value = '';
      routineModal.style.display = 'none';
    }
  });
});
