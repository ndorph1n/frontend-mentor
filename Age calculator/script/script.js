const button = document.querySelector('.inputField__button');
const dayInput = document.querySelector('.input_day');
const monthInput = document.querySelector('.input_month');
const yearInput = document.querySelector('.input_year');
const dayOutput = document.querySelector('.result__days');
const monthOutput = document.querySelector('.result__months');
const yearOutput = document.querySelector('.result__years');

button.addEventListener( 'click', ()=>calculateAge(dayInput,monthInput,yearInput),false);

function calculateAge(d,m,y) {
    const today = new Date();
    const inputDate = new Date(yearInput.value,monthInput.value-1,dayInput.value);
    const secondsSinceBirth = Math.floor((today - inputDate)/1000);

    removeError();

    if (validateForm(today, inputDate)){
        let ageYear = Math.floor(secondsSinceBirth / 31557600);

        let ageMonth = Math.floor((secondsSinceBirth - (ageYear * 31557600))/2629800) ;

        let ageDay = Math.floor((secondsSinceBirth - (ageMonth * 2629800) - (ageYear*31557600))/86400);

        if (ageDay == 1) {
            dayOutput.parentNode.childNodes[2].nodeValue = '\nday';
        }
        if (ageMonth == 1) {
            monthOutput.parentNode.childNodes[2].nodeValue = '\nmonth';
        }
        if (ageYear == 1) {
            yearOutput.parentNode.childNodes[2].nodeValue = '\nyear';
        }

        
        animateAge(ageDay,ageMonth,ageYear);
    }
}

function animateAge(d,m,y) {
    let day = 0,
        month = 0,
        year = 0;
    
    let animateDay = setInterval(()=>{
        if(day==d){
            dayOutput.innerHTML = day;
            clearInterval(animateDay);
        } else {
            day++;
            dayOutput.innerHTML = day;
        }        
    },50);

    let animateMonth = setInterval(()=>{
        if(month==m) {
            monthOutput.innerHTML = month;
            clearInterval(animateMonth);
        } else {
            month++;
            monthOutput.innerHTML = month;
        }
    },75);

    let animateYear = setInterval(()=>{
        if(year==y){
            yearOutput.innerHTML = year;
            clearInterval(animateYear);
        } else {
            year++;
            yearOutput.innerHTML = year;
        }
    },25);
}

function validateForm(today, birthday) {
    let isValid = true;

    const inputs = document.querySelectorAll('.input');

    inputs.forEach(input => {
        if (input.value === '') {
            error(input, 'This field is required');
            isValid = false;
        } else if (isNaN(+input.value)) {
            error(input,'Only nubmers are allowed');
            isValid = false;
        }
    });

    if (today - birthday < 0) {
        error(yearInput, 'Must be in past');
        isValid = false;
    }

    if (!isValidMonth()) {
        isValid = false;
    }

    if (!isValidDay()) {
        isValid = false;
    }

    return isValid;
}

function isValidMonth() {
    const month = +monthInput.value;
    if (month !== '' && (month < 1 || month > 12)) {
        error(monthInput, 'Must be a valid month');
        return false;
    }
    return true;
}

function isValidDay() {
    const month = +monthInput.value;
    const day = +dayInput.value;
    const year = +yearInput.value;

    const daysInMonth = {
        1: 31,
        2: (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31,
    };

    if (day < 1 || day >31 || day > daysInMonth[month]) {
        error(dayInput, 'Must be a valid day');
        return false;
    }

    return true;
}

function error(input,type){
    const label = input.parentNode;
    const errorBlock = label.querySelector('.error');

    if (!errorBlock){
        console.log('created')
        let errorDiv = document.createElement('div');
        label.classList.add('red');
        input.classList.add('red');
        errorDiv.classList.add('error', 'red');
        errorDiv.innerText = type;

        label.appendChild(errorDiv);
    } else {
        errorBlock.innerText = type;
        label.classList.add('red');
        input.classList.add('red');
    }

    input.addEventListener('input', ()=>{
        label.classList.remove('red');
        input.classList.remove('red');
    });
}

function removeError(input) {
    document.querySelectorAll('.error').forEach( error => {error.remove()});
    document.querySelectorAll('.red').forEach( red => {red.classList.remove('red')});
}