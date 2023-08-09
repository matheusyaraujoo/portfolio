const textElement = document.getElementById('typing-text');
const text = "FRONTEND DEVELOPER";
let index = 0;

function typeText() {
  if (index <= text.length) {
    textElement.innerHTML = text.substring(0, index) + '<span class="cursor">|</span>';
    index++;
    if (index <= text.length) {
      setTimeout(typeText, 90); // Ajuste a velocidade da digitação aqui (em milissegundos)
    } else {
      setTimeout(blinkCursor, 500); // Tempo após a digitação completa antes de começar a piscar
    }
  }
}

function blinkCursor() {
  const cursorElement = document.querySelector('.cursor');
  cursorElement.style.opacity = cursorElement.style.opacity === '0' ? '1' : '0';
  setTimeout(blinkCursor, 500); // Ajuste o tempo do piscar do cursor aqui (em milissegundos)
}

typeText();



window.sr = ScrollReveal({reset: true})
ScrollReveal().reveal('.about-text', {
  delay: 60,
  }
)
ScrollReveal().reveal('.gallery-title', {
  delay: 60,
})

ScrollReveal().reveal('.projects-title' , {
  delay: 60, 
})
ScrollReveal().reveal('.services-title' , {
  delay: 60,
})

ScrollReveal().reveal('.footer-title' , {
  delay: 60,
})

ScrollReveal().reveal('.header-title', {
  delay: 60,
  }
)
