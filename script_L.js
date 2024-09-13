document.addEventListener('DOMContentLoaded', function() {
    // Menu de hambúrguer para dispositivos móveis
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle nav
        nav.classList.toggle('nav-active');

        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger animation
        burger.classList.toggle('toggle');
    });

    // Formulário de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui você adicionaria a lógica de autenticação
            console.log('Login submitted');
        });
    }

    // Formulário de cadastro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui você adicionaria a lógica de registro
            console.log('Registration submitted');
        });
    }

    // Função para adicionar item ao carrinho (exemplo)
    window.addToCart = function(itemId) {
        // Aqui você adicionaria a lógica para adicionar ao carrinho
        console.log(`Item ${itemId} added to cart`);
    }

    // Função para aplicar cupom de desconto (exemplo)
    window.applyCoupon = function() {
        const couponCode = document.getElementById('coupon-code').value;
        // Aqui você adicionaria a lógica para validar e aplicar o cupom
        console.log(`Coupon ${couponCode} applied`);
    }
});

// Funções adicionais seriam adicionadas aqui para outras funcionalidades
// como sistema de pontos, rastreamento de pedidos, etc.





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

// Adiciona a mensagem ao chat
function addMessage(text, sender) {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${sender}`;
  messageElement.textContent = text;
  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight;
}

// Envia a mensagem do usuário
sendBtn.addEventListener('click', () => {
  const userInput = input.value.trim();
  if (userInput) {
    addMessage(userInput, 'user');
    input.value = '';
    // Aqui você pode adicionar lógica para processar a mensagem e responder
  }
});

// Adiciona o conhecimento ao modal
addKnowledgeBtn.addEventListener('click', () => {
  knowledgeModal.style.display = 'flex';
});

// Fecha o modal de conhecimento
closeKnowledge.addEventListener('click', () => {
  knowledgeModal.style.display = 'none';
});

// Adiciona o conhecimento
submitKnowledge.addEventListener('click', () => {
  // Adicione lógica para adicionar conhecimento à base
  knowledgeModal.style.display = 'none';
});

// Adiciona a rotina ao modal
addRoutineBtn.addEventListener('click', () => {
  routineModal.style.display = 'flex';
});

// Fecha o modal de rotina
closeRoutine.addEventListener('click', () => {
  routineModal.style.display = 'none';
});

// Adiciona a rotina
submitRoutine.addEventListener('click', () => {
  // Adicione lógica para adicionar rotina
  routineModal.style.display = 'none';
});
