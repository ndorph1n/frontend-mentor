const form = document.querySelector(".section-form");
const formEmail = document.getElementById("email");
const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const checkEmail = () => {
    let valid = false;
    const email = formEmail.value.trim();
    if (!isCompliant(email)) {
        showError(formEmail, 'Email cannot be empty.');
        
    } else if (!isEmailValid(email)) {
        showError(formEmail, 'Please provide a valid email address.')
    } else {
        showSuccess(formEmail);
        valid = true;
    }
    return valid;
};

const isEmailValid = (email) => emailRegExp.test(email);
const isCompliant = value => value === "" ? false : true;

const showError = (input, message) => {
    const errorField = document.querySelector(".error");
    const inputBorder = document.getElementById('email').style.cssText = "border: 1px solid var(--secondary-light-red);margin-bottom: 1.5em";
    if (errorField) {
        errorField.remove();
        const errorMessage = input.insertAdjacentHTML("afterend", '<span class="error">' + message + '</span>');
    } else {
        errorMessage = input.insertAdjacentHTML("afterend", '<span class="error">' + message + '</span>');
    }
};

const showSuccess = (input) => {
    const errorField = document.querySelector(".error").remove();
    const inputBorder = document.getElementById('email').style.cssText = "border: 1px solid var(--secondary-pale-blue)";
};

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isEmailValid = checkEmail();       
    
});