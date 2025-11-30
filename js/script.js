// --- Parte do Menu (igual) ---
const nav = document.getElementById("nav");
const btnMenu = document.getElementById("hamburguer");

btnMenu.addEventListener("click", () => {
  nav.classList.toggle("active");
  btnMenu.innerHTML = nav.classList.contains("active") ? "&#10005;" : "&#9776;";
});

// --- Parte do Carrossel (igual) ---
const slides = document.querySelectorAll('#carrossel img');
const controles = document.querySelectorAll('.controle');
const carrosselContainer = document.querySelector('#carrossel');
const totalSlides = slides.length;
const tempoIntervalo = 10000;
let slideIndex = 0;
let slideInterval;

function showSlide(index) {
  slideIndex = (index + totalSlides) % totalSlides;

  slides.forEach(slide => slide.classList.remove('ativo'));
  controles.forEach(controle => controle.classList.remove('ativo'));

  slides[slideIndex].classList.add('ativo');
  controles[slideIndex].classList.add('ativo');
}

function nextSlide() {
  showSlide(slideIndex + 1);
}

function prevSlide() {
  showSlide(slideIndex - 1);
}

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, tempoIntervalo);
}

document.querySelector('.prev-btn').addEventListener('click', () => {
  prevSlide();
  resetInterval();
});

document.querySelector('.next-btn').addEventListener('click', () => {
  nextSlide();
  resetInterval();
});

controles.forEach((controle, index) => {
  controle.addEventListener('click', () => {
    showSlide(index);
    resetInterval();
  });
});

let touchStartX = 0;
carrosselContainer.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
  clearInterval(slideInterval);
});

carrosselContainer.addEventListener('touchend', e => {
  const touchEndX = e.changedTouches[0].screenX;
  if (touchStartX - touchEndX > 50) { 
    nextSlide();
  } else if (touchEndX - touchStartX > 50) { 
    prevSlide();
  }
  resetInterval(); 
});

showSlide(0);
resetInterval();

// Pega o formulário
const form = document.getElementById('contact-form');

// A função 'handleSubmit' agora é muito mais simples
function handleSubmit(event) {
  // 1. Previne o comportamento padrão (recarregar a página)
  event.preventDefault(); 

  // 2. Cria a mensagem de status
  const status = document.createElement('p');
  status.textContent = "Obrigado pela sua mensagem!";
  status.style.color = 'lightgreen';

  // 3. Adiciona a mensagem ao formulário
  //    (usamos event.target em vez de 'form' para garantir)
  event.target.append(status); 

  // 4. Limpa o formulário
  event.target.reset();

  // 5. Remove a mensagem de status depois de 5 segundos
  setTimeout(() => status.remove(), 5000); 
}

// 6. Conecta a função 'handleSubmit' ao evento 'submit' do formulário
//    Esta linha é essencial para o código acima funcionar!
form.addEventListener('submit', handleSubmit);