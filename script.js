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
  element.style.fontSize = "26px"; /* tamanho aumentado */
}

function zoomOut(element) {
  element.style.fontSize = "23px"; /* tamanho inicial */
}


  // Captura o elemento .project-item1
  const projectItem1 = document.querySelector('.project-item1');

  // Captura o elemento .footer-projetos
  const footerProjetos = projectItem1.querySelector('.footer-projetos');

  // Adiciona um ouvinte de evento para o mouse entrar (passar por cima)
  projectItem1.addEventListener('mouseenter', () => {
    footerProjetos.style.display = 'block'; // Exibe o .footer-projetos
  });

  // Adiciona um ouvinte de evento para o mouse sair (sair de cima)
  projectItem1.addEventListener('mouseleave', () => {
    footerProjetos.style.display = 'none'; // Oculta o .footer-projetos
  });