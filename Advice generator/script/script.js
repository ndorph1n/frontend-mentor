const button = document.querySelector('.generator__button');
const dice = document.querySelector('.button__svg')
const adviceBlock = document.querySelector('.generator__advice');
const adviceNumber = document.querySelector('.generator__num');
let animation = {
    start: function(){
        let angle = 0;
        let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        animation.interval = setInterval(()=>{
            dice.style.transform = `rotate(${angle += plusOrMinus*15}deg)`;
            adviceNumber.innerText = `${Math.round(Math.random()*100)}`;
        },30);
        adviceBlock.style.opacity = 0;
    },
    stop: function(){
        clearInterval(animation.interval);
        adviceBlock.style.opacity = 1;
        dice.style.transform = `rotate(0deg)`;
        angle = 0;
    },
}

button.addEventListener('click', getAdvice);
getAdvice();

function getAdvice(e) {
    const apiUrl = 'https://api.adviceslip.com/advice';
    
    animation.start();

    button.setAttribute('disabled','');

    fetch(apiUrl, {cache: "no-cache"})
        .then(response => response.json())
        .then(data => {
            adviceNumber.innerText = data.slip.id
            adviceBlock.innerText = '"' + data.slip.advice + '"';
            animation.stop();
            setTimeout(() => {
                button.removeAttribute('disabled');
            },150);
    })
}