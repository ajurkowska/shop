// walidacja
// walidacja głównego formularza
const paymentDetails = document.querySelector('.payment-details');
const nameInput = paymentDetails.querySelector('input[name=name]');
const lastNameInput = paymentDetails.querySelector('input[name=lastname]');
const companyInput = paymentDetails.querySelector('input[name=company]');
const nipInput = paymentDetails.querySelector('input[name=nip]');
const streetInput = paymentDetails.querySelector('input[name=street]');
const zipInput = paymentDetails.querySelector('input[name=zip]');
const cityInput = paymentDetails.querySelector('input[name=city]');
const phoneInput = paymentDetails.querySelector('input[name=phone]');
const emailInput = paymentDetails.querySelector('input[name=email]');
const forms = document.querySelector('#forms');

//walidacja formularza - inny adres do wysyłki
const anotherAddressForm = document.querySelector('.address-form');
const nameDeliveryInput = anotherAddressForm.querySelector('input[name=name-delivery]');
const lastNameDeliveryInput = anotherAddressForm.querySelector('input[name=lastname-delivery]');
const companyDeliveryInput = anotherAddressForm.querySelector('input[name=company-delivery]');
const streetDeliveryInput = anotherAddressForm.querySelector('input[name=street-delivery]');
const zipDeliveryInput = anotherAddressForm.querySelector('input[name=zip-delivery]');
const cityDeliveryInput = anotherAddressForm.querySelector('input[name=city-delivery]');

const mainData = [nameInput, lastNameInput, streetInput, zipInput, cityInput, phoneInput, emailInput];
const addressData = [nameDeliveryInput, lastNameDeliveryInput, streetDeliveryInput, zipDeliveryInput, cityDeliveryInput];

const checkEmptyFields = (input) => {
	input.forEach((el) => {
		if (el.value === '') {
			el.classList.add('error');
		} else {
			el.classList.remove('error');
		}
	});
};

const checkLength = (input, min) => {
	input.forEach((el) => {
		if (el.value.length < min && el.value.length > 0) {
			el.nextElementSibling.innerText = `Podaj min ${min} znaki`;
            el.classList.add('error');
		} else {
			clearErrorInfo(el);
		}
	});
};

const validateCompanyName = (input) => {
    input.forEach(el => {
        if (el.value === '' || el.value.length >= 3) {
            clearErrorInfo(el);
            el.classList.remove('error');
        }})
}

const validatePhone = (input, min) => {
	if (!/^\d{9}$/.test(input.value) && input.value !== '') {
		input.nextElementSibling.innerText = `Podaj ${min} cyfr`;
        input.classList.add('error');
	} else {
		clearErrorInfo(input);
	}
};

const validateRegex = (input, regex) => {
	if (!regex.test(input.value) && input.value !== '') {
		input.nextElementSibling.innerText = 'Podano niepoprawne dane';
        input.classList.add('error');
	} else {
		clearErrorInfo(input);
	}
};

const clearErrorInfo = (input) => {
	input.nextElementSibling.innerText = '';
};

const onSubmit = (event) => {
	event.preventDefault();
	checkEmptyFields(mainData);
	checkLength([nameInput, lastNameInput, companyInput, cityInput, streetInput], 3);
	validatePhone(phoneInput, 9);
	validateRegex(zipInput, /[0-9]{2}-[0-9]{3}/);
	validateRegex(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    validateCompanyName([companyInput, companyDeliveryInput]);
    
    if (invoiceCheckbox.checked) {
        checkEmptyFields([nipInput]);
        validateRegex(nipInput, /^[0-9]{10}$/);
    }

	if (addressCheckbox.checked) {
    checkEmptyFields(addressData);
		checkLength([nameDeliveryInput, lastNameDeliveryInput, companyDeliveryInput, cityDeliveryInput, streetDeliveryInput],3);
		validateRegex(zipDeliveryInput, /[0-9]{2}-[0-9]{3}/);
	};
    checkStatute();
    checkErrors();
};

forms.addEventListener('submit', onSubmit);

// pobranie elementów z HTML
const counter = document.querySelector('#counter');
const orderBox = document.querySelector('#order-box');
const invoiceCheckbox = document.querySelector('#invoice');
const nipBox = document.querySelector('.nip');
const addressCheckbox = document.querySelector('#address-checkbox');
const addressForm = document.querySelector('.address-form');
const statuteCheckbox = document.querySelector('input[name="statute"]');
const buyBtn = document.querySelector('#buy-btn');

// pobranie danych z local storage
const items = JSON.parse(localStorage.getItem('item'));

const updateCounter = () => {
	let itemsQuantity = 0;

	for (const item of items) {
		itemsQuantity += Number(item.quantity);
	}

	if (itemsQuantity > 0) {
		counter.innerText = itemsQuantity;
		counter.classList.add('active');
	}
};

updateCounter();

const showOrder = () => {
	let totalSum = 0;
	let titleArray = [];
	let sumWithDelivery = 0;

	for (const item of items) {
		const sum = Number(item.price) * item.quantity;
		totalSum += sum;
		sumWithDelivery = totalSum + 9.99;

		const titles = item.title;
		const quantity = item.quantity;

		titleArray.push(`${titles} x${quantity}`);
	}

	const formattedTotalSum = totalSum.toFixed(2);
	const formattedSumWithDelivery = sumWithDelivery.toFixed(2);

	orderBox.innerHTML = `<tbody>
    <tr>
        <th>Produkt</th>
        <td>${titleArray.join(', ')}</td>
    </tr>
    <tr>
        <th>Kwota</th>
        <td class="total">${formattedTotalSum} zł</td>
    </tr>
    <tr>
        <th>Wysyłka</th>
        <td>9.99 zł</td>
    </tr>
    <tr>
        <th>Łącznie</th>
        <td class="total">${formattedSumWithDelivery} zł</td>
    </tr>
</tbody>`;
};

showOrder();

const addAnotherAddress = () => {
	if (addressCheckbox.checked) {
		addressForm.classList.remove('hidden');
	} else {
		addressForm.classList.add('hidden');
        const elements = addressForm.querySelectorAll('input');
		elements.forEach(el => {
            el.nextElementSibling.innerText = '';
            el.value = '';
            el.classList.remove('error');
        })
	}
};

const addNip = () => {
	if (invoiceCheckbox.checked) {
		nipBox.style.display = 'flex';
	} else {
		nipBox.style.display = 'none';
        nipInput.nextElementSibling.innerText = '';
        nipInput.value = '';
        nipInput.classList.remove('error');
	}
};

const checkStatute = () => {
	if (!statuteCheckbox.checked) {
        buyBtn.disabled = true;
	} else {
		buyBtn.disabled = false;
	}
};

const checkErrors = () => {
    const inputs = document.querySelectorAll('input');
    let errorCounter = 0;

    inputs.forEach(el => {
        if (el.classList.contains('error')) {
            errorCounter++;
        }
    })

    if (errorCounter === 0) {
        window.location.href = '#';
    }
}

invoiceCheckbox.addEventListener('change', addNip);
addressCheckbox.addEventListener('change', addAnotherAddress);