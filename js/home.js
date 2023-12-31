// pobranie elementów z HTML
const containerBook = document.querySelector('#container-book');
const selectBox = document.querySelector('#select-box');
const itemBox = document.querySelectorAll('.item-box');
const filterBox = document.querySelector('#filter-box');

// lista produktów dodanych do koszyka
let productsInCart = [];

const updateCounter = () => {
	let allQuantity = 0;
	for (const product of productsInCart) {
		allQuantity += Number(product.quantity);
	}

	if (productsInCart.length > 0) {
		counter.classList.add('active');
		counter.innerText = allQuantity;
	} else {
		counter.classList.remove('active');
		counter.innerText = '';
	}
};

// obsługa przycisku "dodaj do koszyka"
const toggleCart = (element) => {
	element.classList.toggle('in-cart');
	if (element.classList.contains('in-cart')) {
		element.innerText = 'Usuń z koszyka';
	} else {
		element.innerText = 'Dodaj do koszyka';
	}
};

const updateStorage = () => {
	// konwertowanie tablicy do stringa za pomocą stringify
	localStorage.setItem('item', JSON.stringify(productsInCart));
};

const loadFromStorage = () => {
	const savedData = localStorage.getItem('item');
	if (savedData) {
		productsInCart = JSON.parse(savedData);
		for (let i = 0; i < productsInCart.length; i++) {
			const element = productsInCart[i].id;
			const button = document.querySelector(`button[data-id="${element}"]`);
			if (button) {
				toggleCart(button);
				updateCounter();
			}
		}
	}
};

const addToCart = (id, title, price, image, button, quantity = 1) => {
	if (productsInCart.find((item) => item.id === id)) {
		const index = productsInCart.findIndex((item) => item.id === id);
		productsInCart.splice(index, 1);
		toggleCart(button);
		updateCounter();
		updateStorage();
	} else {
		productsInCart.push({ id, title, price, image, quantity });
		toggleCart(button);
		updateCounter();
		updateStorage();
	}
};

const handleButtonClick = (event) => {
	if (event.target.tagName === 'BUTTON') {
		const id = Number(event.target.dataset.id);
		const title = event.target.dataset.title;
		const price = Number(event.target.dataset.price);
		const image = event.target.dataset.image;
		addToCart(id, title, price, image, event.target);
	}
};

const selectOption = () => {
	const seleted = selectBox.value;
	switch (seleted) {
		case 'alphabetically':
			sortByName();
			break;
		case 'low':
			sortFromLowest();
			break;
		case 'high':
			sortFromHighest();
			break;
	}
};

const filterOption = () => {
	const filtered = filterBox.value;
	switch (filtered) {
		case 'all':
			filterByCategory('all');
			break;
		case 'finances':
			filterByCategory('finances');
			break;
		case 'development':
			filterByCategory('development');
			break;
		case 'it':
			filterByCategory('it');
			break;
	}
};

const filterByCategory = (category) => {
	const products = getProductsToArray();
	const filteredProduct = products.filter(
		(product) => product.category === category
	);
	if (category !== 'all') {
		containerBook.innerHTML = '';
		filteredProduct.forEach(({ item }) => containerBook.appendChild(item));
	} else {
		products.forEach(({ item }) => containerBook.appendChild(item));
	}
};

// pobranie informacji o produktach i zwrócenie tablicy obiektów
const getProductsToArray = () => {
	const products = [];
	for (let i = 0; i < itemBox.length; i++) {
		const item = itemBox[i];
		const title = item.querySelector('h2').innerText;
		const titleElement = item.querySelector('.title');
		const price = Number(item.querySelector('span').innerText);
		const category = titleElement.dataset.category;
		const product = { price, title, category, item };
		products.push(product);
	}
	return products;
};

const sortString = (a, b) => {
	if (a > b) {
		return 1;
	} else if (a < b) {
		return -1;
	} else {
		return 0;
	}
};

// ponowne wczytanie kontenera z posortowanymi produktami
const reloadContainter = (sortString) => {
	const products = getProductsToArray().sort(sortString);

	// usunięcie produktów z kontenera
	containerBook.innerHTML = '';

	// dodanie posortowanych produktów do kontenera
	products.forEach(({ item }) => containerBook.appendChild(item));
};

const sortFromHighest = () => {
	reloadContainter((a, b) => b.price - a.price);
};

const sortFromLowest = () => {
	reloadContainter((a, b) => a.price - b.price);
};

const sortByName = () => {
	reloadContainter((a, b) => sortString(a.title, b.title));
};

containerBook.addEventListener('click', handleButtonClick);
selectBox.addEventListener('change', selectOption);
filterBox.addEventListener('change', filterOption);
// wczytanie danych z localStorage po załadowaniu strony
window.addEventListener('load', loadFromStorage);