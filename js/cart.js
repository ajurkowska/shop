// pobranie elemntów z HTML
const containerProducts = document.querySelector('#container-products');
const containerSummary = document.querySelector('#container-summary');
const table = document.querySelector('#table');
const infoEmptyCart = document.querySelector('#info-empty-cart');
const updateCartBtn = document.querySelector('#update-cart-btn');

const createProduct = (productId, title, price, image, quantity) => {
	const product = document.createElement('tr');
	product.innerHTML += `<td><button data-id=${productId} class="btn-delete"><i class="fa-solid fa-xmark"></i></button></td>
    <td><img class="img-cart" src="${image}" alt="okładka książki"></td>
    <td class="title">${title}</td>
    <td><span class="price">${price}</span> zł</td>
    <td><input data-id="${productId}"type="number" value="${quantity}" min="1"></td>
    <td><span class="sum">${price}</span> zł</td>`;

	containerProducts.appendChild(product);
};

const deleteProduct = (event) => {
	if (event.target.tagName === 'BUTTON') {
		const productRow = event.target.closest('tr');

		if (productRow) {
			containerProducts.removeChild(productRow);
			const hasOtherProduct = containerProducts.children.length > 0;

			if (!hasOtherProduct) {
				viewForEmptyCart();
			} 
			calculateTotalPrice();
			updateCounter();
		}
	}
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
	const titles = document.querySelectorAll('.title');
	const images = document.querySelectorAll('.img-cart');

	let totalAmount = 0;

	const updateItems = [];

	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i];
		const price = prices[i];
		const sum = sums[i];
		const title = titles[i];
		const image = images[i];

		const button = input.closest('tr').querySelector('.btn-delete');
		const productId = button.dataset.id;

		const amount = (price.innerText * input.value).toFixed(2);
		sum.innerText = amount;

		totalAmount += parseFloat(amount);

		updateItems.push({
			id: Number(productId),
			title: title.innerText,
			price: price.innerText,
			image: image.hasAttribute('src') ? image.getAttribute('src') : '',
			quantity: input.value,
		});
	}

	localStorage.setItem('item', JSON.stringify(updateItems));
	return totalAmount;
};

// obliczenie całkowitej ceny
const calculateTotalPrice = () => {
	const totalAmount = updateCart();
	const total = document.querySelector('#total');
	const totalAmountWithDelivery = document.querySelector('#totalAmountWithDelivery');
	total.innerText = totalAmount.toFixed(2);
	totalAmountWithDelivery.innerHTML = (totalAmount + 9.99).toFixed(2);
};

// aktualizacja licznika
const updateCounter = () => {
	const items = JSON.parse(localStorage.getItem('item')) || [];
	let itemsQuantity = 0;

	for (const item of items) {
		itemsQuantity += parseInt(item.quantity) || 0;
	}

	if (itemsQuantity > 0) {
		counter.innerText = itemsQuantity;
		counter.classList.add('active');
		counter.classList.add('in-cart');
	} else {
		counter.innerText = '';
		counter.classList.remove('active');
		counter.classList.remove('in-cart');
	}
};

// pobranie przedmiotów z localStorage
const getItemFromLocalStorage = () => {
	updateCounter();
	const storedItems = localStorage.getItem('item');
	const items = storedItems ? JSON.parse(storedItems) : [];
	if (items.length > 0) {
		for (const item of items) {
			createProduct(item.id, item.title, item.price, item.image, item.quantity);

			const input = document.querySelector(
				`.item-box[data-id="${item.id}"] input`
			);
			console.log(input);
			if (input) {
				input.value = item.quantity;
			}
		}
		calculateTotalPrice();
		updateCartBtn.addEventListener('click', () => {
			calculateTotalPrice();
			updateCounter();
		});
	} else {
		viewForEmptyCart();
	}
};

document.addEventListener('DOMContentLoaded', getItemFromLocalStorage());
containerProducts.addEventListener('click', deleteProduct);