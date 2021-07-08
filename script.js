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

function cretCity(params) {
    $('#city').append(
        `
        <option value="${params[1]}">${params[0]}</option>
        `)
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




function CreatingHotel(hotel) {
    ELMENT.$DIV_CONTENER.append(`
    <div class="HotelDetails d-flex flex-row">
    <div class="poto p2">
        <img src="IMEG/237729537.jpg" alt="" class="hotelImg">
    </div>
    <div class="text p2">

        <div class="bodyOfContent">
            <h1>HIPARC12</h1>
            <span>&#11088;</span>
            <span>&#11088;</span>
            <span>&#11088;</span>
            <span>&#11088;</span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            <p>דירגו אותו 9.2 </p>
        </div>

        <div class="endOfContent">
            <p>מלון הייפארק אדג'יו סרי ואל ד'אירופ (Adagio Serris Val d Europe) ממוקם במרחק של קילומטר וחצי
                מדיסנילנד פריז (Disneyland Paris), ומציע גישה חופשית לסאונה, לבריכה החיצונית ולחדר הכושר,
                וכן
                דלפק
                קבלה הפועל 24 שעות ביממה.

                הסוויטות ויחידות הסטודיו במקום מעוצבות בסגנון עכשווי ומציעות אירוח בשירות עצמי, אינטרנט
                אלחוטי
                חינם,
                טלוויזיית LCD ומיזוג אוויר. בחדרי הרחצה יסופק לכם מייבש שיער. ניתן לבקש גם יחידות סטודיו
                מחוברות.

                מדי בוקר, יוגש לכם במלון מזנון ארוחת בוקר בסגנון קונטיננטלי. לאחר ארוחת הבוקר, תוכלו להזמין
                עיסוי או
                לשחות בבריכה.

                המלון הוא ללא עישון. הוא נמצא במרחק של 5 דקות הליכה ממרכז הקניות La Vallée, כ-10 דקות נסיעה
                מתחנת
                רכבת ה-RER, וכשלושה ק"מ ממועדון הגולף דיסנילנד. שדה התעופה שארל דה גול (Charles de Gaulle
                Airport)
                נמצא במרחק של 30 דקות נסיעה, וניתן גם להזמין שירות הסעות ללא תשלום לדיסנילנד פריז.</p>
        </div>
        <div class="ContentHead d-flex flex-row">
            <div class="p2">
                <p>price:500$</p>
                <p>readily available
                    Not available</p>
            </div>
            <div class="p2 btnRoom">
                <button type="submit" class="roomOrder btn btn-success">order</button>
            </div>
            
        </div>

    </div>

</div>

                    `)

}