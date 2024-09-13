
/* Basic styles for the chat container */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 90vh;
  max-width: 500px;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f5f5f5;
}

header {
  text-align: center;
  margin-bottom: 10px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
}

.input-container {
  display: flex;
  margin-bottom: 10px;
}

#input {
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
}

#send-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px;
  cursor: pointer;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.button-container button {
  background-color: #e0e0e0;
  border: none;
  border-radius: 20px;
  padding: 10px;
  cursor: pointer;
}

.button-container button:hover {
  background-color: #ccc;
}

/* Message styles */
.message {
  display: flex;
  margin-bottom: 10px;
}

.message.user .bubble {
  background-color: #007bff;
  color: #fff;
  border-radius: 20px;
  padding: 10px;
  max-width: 60%;
  align-self: flex-end;
}

.message.ai .bubble {
  background-color: #e0e0e0;
  color: #000;
  border-radius: 20px;
  padding: 10px;
  max-width: 60%;
  align-self: flex-start;
}

/* Modal styles */
.modal {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-width: 400px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
