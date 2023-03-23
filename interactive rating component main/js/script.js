const form = document.getElementsByClassName("rating-form");
const button = document.getElementsByClassName("button");
const ratingStart = document.getElementsByClassName("rating-start");
const ratingEnd = document.getElementsByClassName("rating-end");
const rates = document.getElementsByName("rating");
let rateValue="";
const sumRating = document.getElementsByClassName("selected-rating")[0];

form[0].addEventListener('submit',(e) => {
    e.preventDefault();
    ratingStart[0].classList.remove("active");
    ratingEnd[0].classList.add("active");
    for (let i = 0; i < rates.length; i++) {
        if (rates[i].checked) {
            rateValue = rates[i].value;
        }
    }
    sumRating.textContent = rateValue;
});


