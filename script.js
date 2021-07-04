const ELMENT = {
    $FROM_EL: $('#orderForm'),
    $DIV_CONTENER: $('#result'),
}
const order = [];

start();


function start() {
    timeValidation();
    
    addEvent();
}

function addEvent() {   

    ELMENT.$FROM_EL.on( "submit", function (event) {
        event.preventDefault();
        const form = event.target
        const data ={
            checkIn: form.checkIn.value,
            checkOut: form.checkOut.value,
        }





        form.reset();
        console.log(data);
    });

}

function CreatingHotel() {

}
function CheckingAndCheckOutForm() {

}
function CreataOrder() {

}
function timeValidation() {
    const checkIn =document.getElementById('checkIn');
    checkIn.setAttribute("min", getTodayString());
   
    
}
function getTodayString() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return [year, padLeadingZero(month), padLeadingZero(day)].join('-');
}
function padLeadingZero(number) {
    return number.toString().length < 2 ? `0${number}` : number;
}

function getminDeyForCheckout(){
    document.getElementById('checkIn').ready(
        
    )
    document.getElementById('checkOut').setAttribute("min", checkIn.toString());

}

