const ELMENT = {
    $FROM_EL: $('#orderForm'),
    $DIV_CONTENER: $('#result'),
}
const order = [];

start();


function start() {
    timeValidation('checkIn', new Date());
    validaSelectedtDaet();
    addEvent();
}

function addEvent() {

    ELMENT.$FROM_EL.on("submit", function (event) {
        event.preventDefault();
        const form = event.target
        const data = {
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

function timeValidation(id, date) {
    console.log(id,date);
  document.getElementById(id).setAttribute("min", changeDateFormat(date));   
}

function changeDateFormat(date) {
    const today = date
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return [year, padLeadingZero(month), padLeadingZero(day)].join('-');
}

function padLeadingZero(number) {
    return number.toString().length < 2 ? `0${number}` : number;
}


function validaSelectedtDaet() {
    $('#checkIn').on('change', function (input) {
        const date = input.target.value;
        if (date) {
            document.getElementById('checkOut').removeAttribute('disabled');
            const newDay = new Date(`${date}`);
            newDay.setDate(newDay.getDate() + 1);
            timeValidation('checkOut', newDay)
        
        }
    })

}