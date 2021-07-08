const ELMENT = {
    $FROM_EL: $('#orderForm'),
    $DIV_CONTENER: $('#result'),
}
const order = [];
const city = {
    "Chicago": "CHI",
    "London": "LON",
    "New York City": "NYC",
    "Tel Aviv": "TLV",
    "Berlin": "BER"
}




function cretCity(params) {

    $('#city').append(
        `
    <option value="${params[1]}">${params[0]}</option>
    `)

}
start();


function start() {
    Object.entries(city).forEach(n => cretCity(n));
    timeValidation('checkIn', new Date());
    validaSelectedtDaet();
    $(".roadelSurface").hide();

    addEvent();

}

function addEvent() {
    //יש לבדוק את הפונקציה למה לא עובד
    // validaProperform()


    ELMENT.$FROM_EL.on("submit", function (event) {
        event.preventDefault();
        getTokons();
        const form = event.target
        const data = {
            city: form.city.value,
            checkIn: form.checkIn.value,
            checkOut: form.checkOut.value,
        }
        form.reset();
        $(".roadelSurface").show();

        console.log(data);
    });

}
function getTokons() {
    $.get({
        method: "post",
        url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: "grant_type=client_credentials&client_id=6NvSjIcGLPFLt7eW4IGHmdJuV2AUfY8O&client_secret=AI5zIvWHnSvdXBcO",
        success: function (result) {
            if (result) {
                console.log(result);
            }
        }
    });

}

function CreatingHotel() {

}
function CheckingAndCheckOutForm() {

}
function CreataOrder() {

}

function timeValidation(id, date) {
    console.log(id, date);
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

function startBtn() {
    $('.btn').removeAttr('disabled');
    $('.btn').removeClass('btn-secondary');
    $('.btn').addClass('btn-primary');

}


// function validaProperform() {
//     ELMENT.$FROM_EL.on('change', function (event) {
//         const form = event.target

//         const checkIn = form.checkIn.value  
//         const city = form.city.value
//         const checkOut = form.checkOut.value

//         if (city || checkIn || checkOut) {
//             // startBtn()
//             console.log('yesss');
//         }
//     })
// }



