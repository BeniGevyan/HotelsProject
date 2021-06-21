const ELMENT = {
    $FROM_EL: $('#orderForm'),
    $DIV_CONTENER: $('#result'),
}
const order = [];

start();


function start() {
    addEvent();
}

function addEvent() {

    ELMENT.$FROM_EL.addEventListener("submit", event => {
        e.preventDefault();
        const Order = {
            city: (event.target.city.value),
            checkIn: (event.target.checkIn.value),
            checkOut: (event.target.checkOut.value),
        }
        console.log(Order);
    });

}

function CreatingHotel() {

}
function CheckingAndCheckOutForm() {

}
function CreataOrder() {

}



