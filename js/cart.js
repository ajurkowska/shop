const containerProducts = document.querySelector('#container-products');
const containerSummary = document.querySelector('#container-summary');
const table = document.querySelector('#table');
const infoEmptyCart = document.querySelector('#info-empty-cart');
const counter = document.querySelector('#counter');

const createProduct = (title, price, image) => {
	const product = document.createElement('tr');
	product.innerHTML += `<td><button class="btn-delete"><i class="fa-solid fa-xmark"></i></button></td>
        <td><img class="img-cart" src="${image}" alt="okładka książki"></td>
        <td>${title}</td>
        <td><span>${price}</span> zł</td>
        <td><input id="number" type="number" value="1" min="1"></td>
        <td><span>${price}</span> zł</td>`;

	containerProducts.appendChild(product);
};

const viewForEmptyCart = () => {
	table.style.visibility = 'hidden';
	containerSummary.style.visibility = 'hidden';
	infoEmptyCart.style.display = 'flex';
};

const addBtnUpdateCart = () => {
	const info = document.createElement('tr');
	info.innerHTML = `<td colspan="4" class="update"></td>
        <td colspan="5" class="update"><button>Zaktualizuj koszyk</button></td>`;
	containerProducts.appendChild(info);
};

const updateCounter = (products) => {
    if (products.length > 0) {
        counter.innerText = products.length;
        counter.classList.add('active');
    }
};

const getItemFromLocalStorage = () => {
	const items = JSON.parse(localStorage.getItem('item'));
	updateCounter(items);
	if (items.length > 0) {
		for (const item of items) {
			createProduct(item.title, item.price, item.image);
		}
		addBtnUpdateCart();
	} else {
		viewForEmptyCart();
	}
};

getItemFromLocalStorage();