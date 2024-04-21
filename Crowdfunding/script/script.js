const page = document.querySelector('.page');
const hero = document.querySelector('.main__hero');
const bookmarkButton = document.querySelector('.product__bookmark');
const backButton = document.querySelector('.product__back');
const selectBackButtons = document.querySelectorAll('.option__submit');
const modal = document.querySelector('.page__modal');
const overlay = document.createElement('div');
overlay.classList.add('overlay');
const success = document.querySelector('.page__success');
const finishButton = document.querySelector('.success__button');
const backCards = document.querySelectorAll('.inner__card');
const closeButton = document.querySelector('.modal__close');
const header = document.querySelector('.header');
const openNav = document.querySelector('.openNav');
const closeNav = document.querySelector('.closeNav');
let activeCard;

window.onscroll = parallax;
bookmarkButton.onclick = bookmarkProduct;
backButton.addEventListener('click', () => showModal(backButton));
selectBackButtons.forEach( button => button.addEventListener('click', () => showModal(button)));
overlay.onclick = closeModal;
backCards.forEach( card => {
    !card.classList.contains('inner__card_disabled')&&card.addEventListener('click', pledge);
});
closeButton.onclick = closeModal;
openNav.onclick = openMenu;
closeNav.onclick = closeMenu;
if (window.innerWidth < 576) {
    bookmarkButton.innerText='';
}

window.addEventListener('resize', () => window.innerWidth > 768 && closeNav.classList.contains('nav__button_active') && closeMenu());

function parallax() {
    hero.style.backgroundPositionY = scrollY*0.6 +'px';
}

function bookmarkProduct() {
    bookmarkButton.classList.toggle('active');
    if (window.innerWidth > 576) {
        bookmarkButton.classList.contains('active') ? bookmarkButton.innerText='Bookmarked' : bookmarkButton.innerText = 'Bookmark';
    } else {
        bookmarkButton.innerText='';
    }
}

window.onresize = () => {
    if (window.innerWidth > 576) {
        bookmarkButton.classList.contains('active') ? bookmarkButton.innerText='Bookmarked' : bookmarkButton.innerText = 'Bookmark';
    } else {
        bookmarkButton.innerText='';
    }
}

function showModal(button) {    
    modal.classList.add('active');
    page.prepend(overlay);
    header.style.display = 'none';

    if (button !== backButton) {
        activeCard = modal.querySelector(`.inner__radio[value='${button.dataset.option}']`).parentElement;
        enableInputs(activeCard);
        setTimeout(() => {
            activeCard.scrollIntoView({behavior : "smooth", block: 'center', inline: 'center'});
            activeCard.querySelector('.inner__radio').checked = true;
        },300);
    }
}

function pledge(e) {
    if (e.currentTarget == activeCard) {
        return;
    };
    activeCard = e.currentTarget;
    enableInputs(activeCard);
}

function enableInputs(card) {
    const activatedInput = document.querySelector('.pledge__amount:not([disabled])');
    const activatedButton = document.querySelector('.pledge__submit:not([disabled])');
    const activeInput = card.querySelector('.pledge__amount');
    const activeButton = card.querySelector('.pledge__submit');
    if (activatedInput&&activatedButton) {
        activatedInput.disabled = true;
        activatedButton.disabled = true;
    } 
    activeInput.disabled = false;
    activeButton.disabled = false;

    activeCard.querySelector('.pledge__submit').onclick = () => validateInput(activeInput);
}

function validateInput(input) {
    if (!(input.value >= input.dataset.value)) {
        activeCard.querySelector('.pledge__input').classList.add('pledge__input_error');
        activeCard.querySelector('.pledge__amount').classList.add('pledge__amount_error');
        return;
    } else {
        activeCard.querySelector('.pledge__input').classList.remove('pledge__input_error');
        activeCard.querySelector('.pledge__amount').classList.remove('pledge__amount_error');
        showSuccess();
    }
}

function showSuccess() {
    modal.classList.remove('active');
    setTimeout(()=>{
        success.classList.add('active');
        finishButton.onclick = closeModal;
        },400);
}

function closeModal() {
    if (!modal.classList.contains('active')&&closeNav.classList.contains("nav__button_active")) {
        closeMenu();
        return;
    }
    modal.classList.remove('active');
    overlay.remove();
    success.classList.remove('active');
    header.style.display = 'flex';
    activeCard.querySelector('.inner__radio').checked = false;
    
}

function openMenu(){
    openNav.classList.toggle('nav__button_active');
    closeNav.classList.toggle('nav__button_active');
    page.prepend(overlay);
    document.querySelector('.nav__inner').classList.add('nav__inner_active');
}

function closeMenu() {
    openNav.classList.toggle('nav__button_active');
    closeNav.classList.toggle('nav__button_active');
    overlay.remove();
    document.querySelector('.nav__inner').classList.remove('nav__inner_active');
}
