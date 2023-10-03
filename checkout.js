const form = document.getElementById('form');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const permanentAddress = document.getElementById('permanentAddress');
const presentAddress = document.getElementById('presentAddress');
const province = document.getElementById('province')
const city = document.getElementById('city')
const zip = document.getElementById('zip');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    console.log(element);
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const validateInputs = () => {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const permanentAddressValue = permanentAddress.value.trim();
    const presentAddressValue = presentAddress.value.trim();
    const zipValue = zip.value.trim();
    const provinceValue = province.value;
    const cityValue = city.value;

    if(firstNameValue === ''){
        setError(firstName, 'First name is required')
    } else{
        setSuccess(firstName);
    }

    if(lastNameValue === ''){
        setError(lastName, 'Last name is required')
    } else{
        setSuccess(lastName);
    }

    if(emailValue === ''){
        setError(email, 'Email is required');
    } else{
        setSuccess(email);
    }

    if(permanentAddressValue === ''){
        setError(permanentAddress, 'Permanent address is required')
    } else{
        setSuccess(permanentAddress);
    }

    if(presentAddressValue === ''){
        setError(presentAddress, 'Present address is required')
    } else{
        setSuccess(presentAddress);
    }
    
    if(cityValue === ''){
        setError(city, 'City is requires')
    } else{
        setSuccess(city)
    }

    if(provinceValue === ''){
        setError(province, 'Province is requires')
    } else{
        setSuccess(province)
    }

    if(zipValue === ''){
        setError(zip, 'Zip is required')
    } else{
        setSuccess(zip);
    }
};