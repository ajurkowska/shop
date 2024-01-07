let counter;

const switchCounter = () => {
	if (window.innerWidth > 992) {
		counter = document.querySelector('#counter');
	} else {
		counter = document.querySelector('#counter-mobile');
	}
}

switchCounter();
window.addEventListener('resize', switchCounter);