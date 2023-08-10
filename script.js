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
  delay: 30,
  }
)
ScrollReveal().reveal('.gallery-title', {
  delay: 30,
})

ScrollReveal().reveal('.projects-title' , {
  delay: 30, 
})
ScrollReveal().reveal('.services-title' , {
  delay: 30,
})

ScrollReveal().reveal('.footer-title' , {
  delay: 30,
})

ScrollReveal().reveal('.header-title', {
  delay: 30,
  }
)
ScrollReveal().reveal('.about-image', {
  delay: 30,
  }
)
ScrollReveal().reveal('.gallery-item', {
  delay: 30,
  }
)
ScrollReveal().reveal('.project-item', {
  delay: 30,
  }
)
ScrollReveal().reveal('.service-item', {
  delay: 1,
  }
)
ScrollReveal().reveal('.social-icons', {
  delay: 30,
  }
)

