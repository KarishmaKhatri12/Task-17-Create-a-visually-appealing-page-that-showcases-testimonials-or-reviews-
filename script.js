const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots-container');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const closeModal = document.querySelector('.close');

let currentSlide = 0;
const visibleCards = 2;
const totalSlides = cards.length - visibleCards;

function updateSlidePosition() {
  const cardWidth = cards[0].offsetWidth + 20;
  track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
}

function updateNavButtons() {
  prevBtn.disabled = currentSlide === 0;
  nextBtn.disabled = currentSlide >= totalSlides;
}

function createDots() {
  dotsContainer.innerHTML = '';
  for (let i = 0; i <= totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === currentSlide) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentSlide = i;
      slideChanged();
    });
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
  const allDots = document.querySelectorAll('.dot');
  if (allDots[currentSlide]) allDots[currentSlide].classList.add('active');
}

function slideChanged() {
  updateSlidePosition();
  updateNavButtons();
  updateDots();
}

prevBtn.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide--;
    slideChanged();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentSlide < totalSlides) {
    currentSlide++;
    slideChanged();
  }
});

cards.forEach(card => {
  const readMore = card.querySelector('.read-more');
  readMore.addEventListener('click', e => {
    e.preventDefault();
    modalText.textContent = card.getAttribute('data-full');
    modal.classList.add('show');
  });

  const starsContainer = card.querySelector('.stars');
  const rating = +starsContainer.getAttribute('data-rating');
  for (let i = 0; i < rating; i++) {
    starsContainer.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2l2.92 6.26L22 9.27l-5 4.87L18.18 22 12 18.54 5.82 22 7 14.14 2 9.27l7.08-1.01z"/></svg>';
  }
});

closeModal.addEventListener('click', () => modal.classList.remove('show'));
window.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('show');
});

createDots();
updateSlidePosition();
updateNavButtons();

// Auto slide
let autoSlide = setInterval(() => {
  currentSlide = (currentSlide < totalSlides) ? currentSlide + 1 : 0;
  slideChanged();
}, 5000);

const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
carousel.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    currentSlide = (currentSlide < totalSlides) ? currentSlide + 1 : 0;
    slideChanged();
  }, 5000);
});
