// pobranie elementów z HTML
const containerBook = document.querySelector('#container-book');
const counter = document.querySelector('#counter');
const selectBox = document.querySelector('#select-box');
const itemBox = document.querySelectorAll('.item-box');

// lista produktów dodanych do koszyka
// const, bo możemy modyfikować jej zawartość, ale nie możemy przypisać jej do nowej tablicy (zmienić referencji)
const productsInCart = [];

const updateCounter = () => {
	if (productsInCart.length > 0) {
		counter.classList.add('active');
		counter.innerText = productsInCart.length;
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

const addToCart = (id, title, price, button) => {
	if (productsInCart.find((item) => item.id === id)) {
		const index = productsInCart.findIndex((item) => item.id === id);
		productsInCart.splice(index, 1);
		toggleCart(button);
		updateCounter();
	} else {
		productsInCart.push({ id, title, price });
		toggleCart(button);
		updateCounter();
	}
};

const handleButtonClick = (event) => {
	if (event.target.tagName === 'BUTTON') {
		const id = Number(event.target.dataset.id);
		const title = event.target.dataset.title;
		const price = Number(event.target.dataset.price);
		addToCart(id, title, price, event.target);
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

const sortString = (a, b) => {
	if (a > b) {
		return 1;
	} else if (a < b) {
		return -1;
	} else {
		return 0;
	}
};

const sortFromHighest = () => {
	const products = [];
	for (let i = 0; i < itemBox.length; i++) {
		const item = itemBox[i];
		const title = item.querySelector('h2').innerText;
		const price = Number(item.querySelector('span').innerText);
		const product = { price, title, item };
		products.push(product);
	}
	products.sort((a, b) => b.price - a.price);
	
	// usunięcie produktów z kontenera
	containerBook.innerHTML = '';

	// dodanie posortowanych produktów do kontenera
	products.forEach(({ item }) => containerBook.appendChild(item));
}

const sortFromLowest = () => {
	const products = [];
	for (let i = 0; i < itemBox.length; i++) {
		const item = itemBox[i];
		const title = item.querySelector('h2').innerText;
		const price = Number(item.querySelector('span').innerText);
		const product = { price, title, item };
		products.push(product);
	}
	products.sort((a, b) => a.price - b.price);
	
	// usunięcie produktów z kontenera
	containerBook.innerHTML = '';

	// dodanie posortowanych produktów do kontenera
	products.forEach(({ item }) => containerBook.appendChild(item));
}

const sortByName = () => {
	const products = [];
	for (let i = 0; i < itemBox.length; i++) {
		const item = itemBox[i];
		const title = item.querySelector('h2').innerText;
		const product = { title, item };
		products.push(product);
	}
	products.sort((a, b) => sortString(a.title, b.title));

	// usunięcie produktów z kontenera
	containerBook.innerHTML = '';

	// dodanie posortowanych produktów do kontenera
	products.forEach(({ item }) => containerBook.appendChild(item));
};

containerBook.addEventListener('click', handleButtonClick);
selectBox.addEventListener('change', selectOption);