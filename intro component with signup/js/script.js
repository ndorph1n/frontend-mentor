const form = document.querySelector(".signup-form");
const formName = document.getElementById("name");
const formLastName = document.getElementById("last-name");
const formEmail = document.getElementById("email");
const formPassword = document.getElementById("password");
const emailRegExp =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validateNameAndLastName = (input,field) => {
    let valid = false;
    let fieldName = field;
    const min = 2, max = 25;

    const user = input.value.trim();
    
    if(!isCompliant(user)) {
        showError(input, `${fieldName} cannot be empty`);
    } else if (!lengthCheck(user.length, min, max)) {
        showError(input, `${fieldName}  must be between ${min} and ${max} characters`);
    } else {
        showSuccess(input);
        valid=true;
   }
   return valid;
};

const checkEmail = () => {
    let valid = false;
    const email = formEmail.value.trim();
    const formField = formEmail.nextElementSibling;
    if (!isCompliant(email)) {
        showError(formEmail, 'Email cannot be empty.');
    } else if (!isEmailValid(email)) {
        showError(formEmail, 'Email is not valid.')
    } else {
        showSuccess(formEmail);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;
    const min = 5, max = 25;
    if (!isCompliant(formPassword.value)) {
        showError(formPassword, `Password cannot be empty`);
    } else if (!lengthCheck(formPassword.value.length, min, max)) {
        showError(formPassword, `Password  must be between ${min} and ${max} characters`);
    } else {
        showSuccess(formPassword);
        valid = true;
    }
    return valid;
}

const isCompliant = value => value === "" ? false : true;

const lengthCheck = (length,min,max) => length < min || length > max ? false : true;

const isEmailValid = (email) => emailRegExp.test(email);


const showError = (input,message) => {
    const formField = input.nextElementSibling;
    formField.classList.remove("success");
    formField.classList.add("error");

    formField.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.nextElementSibling;

    formField.classList.remove('error');
    formField.classList.add('success');

    formField.textContent = "";
};

form.addEventListener("submit", function (e) {
    let isNameValid = validateNameAndLastName(formName, "First Name"),
        isLastNameValid = validateNameAndLastName(formLastName, "Last Name"),
        isEmailValid = checkEmail(),isPasswordValid = checkPassword();

    if (!(isPasswordValid && isNameValid && isLastNameValid && isEmailValid)) {
        e.preventDefault();
    }

});