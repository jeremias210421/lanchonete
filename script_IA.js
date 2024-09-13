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

  let stage = 'greeting'; // Track the current stage of the conversation

  const knowledgeBase = {
    "geladeira": "Entendo sua preocupação com a geladeira. Para problemas comuns, recomendo verificar a temperatura, a vedação das portas e fazer uma limpeza geral. Se o problema persistir, seria melhor agendar uma visita técnica. Posso ajudar você a marcar um horário?",
    "máquina de lavar": "Problemas com a máquina de lavar podem ser frustrantes. Vamos tentar algumas soluções simples: verifique se ela está nivelada, se o filtro está limpo e se não há sobrecarga de roupas. Se essas verificações não resolverem, um técnico pode fazer uma avaliação mais detalhada.",
    "fogão": "Quanto ao seu fogão, é importante verificar se os queimadores estão limpos e se há fornecimento adequado de gás. Para problemas no forno, pode ser necessário verificar o termostato ou a resistência. A segurança é crucial quando se trata de aparelhos a gás.",
    "micro-ondas": "Sua segurança é nossa prioridade. Não recomendamos tentar consertar micro-ondas sozinho devido aos riscos envolvidos. O melhor seria agendar uma visita técnica para uma avaliação segura e profissional.",
    "horário": "Fico feliz em informar nosso horário de atendimento. Estamos à disposição de segunda a sexta, das 8h às 18h, e aos sábados das 8h às 12h. Fazemos o possível para nos adequar à agenda dos nossos clientes.",
    "agendamento": "Claro, posso ajudar você a agendar um serviço. Para marcar uma visita, você pode ligar para (11) 1234-5678 ou enviar um WhatsApp para (11) 98765-4321. Nossa equipe está pronta para atendê-lo e encontrar o melhor horário para você.",
    "garantia": "Oferecemos uma garantia de 3 meses para todos os nossos serviços de reparo. Isso demonstra nossa confiança na qualidade do nosso trabalho e proporciona tranquilidade aos nossos clientes.",
    "preço": "Quanto aos preços, eles variam conforme o serviço necessário. Para sua conveniência, oferecemos orçamento gratuito para a maioria dos reparos. Assim, você pode tomar uma decisão informada sem compromisso.",
    "suporte técnico": "Estamos aqui para ajudar com qualquer problema técnico que você possa estar enfrentando. Se você puder descrever o problema com mais detalhes, posso fornecer algumas orientações ou agendar um atendimento.",
    "limpeza de eletrodomésticos": "Para manter seus eletrodomésticos em bom estado, recomendamos uma limpeza regular. Para instruções específicas sobre como limpar cada tipo de aparelho, por favor, me avise qual você precisa de ajuda.",
    "problemas de energia": "Se o seu aparelho não está ligando, verifique a conexão com a tomada e o estado do cabo de energia. Se tudo estiver correto e o problema persistir, pode ser necessário verificar o aparelho com um técnico.",
    "ruído incomum": "Se o seu aparelho está fazendo um ruído incomum, pode ser um sinal de problema. Tente identificar o tipo de ruído e quando ele ocorre, e entre em contato para uma avaliação técnica mais detalhada.",
    "funcionamento intermitente": "Se o seu aparelho está funcionando de forma intermitente, pode haver um problema com o sistema interno ou com a conexão elétrica. Recomendamos uma inspeção detalhada para identificar a causa.",
    "tempo de conserto": "O tempo de conserto pode variar dependendo do tipo de problema e da disponibilidade de peças. Geralmente, tentamos resolver os problemas o mais rápido possível e informaremos o prazo estimado durante o atendimento.",
    "serviço de emergência": "Para serviços de emergência, você pode entrar em contato diretamente com nosso número de atendimento para priorização. Tentaremos oferecer o suporte necessário o mais rápido possível.",
    "troca de peças": "Se for necessário trocar peças em seu aparelho, informaremos você sobre as opções e os custos envolvidos. Sempre procuramos usar peças de qualidade para garantir o melhor desempenho do seu equipamento.",
    "resolução de problemas": "Se você está enfrentando um problema que não consegue resolver, descreva o problema com o máximo de detalhes possível. Com essas informações, podemos fornecer instruções ou agendar um serviço para resolver a questão.",
    "dúvidas sobre garantias": "Para dúvidas sobre garantias, verifique o manual do seu aparelho ou entre em contato conosco diretamente. Podemos fornecer informações detalhadas sobre a cobertura e os procedimentos para reivindicar a garantia.",
    "problemas com instalação": "Se você está enfrentando problemas com a instalação de um novo aparelho, pode ser útil revisar o manual de instalação ou entrar em contato conosco para assistência adicional.",
    "atendimento ao cliente": "Nosso objetivo é oferecer um excelente atendimento ao cliente. Se você tiver algum feedback ou precisar de mais informações sobre nossos serviços, por favor, nos avise.",
    "pagamento": "Aceitamos diversas formas de pagamento para maior conveniência. Entre em contato para obter detalhes sobre opções de pagamento disponíveis e políticas relacionadas.",
    "cancelamento de serviço": "Se precisar cancelar um serviço agendado, por favor, entre em contato conosco o mais rápido possível. Tentaremos acomodar a sua solicitação e reagendar se necessário.",
    "questões de segurança": "A segurança é nossa prioridade. Se você tiver preocupações sobre a segurança do seu aparelho ou do ambiente de trabalho, entre em contato para obter orientação e garantir que tudo esteja em conformidade.",
    "ajuda com configuração": "Se você precisa de ajuda para configurar um novo aparelho, descreva os problemas que está enfrentando e forneceremos orientações para concluir a configuração corretamente.",
    "manutenção preventiva": "Manutenção preventiva é importante para prolongar a vida útil dos seus aparelhos. Oferecemos serviços de manutenção programada para garantir que tudo esteja funcionando corretamente.",
    "horário de funcionamento": "Nosso horário de funcionamento é de segunda a sexta-feira, das 8h às 18h, e aos sábados das 8h às 12h. Estamos sempre disponíveis para ajudar dentro desses horários.",
    "contato de emergência": "Para contatos de emergência fora do horário comercial, você pode deixar uma mensagem e entraremos em contato assim que possível. Para questões urgentes, recomendamos usar o telefone de emergência.",
    "valores de serviços": "Os valores dos serviços variam dependendo do tipo de reparo ou manutenção necessária. Oferecemos orçamento gratuito para a maioria dos serviços, para que você possa saber o custo antes de decidir.",
    "feedback de clientes": "Estamos sempre em busca de feedback para melhorar nossos serviços. Se você tiver alguma sugestão ou comentário, não hesite em nos informar. Agradecemos sua contribuição.",
    "novos serviços": "Estamos constantemente atualizando nossos serviços para atender melhor nossos clientes. Se você tiver interesse em novos serviços ou tiver uma necessidade específica, entre em contato conosco para mais informações.",
    "serviço de garantia estendida": "Oferecemos opções de garantia estendida para alguns dos nossos serviços. Verifique com nossa equipe para saber mais sobre as opções disponíveis e como você pode se beneficiar delas.",
    "soluções rápidas": "Para problemas que podem ser resolvidos rapidamente, nossa equipe pode fornecer soluções imediatas ou orientações por telefone. Entre em contato para uma assistência rápida e eficaz.",
    "reparos fora da garantia": "Se o seu aparelho está fora da garantia, ainda podemos ajudar com reparos. Oferecemos serviços pagos e podemos fornecer um orçamento antes de iniciar qualquer trabalho.",
    "ajuda com peças": "Se você precisa de peças de reposição, podemos ajudar a encontrar as peças corretas e oferecer assistência na instalação. Entre em contato conosco para mais detalhes sobre peças específicas.",
    "dúvidas sobre nossa empresa": "Se você tiver dúvidas sobre nossa empresa, nossa equipe está disponível para fornecer informações sobre nossa experiência, qualificações e serviços oferecidos.",
    "endereços de filiais": "Podemos fornecer informações sobre os endereços das nossas filiais ou pontos de atendimento. Entre em contato para obter o endereço mais próximo de você.",
    "atendimento personalizado": "Nos esforçamos para oferecer um atendimento personalizado para atender às suas necessidades específicas. Se você precisar de um atendimento especial ou tiver requisitos específicos, por favor, nos informe.",
    "novidades e promoções": "Fique atento às novidades e promoções que oferecemos periodicamente. Inscreva-se em nossa lista de e-mails ou siga nossas redes sociais para não perder as ofertas e atualizações.",
    "reclamações": "Se você tiver uma reclamação sobre nossos serviços, entre em contato conosco diretamente. Estamos comprometidos em resolver qualquer problema e melhorar continuamente.",
    "horários de atendimento especiais": "Para horários de atendimento especiais, como feriados, entre em contato conosco para verificar a disponibilidade e agendar o melhor horário para você.",
    "suporte técnico remoto": "Oferecemos suporte técnico remoto para alguns problemas. Se você precisar de assistência à distância, informe-nos e nossa equipe pode ajudar a solucionar o problema via telefone ou videoconferência.",
    "ajuda com produtos novos": "Para ajudar com novos produtos, descreva o que você precisa e nossa equipe fornecerá suporte na instalação, configuração e uso do produto.",
    "opções de atendimento": "Oferecemos diversas opções de atendimento, incluindo suporte por telefone, e-mail e visitas técnicas. Escolha a opção que melhor atende suas necessidades e entre em contato para agendar.",
    "recomendações de manutenção": "Podemos fornecer recomendações de manutenção para garantir que seus aparelhos continuem funcionando bem. Informe-nos sobre seus aparelhos e receberá dicas personalizadas.",
    "técnicos especializados": "Nossos técnicos são especializados em uma ampla gama de eletrodomésticos e estão prontos para oferecer o melhor serviço. Se você precisar de um técnico específico, avise-nos e faremos o possível para atender sua solicitação.",
    "ajuda com instalação de novos aparelhos": "Se você está instalando um novo aparelho e precisa de ajuda, forneça detalhes sobre o tipo de aparelho e o problema, e nossa equipe dará orientações ou agendará uma visita.",
    "informações de contato": "Para informações de contato adicionais, como números de telefone e e-mails, consulte nossa página de contato no site ou entre em contato diretamente conosco.",
    "política de privacidade": "Nossa política de privacidade garante a proteção das suas informações pessoais. Consulte nossa política de privacidade para mais detalhes sobre como coletamos e usamos suas informações.",
    "procedimentos de segurança": "Para garantir a segurança dos nossos serviços, seguimos procedimentos rigorosos. Se você tiver dúvidas sobre os procedimentos de segurança, entre em contato e forneceremos as informações necessárias.",
    "suporte após a instalação": "Após a instalação de um aparelho, oferecemos suporte contínuo para garantir que tudo funcione corretamente. Entre em contato para obter ajuda com qualquer problema que possa surgir.",
    "direitos do consumidor": "Conheça seus direitos como consumidor e saiba mais sobre como nossa empresa se compromete a oferecer um serviço justo e transparente. Se você tiver dúvidas, estamos aqui para ajudar.",
    "serviços de manutenção periódica": "Oferecemos serviços de manutenção periódica para garantir que seus aparelhos continuem funcionando bem ao longo do tempo. Entre em contato para agendar a manutenção.",
    "assistência técnica para equipamentos": "Para assistência técnica em equipamentos específicos, forneça detalhes sobre o aparelho e o problema, e nossa equipe fornecerá suporte especializado ou agendará uma visita.",
    "diretrizes de uso": "Para garantir o uso seguro e eficiente dos seus aparelhos, siga as diretrizes fornecidas no manual do usuário. Se você precisar de esclarecimentos, entre em contato conosco.",
    "suporte adicional": "Se você precisar de suporte adicional que não esteja coberto aqui, entre em contato e nossa equipe fará o possível para ajudar com qualquer questão que você tenha.",
    "ajuda com configuração inicial": "Para ajuda com a configuração inicial de novos aparelhos, forneça detalhes sobre o tipo de aparelho e o problema, e nossa equipe fornecerá orientações ou agendará uma visita.",
    "consultoria técnica": "Se você precisar de consultoria técnica para escolher ou usar seus aparelhos, entre em contato e nossos especialistas estarão disponíveis para fornecer recomendações e suporte.",
    "ofertas e descontos": "Fique atento às ofertas e descontos especiais que oferecemos. Entre em contato ou visite nosso site para obter informações sobre as promoções atuais.",
    "informações sobre novos produtos": "Para informações sobre novos produtos, entre em contato conosco ou visite nosso site. Nossa equipe pode fornecer detalhes sobre os produtos mais recentes e suas características.",
    "suporte técnico para software": "Se você precisa de suporte técnico para software relacionado aos seus aparelhos, informe-nos sobre o problema e nossa equipe ajudará a resolver a questão.",
    "detalhes sobre serviços oferecidos": "Para detalhes sobre os serviços que oferecemos, consulte nossa lista de serviços no site ou entre em contato diretamente conosco para obter informações específicas.",
    "ajuda com problemas técnicos": "Se você está enfrentando problemas técnicos, descreva o problema com detalhes e nossa equipe fornecerá assistência ou agendará uma visita técnica, se necessário.",
    "serviços de emergência fora do horário": "Para serviços de emergência fora do horário comercial, entre em contato conosco através do número de emergência disponível e nossa equipe tentará oferecer suporte imediato.",
    "detalhes sobre a empresa": "Para obter detalhes sobre nossa empresa, incluindo história, missão e valores, consulte nossa página 'Sobre Nós' no site ou entre em contato conosco para mais informações."
  };

  function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = text;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
  }

  function getResponse(message) {
    const lowerMessage = message.toLowerCase();
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(key)) {
        return value;
      }
    }
    return "Desculpe, não tenho uma resposta específica para isso. Como posso ajudar de outra forma?";
  }

  function handleGreeting() {
    addMessage("Olá! Bem-vindo à Assistência Técnica de Eletrodomésticos. Como posso ajudar você hoje?", 'ai');
    stage = 'identifying_problem';
  }

  function handleIdentifyingProblem(message) {
    const response = getResponse(message);
    addMessage(response, 'ai');
    addMessage("Há algo mais específico que você gostaria de perguntar ou informar sobre o problema?", 'ai');
    stage = 'providing_information';
  }

  function handleProvidingInformation(message) {
    if (message.toLowerCase().includes('agendar') || message.toLowerCase().includes('horário') || message.toLowerCase().includes('preço') || message.toLowerCase().includes('garantia')) {
      const response = getResponse(message);
      addMessage(response, 'ai');
    } else {
      addMessage("Parece que você tem uma dúvida mais específica. Por favor, me diga como posso ajudar ou forneça mais detalhes sobre o seu problema.", 'ai');
    }
    stage = 'finalizing';
  }

  function handleFinalizing(message) {
    addMessage("Agradecemos por entrar em contato conosco. Se precisar de mais ajuda, estamos à disposição. Tenha um ótimo dia!", 'ai');
    stage = 'greeting'; // Reset to initial stage
  }

  sendBtn.addEventListener('click', () => {
    const userInput = input.value.trim();
    if (userInput) {
      addMessage(userInput, 'user');
      input.value = '';

      // Simular resposta AI
      setTimeout(() => {
        if (stage === 'greeting') {
          handleGreeting();
        } else if (stage === 'identifying_problem') {
          handleIdentifyingProblem(userInput);
        } else if (stage === 'providing_information') {
          handleProvidingInformation(userInput);
        } else if (stage === 'finalizing') {
          handleFinalizing(userInput);
        }
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
      knowledgeBase[key.toLowerCase()] = value;
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
      console.log(`Adicionada rotina: ${trigger} - ${response}`);
      routineTrigger.value = '';
      routineResponse.value = '';
      routineModal.style.display = 'none';
    }
  });
});
