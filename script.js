'use strict';

/*//////////////////////////////*/
/*      COMPONENT MANAGER       */
/*//////////////////////////////*/
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentslide = 0;
  const maxSlide = slides.length;

  //Fonctions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentslide === maxSlide - 1) {
      currentslide = 0;
    } else {
      currentslide++;
    }

    goToSlide(currentslide);
    activateDot(currentslide);
  };

  const prevSlide = function () {
    if (currentslide === 0) {
      currentslide = maxSlide - 1;
    } else {
      currentslide--;
    }

    goToSlide(currentslide);
    activateDot(currentslide);
  };

  //Appel des fonctions
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();

  //Gestion des événements
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;

      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();

/*//////////////////////////////*/
/*          DARK MODE           */
/*//////////////////////////////*/
document
  .querySelector('[data-switch-dark]')
  .addEventListener('click', function () {
    if (document.documentElement.hasAttribute('dark')) {
      document.documentElement.removeAttribute('dark');
      document.getElementById('btn-icon').src = 'src/img/moon.png';
    } else {
      document.documentElement.setAttribute('dark', 'true');
      document.getElementById('btn-icon').src = 'src/img/sun.png';
    }
  });
