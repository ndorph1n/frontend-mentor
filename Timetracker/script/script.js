const controls = document.querySelector('.control');
const cards = document.querySelectorAll('.card');
let data;
const periods = {
    'daily': 'Day',
    'weekly' : 'Week',
    'monthly' : 'Month'
};
let menuIsShown = false;
const menu = document.createElement('div');
menu.classList.add('menu','card__menu');
menu.innerHTML = `
    <ul class='menu__list'>
        <li class='menu__item menu__item_remove'>Remove</li>
    </ul>
`;

window.onclick = closeMenu;

fetch('https://api.npoint.io/118aa6ca6757cf9597af')
    .then(response => response.json())
    .then(json => data = json);

controls.addEventListener('click', changePeriod);
cards.forEach( card => card.querySelector('.card__control').addEventListener('click', () => showMenu(card)));

function changePeriod(e) {
    const control = controls.querySelectorAll('.control__item');

    if (!e.target.classList.contains('control__item')) return;

    control.forEach( item => item.classList.contains('control__item_active')&& item.classList.remove('control__item_active'));
    e.target.classList.add('control__item_active');
    
    changeData(e.target.dataset.period);
}

function changeData(timeframe) {
    cards.forEach( (card,i) => {
        const currTime = card.querySelector('.card__time');
        const prevTime = card.querySelector('.card__previousTime');
        const newCurrValue = data[i].timeframes[timeframe].current;
        const newPrevValue = data[i].timeframes[timeframe].previous;
        const prevTimeString = `Last ${periods[timeframe]} - ${newPrevValue == 1 ? newPrevValue+'hr' : newPrevValue+'hrs'}`;

        animate([currTime, prevTime], [newCurrValue == 1 ? newCurrValue+'hr' : newCurrValue+'hrs', prevTimeString]);
    });
}

function animate(elements, values) {
    fadeOut(elements).then( () => {
            elements[0].innerText = values[0];
            elements[1].innerText = values[1];
            fadeIn(elements);
        }
    );

    function fadeOut(elements) {
        return new Promise( resolve => {
            let opacity = 1;
            const fadeOutInt = setInterval(() => {
                elements.map( element => {
                    element.style.opacity = opacity;
                    opacity = opacity - 0.1;
                });
                if (opacity < 0) {
                    clearInterval(fadeOutInt);
                    resolve();
                }
            },50);
        });
    }

    function fadeIn(elements) {
        let opacity = 0;
        const fadeInInt = setInterval(() => {
            elements.map( element => {
                element.style.opacity = opacity;
                opacity = opacity + 0.1;
            });
            if (opacity > 1) {
                clearInterval(fadeInInt);
            }
        },50);
    }
}

function showMenu(card) {
    menuIsShown = true;
    card.querySelector('.card__inner').prepend(menu);
    setTimeout(() => menu.style.opacity = 1,0);
    menu.querySelector('.menu__item_remove').onclick = () => removeCard(card);
}

function closeMenu(e){
    if (menuIsShown && !e.target.classList.contains('card__control')) {
        menu.style.opacity = 0;
        setTimeout(() => menu.remove(), 100);
    }
}
function removeCard(card){
    card.style.transform = 'scale(0)';
    setTimeout(() => card.remove(), 250);
}