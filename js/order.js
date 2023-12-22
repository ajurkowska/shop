// pobranie elementów z HTML
const counter = document.querySelector('#counter');
const orderBox = document.querySelector('#order-box');
const invoiceCheckbox = document.querySelector('#invoice');
const nipBox = document.querySelector('.nip');
const addressCheckbox = document.querySelector('#address-checkbox');
const addressForm = document.querySelector('.address-form');
const statuteCheckbox = document.querySelector('input[name="statute"]');

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
	}
};

const addNip = () => {
	if (invoiceCheckbox.checked) {
		nipBox.style.display = 'flex';
	} else {
		nipBox.style.display = 'none';
	}
};

const checkStatute = () => {
	if (!statuteCheckbox.checked) {
		payBtn.disabled = true;
	} else {
		payBtn.disabled = false;
	}
};

invoiceCheckbox.addEventListener('change', addNip);
addressCheckbox.addEventListener('change', addAnotherAddress);
statuteCheckbox.addEventListener('change', checkStatute);