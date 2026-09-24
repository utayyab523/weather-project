const menu = document.querySelector('.menu-hidden');
const menuOpen = document.querySelector('.open');
const menuClose = document.querySelector('.close');

menuOpen.addEventListener('click', () => {
    menu.classList.remove('menu-hidden');
    menuOpen.classList.add('hide')
    menuClose.classList.remove('hide');
    menuClose.classList.add('active');
})

menuClose.addEventListener('click', () => {
    menu.classList.add('menu-hidden');
    menuOpen.classList.remove('hide')
    menuClose.classList.add('hide');
})