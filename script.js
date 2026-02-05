const textElement = document.getElementById('typing-text');
const text = "FULL STACK DEVELOPER ";
let index = 0;

function typeText() {
  if (index <= text.length) {
    textElement.innerHTML = text.substring(0, index) + '<span class="cursor-text">|</span>';
    index++;
    if (index <= text.length) {
      setTimeout(typeText, 90); 
    } else {
      setTimeout(blinkTextCursor, 500); 
    }
  }
}

function blinkTextCursor() {
  const cursorTextElement = document.querySelector('.cursor-text');
  cursorTextElement.style.opacity = cursorTextElement.style.opacity === '0' ? '1' : '0';
  setTimeout(blinkTextCursor, 500); 
}

typeText();

const titleElement = document.getElementById('typing-title');
const titleText = "Olá! Eu sou o Matheus Araujo 👋🏼";
let titleIndex = 0;

function typeTitle() {
  if (titleIndex <= titleText.length) {
    titleElement.innerHTML = titleText.substring(0, titleIndex) + '<span class="cursor-title">|</span>';
    titleIndex++;
    if (titleIndex <= titleText.length) {
      setTimeout(typeTitle, 48); 
    } else {
      setTimeout(blinkTitleCursor, 624); 
    }
  }
}

function blinkTitleCursor() {
  const cursorTitleElement = document.querySelector('.cursor-title');
  cursorTitleElement.style.opacity = cursorTitleElement.style.opacity === '0' ? '1' : '0';
  setTimeout(blinkTitleCursor, 500);
}

typeTitle();



const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault(); 

    const targetId = link.getAttribute('href'); 
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: 'smooth'
    });
  });
});


function zoomIn(element) {
  element.style.fontSize = "26px"; 
}

function zoomOut(element) {
  element.style.fontSize = "23px"; 
}

// --- LÓGICA DO CHATBOT (INTEGRAÇÃO PYTHON) ---

const API_URL = 'https://portfolio-eiau.onrender.com/chat_web';

function toggleChat() {
    const container = document.getElementById('chatbot-container');
    container.classList.toggle('chatbot-open');
    
    if (container.classList.contains('chatbot-open')) {
        setTimeout(() => document.getElementById('user-input').focus(), 300);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    
    if (message === "") return;

    appendMessage(message, 'user-message');
    input.value = '';

    const loadingId = 'loading-' + Date.now();
    appendMessage("Digitando...", 'bot-message', loadingId);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });

        removeMessage(loadingId);

        if (!response.ok) {
            throw new Error('Erro na resposta da rede');
        }

        const data = await response.json();

        appendMessage(data.response, 'bot-message');

    } catch (error) {
        console.error('Erro:', error);
        removeMessage(loadingId);
        
        if (message.toLowerCase().includes('olá') || message.toLowerCase().includes('oi')) {
             appendMessage("O servidor parece estar offline. Me chama novamente mais tarde!", 'bot-message');
        } else {
             appendMessage("O servidor parece estar offline. Me chama novamente mais tarde!", 'bot-message');
        }
    }
}

function appendMessage(text, className, id = null) {
    const chatBox = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    
    messageDiv.classList.add('message', className);
    if (id) messageDiv.id = id;
    
    messageDiv.innerHTML = text.replace(/\n/g, '<br>'); 
    
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeMessage(id) {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}