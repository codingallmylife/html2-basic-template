// Если JS загрузился, то добавляем к body класс .js
document.body.classList.add('js');

// --------------------------------- Скрипт для выпадающего меню ---------------------------------
const toggle = document.querySelector('.header__toggle');
const navigation = document.querySelector('.header__navigation');
const navigationLinks = document.querySelectorAll('.header__link');

if (toggle && navigation) {
  // Начальное состояние: меню скрыто
  navigation.classList.add('header__navigation--hidden');
  toggle.classList.add('header__toggle--closed');

  // Общая функция закрытия меню
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.add('header__navigation--hidden');
    toggle.classList.remove('header__toggle--open');
    document.body.classList.remove('page__body--no-scroll');
  };

  // Общая функция открытия меню
  const openMenu = () => {
    toggle.setAttribute('aria-expanded', 'true');
    navigation.classList.remove('header__navigation--hidden');
    toggle.classList.add('header__toggle--open');
    document.body.classList.add('page__body--no-scroll');
  };

  // Клик по бургеру: переключаем состояние
  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Клик по пункту меню: всегда закрываем
  navigationLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

// --------------------------------- Скрипт для промо-слайдера ---------------------------------
const MIN_SWIPE = 50; // Минимальная длина свайпа в пикселях
const slides = document.querySelectorAll('.promo__item');
const bullets = document.querySelectorAll('.promo__bullet');
let startX = 0; // Координата X точки, где палец коснулся экрана в момент начала свайпа

// Функция переключения слайда
const showSlide = (index) => {
  // Убираем активный класс у всех слайдов и буллетов
  slides.forEach((item) => item.classList.remove('promo__item--active'));
  bullets.forEach((bullet) => bullet.classList.remove('promo__bullet--active'));
  // Добавляем активный класс нужному слайду и буллету
  slides[index].classList.add('promo__item--active');
  bullets[index].classList.add('promo__bullet--active');
};

const handleSwipeEnd = (event) => {
  const endX = event.changedTouches[0].clientX;
  const difference = startX - endX;

  if (Math.abs(difference) > MIN_SWIPE) {
    // Находим текущий индекс
    const currentIndex = Array.from(slides).findIndex((slide) =>
      slide.classList.contains('promo__item--active'),
    );
      // Находим новый индекс (после свайпа)
    let newIndex;
    if (difference > 0) {
      // Свайп влево → следующий слайд (с зацикливанием)
      newIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    } else {
      // Свайп вправо → предыдущий слайд (с зацикливанием)
      newIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    }
    showSlide(newIndex);
  }
};

if (slides.length > 0 && bullets.length > 0) {
  // Вешаем клики на каждый буллет
  bullets.forEach((bullet, index) => {
    bullet.addEventListener('click', () => {
      showSlide(index);
    });
  });

  // Свайп для mobile и tablet: запоминаем точку касания, при отпускании сравниваем и переключаем слайд, если сдвиг больше минимального значения
  slides.forEach((item) => {
    item.addEventListener('touchstart', (event) => { // Слушатель начала свайпа
      startX = event.touches[0].clientX;
    });
    item.addEventListener('touchend', handleSwipeEnd); // Слушатель конца свайпа
  });
}
