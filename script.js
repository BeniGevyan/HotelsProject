const ELMENT = {
    $FROM_EL: $('#orderForm'),
    $DIV_CONTENER: $('#result'),
}

const order = [];

start();



//#region Initial Loading Methods

function start() {
    getJsonFeil()
    setMinimumTime('checkIn', new Date());
    validationMinimumRange();
    addEvent();
    
}

function getJsonFeil() {
    $.getJSON("test.json", function (data) {
        Object.entries(data ).forEach(n => cretListCitys(n));
    }).fail(function () {
        console.log("An error has occurred.");
    });
}
//#endregion Initial Loading Methods


//#region Validation Methods

function checkingTheDateRange() {
    const checkIn = $('#checkIn').val()
    const checkOut = $('#checkOut').val()

    if (new Date(`${checkIn}`) > new Date(`${checkOut}`)) {
        $('#checkOut').val('');
    }
}

function validationMinimumRange() {
    $('#checkIn').on('change', function (input) {
        const date = input.target.value;
        checkingTheDateRange()
        if (date) {
            $('#checkOut').removeAttr('disabled');
            const newDay = new Date(`${date}`);
            newDay.setDate(newDay.getDate() + 1);
            setMinimumTime('checkOut', newDay)
        }
    })

}

//#endregion Validation Methods


//#region  CRUD (Create, Read, Update, Delete) Methods

function cretListCitys(params) {
    $('#city').append(
        `
        <option value="${params[1]}">${params[0]}</option>
        `)
}

function creatingHotels(hotel) {

    ELMENT.$DIV_CONTENER.append(`
     
    <div class="HotelDetails d-flex flex-row">
    <div class="poto p2">
        <img src=${imgs('hotel')} alt="" class="hotelImg">
    </div>
    <div class="text p2">

        <div class="bodyOfContent">
            <h1>${hotel.hotel.hotelId}</h1>
            <div>
            ${creatStars(hotel.hotel.rating)}
            </div>
                  
        </div>

        <div class="endOfContent">
            <p>${hotel.hotel.description.text}</p>
        </div>
        <div class="ContentHead d-flex flex-row">
            <div class="p2">
                <p>${hotel.offers[0].price.currency},${hotel.offers[0].price.total}</p>
                <p>readily available
                    Not available
                    ${hotel.offers[0].room.description.text}</p>
            </div>
            <div class="p2 btnRoom">
                <button typ-e="submit" class="roomOrder btn btn-success">order</button>
            </div>

        </div>

    </div>

</div>    ` )}

function creatStars(nmuber) {
    const stars = `<span>&#11088;</span>`
    let allStar = ``
    for (let i = 0; i <= nmuber; i++) {
        allStar += stars;
    }
    return allStar;
}

//#endregion  CRUD (Create, Read, Update, Delete) Methods


//#region DOM Manipulation Methods

function addEvent() {
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
        CreatingHotel(malon);
        console.log(data);
    });
}

function setMinimumTime(id, date) {
    document.getElementById(id).setAttribute("min", changeDateFormat(date));
}

function changeButActive() {
    $('.btn').removeAttr('disabled');
    $('.btn').removeClass('btn-secondary');
    $('.btn').addClass('btn-primary');

}

function CreatingHotel(hotel) {
    hotel.data.forEach(creatingHotels);
}

//#endregion DOM Manipulation Methods


//#region Local Storage Methods

//#endregion


//#region Logical  Methods

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

//#endregion Logical  Methods


//#region External readings

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

function imgs(type) {
    const url = `https://api.unsplash.com/search/photos/?query=${type}&page=1&per_page=1&client_id=fxxTEmUpHWL_AY16kZr7CDmk7YQvpZ0hmgnF6kl13Kk`
    $.get(url, (data) => {
        if (data) {
            const imgUrl = data.results[0].urls.full;
            return imgUrl
        }
    })
}

//#endregion



// ------------ ניסוים------------



function getTokons2() {
    $.get({
        method: "post",
        url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
        headers: { "Authorization: Bearer B1uK7IaUyN44sFc2xm8oYUvPFcJa" },
        data: "Authorization: Bearer fZOO7SZ6YZkuGjFxgNeUrRD2VQjx",
        success: function (result) {
            if (result) {
                console.log(result);
            }
        }
    });

}













// ---------------- פונקציות לא גמורות -------------
function CreataOrder() {
    
}

$(".roadelSurface").hide();

// function validaProperform() {
//     ELMENT.$FROM_EL.on('change', function (event) {
//         // const form = event.target
//         const checkIn = event.target.checkIn.value
//         const city = event.target.city.value
//         const checkOut = event.target.checkOut.value
//         console.log(checkIn);
//         console.log(city);
//         console.log(checkOut);
//         if (city || checkIn || checkOut) {
//             // changeButActive()
//             console.log('yesss');
//         }
//     })
// }








