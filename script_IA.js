/* Estilo geral do contêiner */
.chat-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial, sans-serif';
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Cabeçalho */
.chat-header {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

/* Janela de mensagens */
.messages-container {
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
}

/* Mensagens */
.message {
  margin-bottom: 10px;
  max-width: 80%;
  word-wrap: break-word;
  display: inline-block;
  padding: 8px 12px;
  border-radius: 20px;
}

.message.user {
  background-color: #007bff;
  color: white;
  text-align: right;
  float: right;
}

.message.ai {
  background-color: #28a745;
  color: white;
  text-align: left;
  float: left;
}

/* Campo de entrada e botão */
.input-container {
  display: flex;
  margin-bottom: 20px;
}

.input-text {
  flex-grow: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.send-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-button:hover {
  background-color: #0056b3;
}

/* Rodapé */
.footer-text {
  text-align: center;
  font-size: 0.9em;
  color: #666;
}

/* Responsividade */
@media (max-width: 600px) {
  .chat-container {
    width: 90%;
    padding: 10px;
  }

  .messages-container {
    height: 300px;
  }
}
