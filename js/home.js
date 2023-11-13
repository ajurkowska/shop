// pobranie elementów z HTML
const containerBook = document.querySelector('#container-book');
const counter = document.querySelector('#counter');

// lista produktów dodanych do koszyka
// const, bo możemy modyfikować jej zawartość, ale nie możemy przypisać jej do nowej tablicy (zmienić referencji)
const books = [];

const updateCounter = () => {
	if (books.length > 0) {
		counter.classList.add('active');
		counter.innerText = books.length;
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
	if (books.find((item) => item.id === id)) {
        const index = books.findIndex(item => item.id === id);
		books.splice(index, 1);
		toggleCart(button);
		updateCounter();
	} else {
		books.push({ id, title, price });
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

containerBook.addEventListener('click', handleButtonClick);