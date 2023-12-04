// pobranie elemntów z HTML
const containerProducts = document.querySelector('#container-products');
const containerSummary = document.querySelector('#container-summary');
const table = document.querySelector('#table');
const infoEmptyCart = document.querySelector('#info-empty-cart');
const counter = document.querySelector('#counter');
const updateCartBtn = document.querySelector('#update-cart-btn');

const createProduct = (productId, title, price, image) => {
	const product = document.createElement('tr');
	product.innerHTML += `<td><button class="btn-delete"><i class="fa-solid fa-xmark"></i></button></td>
    <td><img class="img-cart" src="${image}" alt="okładka książki"></td>
    <td>${title}</td>
    <td><span class="price">${price}</span> zł</td>
    <td><input id="${productId}" type="number" value="1" min="1"></td>
    <td><span class="sum">${price}</span> zł</td>`;

	containerProducts.appendChild(product);
};

const viewForEmptyCart = () => {
	table.style.visibility = 'hidden';
	containerSummary.style.visibility = 'hidden';
	updateCartBtn.style.visibility = 'hidden';
	infoEmptyCart.style.display = 'flex';
};

// aktualizacja koszyka
const updateCart = () => {
	const inputs = document.querySelectorAll('input');
	const prices = document.querySelectorAll('.price');
	const sums = document.querySelectorAll('.sum');
	let totalAmount = 0;

	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i];
		const price = prices[i];
		const sum = sums[i];

		const amount = (price.innerText * input.value).toFixed(2);
		sum.innerText = amount;

		totalAmount += parseFloat(amount);
	}
	return totalAmount;
};

// obliczenie całkowitej ceny
const calculateTotalPrice = () => {
	const totalAmount = updateCart();
	console.log(totalAmount);
	const total = document.querySelector('#total');
	const totalAmountWithDelivery = document.querySelector(
		'#totalAmountWithDelivery'
	);
	total.innerText = totalAmount.toFixed(2);
	totalAmountWithDelivery.innerHTML = (totalAmount + 9.99).toFixed(2);
};

// aktualizacja licznika
const updateCounter = (products) => {
	if (products.length > 0) {
		counter.innerText = products.length;
		counter.classList.add('active');
	}
};

// pobranie przedmiotów z localStorage
const getItemFromLocalStorage = () => {
	const items = JSON.parse(localStorage.getItem('item'));
	updateCounter(items);
	if (items.length > 0) {
		for (const item of items) {
			createProduct(item.id, item.title, item.price, item.image);
		}
		calculateTotalPrice();
		updateCartBtn.addEventListener('click', calculateTotalPrice);
	} else {
		viewForEmptyCart();
	}
};

document.addEventListener('DOMContentLoaded', getItemFromLocalStorage());
