const textElement = document.getElementById('typing-text');
const text = "FRONT-END DEVELOPER ";
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




//window.sr = ScrollReveal({reset: true})
//ScrollReveal().reveal('.about-text', {
 // delay: 30,
//  }
//)
//ScrollReveal().reveal('.gallery-title', {
 // delay: 30,
//})

//ScrollReveal().reveal('.projects-title' , {
 // delay: 30, 
//})
//ScrollReveal().reveal('.services-title' , {
 // delay: 30,
//})

//ScrollReveal().reveal('.footer-title' , {
//  delay: 30,
//})

//ScrollReveal().reveal('.header-title', {
  //delay: 30,
 // }
//)
//ScrollReveal().reveal('.about-image', {
  //delay: 30,
 // }
//)
//ScrollReveal().reveal('.gallery-item', {
//  delay: 30,
 // }
//)
//ScrollReveal().reveal('.project-item', {
 // delay: 30,
 // }
//)
//ScrollReveal().reveal('.service-item', {
//  delay: 1,
 // }
//)
//ScrollReveal().reveal('.social-icons', {
//  delay: 30,
  //}
//)


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


