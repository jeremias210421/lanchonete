import React, { useState, useEffect } from 'react';
import { Send, Plus } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [knowledgeBase, setKnowledgeBase] = useState({});
  const [routines, setRoutines] = useState([]);
  const [newInfo, setNewInfo] = useState({ key: '', value: '' });
  const [newRoutine, setNewRoutine] = useState({ trigger: '', response: '' });

  useEffect(() => {
    // Carregar conhecimento base e rotinas do localStorage
    const savedKnowledgeBase = JSON.parse(localStorage.getItem('knowledgeBase')) || {};
    const savedRoutines = JSON.parse(localStorage.getItem('routines')) || [];
    setKnowledgeBase(savedKnowledgeBase);
    setRoutines(savedRoutines);
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem('knowledgeBase', JSON.stringify(knowledgeBase));
    localStorage.setItem('routines', JSON.stringify(routines));
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, sender: 'user' }]);
    processMessage(input);
    setInput('');
  };

  const processMessage = (message) => {
    // Verificar rotinas
    const matchedRoutine = routines.find(routine => message.toLowerCase().includes(routine.trigger.toLowerCase()));
    if (matchedRoutine) {
      setMessages(prevMessages => [...prevMessages, { text: matchedRoutine.response, sender: 'ai' }]);
      return;
    }

    // Verificar conhecimento base
    const lowerMessage = message.toLowerCase();
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(key.toLowerCase())) {
        setMessages(prevMessages => [...prevMessages, { text: value, sender: 'ai' }]);
        return;
      }
    }

    // Resposta padrão
    setMessages(prevMessages => [...prevMessages, 
      { text: "Desculpe, não tenho uma resposta específica para isso. Como posso ajudar de outra forma?", sender: 'ai' }
    ]);
  };

  const addKnowledgeBase = () => {
    if (newInfo.key && newInfo.value) {
      setKnowledgeBase({ ...knowledgeBase, [newInfo.key]: newInfo.value });
      setNewInfo({ key: '', value: '' });
      saveToLocalStorage();
    }
  };

  const addRoutine = () => {
    if (newRoutine.trigger && newRoutine.response) {
      setRoutines([...routines, newRoutine]);
      setNewRoutine({ trigger: '', response: '' });
      saveToLocalStorage();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Assistente AI Avançado</h1>
      
      <div className="flex-grow overflow-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <Alert key={index} className={message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        ))}
      </div>
      
      <div className="flex mb-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-grow"
        />
        <Button onClick={handleSendMessage} className="ml-2">
          <Send size={20} />
        </Button>
      </div>

      <div className="flex space-x-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Adicionar Conhecimento</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar ao Conhecimento Base</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Palavra-chave"
              value={newInfo.key}
              onChange={(e) => setNewInfo({ ...newInfo, key: e.target.value })}
            />
            <Input
              placeholder="Informação"
              value={newInfo.value}
              onChange={(e) => setNewInfo({ ...newInfo, value: e.target.value })}
            />
            <Button onClick={addKnowledgeBase}>Adicionar</Button>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Adicionar Rotina</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Nova Rotina</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Gatilho"
              value={newRoutine.trigger}
              onChange={(e) => setNewRoutine({ ...newRoutine, trigger: e.target.value })}
            />
            <Input
              placeholder="Resposta"
              value={newRoutine.response}
              onChange={(e) => setNewRoutine({ ...newRoutine, response: e.target.value })}
            />
            <Button onClick={addRoutine}>Adicionar</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AIAssistant;
