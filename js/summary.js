const buyerBox = document.querySelector('#buyer-box');
const addressBox = document.querySelector('#address-box')
const deliveryDate = document.querySelector('#delivery-date');
const logo = document.querySelector('.logo');
const navMobile = document.querySelector('.nav-mobile');
const navDesktop = document.querySelector('.nav-desktop');

const buyer = JSON.parse(localStorage.getItem('buyer'));
const address = JSON.parse(localStorage.getItem('address'));

const setAddress = () => {
    buyerBox.innerHTML = 
    `${buyer.company} ${buyer.name} ${buyer.lastName} <br> ul. ${buyer.street} <br> ${buyer.zip} ${buyer.city}`;

    if (address) {
        addressBox.innerHTML = `${address.company} ${address.name} ${address.lastName} <br> ul. ${address.street} <br> ${address.zip} ${address.city}`
    } else {
        addressBox.innerHTML = `${buyer.company} ${buyer.name} ${buyer.lastName} <br> ul. ${buyer.street} <br> ${buyer.zip} ${buyer.city}`
    }
}

const setDeliveryDate = () => {
    const now = new Date();
    const deliveryTime = new Date(now);
    deliveryTime.setDate(deliveryTime.getDate() + 3);
    if (deliveryTime.getDay() === 0) {
        deliveryTime.setDate(deliveryTime.getDate() + 1);
    }
    deliveryDate.innerHTML = deliveryTime.toLocaleDateString(); 
}

const clearStorage = () => {
    localStorage.clear();
}

setAddress();
setDeliveryDate();

logo.addEventListener('click', clearStorage);
navMobile.addEventListener('click', clearStorage);
navDesktop.addEventListener('click', clearStorage);