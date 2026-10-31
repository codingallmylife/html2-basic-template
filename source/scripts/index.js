// Если JS загрузился, то добавляем к body класс .js
document.body.classList.add('js');

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
