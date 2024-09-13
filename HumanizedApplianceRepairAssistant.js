import React, { useState } from 'react';
import './styles.css'; // Importa o CSS

function HumanizedApplianceRepairAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  // Base de conhecimento expandida com perguntas frequentes
  const knowledgeBase = {
    "geladeira": {
      response: "Entendo sua preocupação com a geladeira...",
      followUp: "Há quanto tempo você está notando esse problema com sua geladeira?"
    },
    "máquina de lavar": {
      response: "Problemas com a máquina de lavar podem ser frustrantes...",
      followUp: "Você notou algum barulho estranho ou vazamento ao usar a máquina?"
    },
    // Outras perguntas frequentes...
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    setMessages(prevMessages => [
      ...prevMessages, 
      { text: input, sender: 'user' }
    ]);
    processMessage(input);
    setInput('');
  };

  const processMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    let response = "Peço desculpas, mas não tenho uma resposta específica para essa pergunta...";
    let followUp = "Posso esclarecer mais alguma dúvida sobre nossos serviços?";

    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(key)) {
        response = value.response;
        followUp = value.followUp;
        break;
      }
    }

    if (isFirstMessage) {
      setIsFirstMessage(false);
      setMessages(prevMessages => [
        ...prevMessages, 
        { text: "Olá! Bem-vindo à Assistência Técnica de Eletrodomésticos...", sender: 'ai' }
      ]);
    }

    setMessages(prevMessages => [
      ...prevMessages, 
      { text: response, sender: 'ai' },
      { text: followUp, sender: 'ai' }
    ]);
  };

  return (
    <div className="chat-container">
      <h1 className="chat-header">Assistente de Consertos de Eletrodomésticos</h1>
      
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-text"
          placeholder="Digite sua pergunta..."
          onKeyPress={(e) => e.key === 'Enter' ? handleSendMessage() : null}
        />
        <button 
          onClick={handleSendMessage} 
          className="send-button"
        >
          Enviar
        </button>
      </div>

      <p className="footer-text">
        Estamos aqui para ajudar com qualquer dúvida sobre nossos serviços ou problemas com seus eletrodomésticos.
      </p>
    </div>
  );
}

export default HumanizedApplianceRepairAssistant;
