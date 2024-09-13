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

  const showModal = (modal) => modal.style.display = 'flex';
  const hideModal = (modal) => modal.style.display = 'none';

  const sendMessage = () => {
    const messageText = inputField.value.trim();
    if (messageText) {
      addMessage(messageText, 'user');
      // Simulate AI response
      setTimeout(() => addMessage(`Resposta do assistente para: ${messageText}`, 'ai'), 500);
      inputField.value = '';
      inputField.focus();
    }
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
      // Add to knowledge base logic here
      hideModal(knowledgeModal);
    }
  });

  submitRoutineBtn.addEventListener('click', () => {
    const trigger = document.getElementById('routine-trigger').value.trim();
    const response = document.getElementById('routine-response').value.trim();
    if (trigger && response) {
      // Add to routines logic here
      hideModal(routineModal);
    }
  });
});
