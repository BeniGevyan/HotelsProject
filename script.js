const Authorization_Url = "https://test.api.amadeus.com/v1/security/oauth2/token";
const HotelApiBaseUrl = "https://test.api.amadeus.com";
const ImagesApiBaseUrl = "https://source.unsplash.com/800x450/?hotel&id=";
const API_Keys = {
    "grant_type": 'client_credentials',
    "client_id": '6NvSjIcGLPFLt7eW4IGHmdJuV2AUfY8O',
    "client_secret": 'AI5zIvWHnSvdXBcO'
};

const ELEMENTS = {
    $FROM_EL: $('#orderForm'),
    $DIV_CONTAINER: $('#result'),
    $ORDER: $('#contact_form'),
}
let HOTELS = []
const order = [];

start();



//#region Initial Loading Methods

function start() {
    getAccessToken();
    getJsonFile()
    setMinimumTime('checkIn', new Date());
    validationMinimumRange();
    addEvent();
    // validateProprietyForm()

}

function getJsonFile() {
    $.getJSON("./assets/jsons/cities.json", function (data) {
        Object.entries(data).forEach(n => creteListCitys(n));
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

function creteListCitys(params) {
    $('#city').append(
        `
        <option value="${params[1]}">${params[0]}</option>
        `)
}

function creatingHotels(hotel) {
    // const hotelImage = hotelImage; //imgs('hotel');
    // const hotelImage = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixid=MnwyNDYyMTN8MHwxfHNlYXJjaHwxfHxyb29tfGVufDB8fHx8MTYyNjY0MTI4Mw&ixlib=rb-1.2.1'


    ELEMENTS.$DIV_CONTAINER.append(`
     
    <div class="HotelDetails d-flex flex-row">
    <div class="foto p2">
        <img src="assets/images/237729537.jpg" alt="" class="hotelImg">
    </div>
    <div class="text p2">

        <div class="bodyOfContent">
            <div>
            <h1>${hotel.nema}</h1>
            </div>
            <div>
            <a href="https://www.google.com/maps/place/${hotel.city}${hotel.address}" target="_blank">${hotel.city}${hotel.address}</a>

            </div>
            <div>
            ${creatStars(hotel.rating)}
            </div>
                  
        </div>

        <div class="endOfContent">
            ${hotel.description_hotel}
        </div>
        <div class="ContentHead d-flex flex-row">
            <div class="p2">
                <p>${hotel.price1},${hotel.price2}</p>
                <p> ${hotel.description_room}</p>
            </div>
            <div>
  <select class="custom-select"></select>
  ${hotel.options}
  </select>
  </div>
            <div class="p2 btnRoom">
                <button type="submit" class="roomOrder btn btn-success" onclick = CreatOrder()>order</button>
            </div>

        </div>

    </div>

    </div>    ` )
    // אולי צריך להחזיר לכפתור את (id="myBtn")
}

function creatStars(number) {
    const stars = `<span>&#11088;</span>`
    let allStar = ``
    for (let i = 0; i <= number; i++) {
        allStar += stars;
    }
    return allStar;
}

//#endregion  CRUD (Create, Read, Update, Delete) Methods


//#region DOM Manipulation Methods

function addEvent() {
    ELEMENTS.$FROM_EL.on("submit", function (event) {
        HOTELS = []
        ELEMENTS.$DIV_CONTAINER.empty();
        event.preventDefault();
        $(".roaderSurface").css("display", "block");
        const form = event.target
        const data = {
            city: form.city.value,
            checkIn: form.checkIn.value,
            checkOut: form.checkOut.value,
        }
        findHotelsOffers(form.city.value, form.checkIn.value, form.checkOut.value);
        form.reset();

        console.log(data);
    });
}

function setMinimumTime(id, date) {
    $(`#${id}`).attr("min", changeDateFormat(date))
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


//#region Local Storage Methods

function setApiBearer(accessToken) {
    localStorage.setItem('ApiBearer', accessToken);
}

function getApiBearer() {
    return localStorage.getItem('ApiBearer');
}

//#endregion


//#region External api readings

function joinObjectKeysAndValues(objectToJoin) {
    const glue = '=',
        separator = '&';
    return Object.entries(objectToJoin).map((key, value) => key.join(glue)).join(separator);
}

function getAccessToken() {
    $.get({
        method: "post",
        url: Authorization_Url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: joinObjectKeysAndValues(API_Keys),
        success: (result) => {
            if (result) {
                // console.log(result);
                const {
                    access_token, expires_in
                } = result;
                // console.log({ access_token, expires_in });
                setApiBearer(access_token);
            }
        }
    });
}

function imgs(type) {
    const url = `https://api.unsplash.com/search/photos/?query=${type}&page=1&per_page=1&client_id=fxxTEmUpHWL_AY16kZr7CDmk7YQvpZ0hmgnF6kl13Kk`;
    var imgUrl;
    $.get(url, (data) => {
        // console.log(data);
        if (data) {
            imgUrl = data.results[0].urls.full;
            // console.log(imgUrl);
            return imgUrl;
        }
    });
}

function findHotelsOffers(cityCode, checkInDate, checkOutDate) {
    const reqParams = {
        cityCode,
        checkInDate,
        checkOutDate,
    };
    // console.log(`${HotelApiBaseUrl}/v2/shopping/hotel-offers?${joinObjectKeysAndValues(reqParams)}`);
    $.get({
        method: "GET",
        url: `${HotelApiBaseUrl}/v2/shopping/hotel-offers?${joinObjectKeysAndValues(reqParams)}`,
        headers: {
            'Authorization': `Bearer ${getApiBearer()}`
        },
        success: (result) => {
            if (result.data.length) {
                $(".roaderSurface").css("display", "none");

                console.log({
                    result
                });
                // const areAvailableHotels = result.data;
                Object.entries(result.data).forEach(n => hotelObjet(n));
                HOTELS.forEach(creatingHotels);
            }
        }
    });
}

//#endregion




// function validateProprietyForm() {
//     ELEMENTS.$FROM_EL.on('change', function (event) {
//         // const form = event.target
//         let data = {
//             checkIn: event.target.checkIn.value,
//             checkOut: event.target.checkOut.value,
//         }

//         console.log(data.checkIn);
//         console.log(data.checkOut);
//         if (data) {
//             // changeButActive()
//             console.log('yesss');
//         }
//     })
// }




// ---------------- פונקציות לא גמורות -------------


const modal = $("#myModal");

const btn = $(".close");


function CreatOrder(x) {
    modal.css('display', "block")
    ELEMENTS.$ORDER.on("submit", function (event) {
        event.preventDefault();
        const form = event.target
        const data = {

        }


    });
}
btn.on('click', () => {
    modal.css('display', "none");

    saveToLocalStorage(key, value);

})

$(window).on('click', function (event) {
    if (event.target == modal) {
        console.log('yesss');
        modal.css('display', "none");

        saveToLocalStorage(key, value)
    }
})



// window.onclick = function (event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//         saveToLocalStorage(key, value)
//     }
// }




function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}





// function getHotelsJsonFile() {


//     $.getJSON("./assets/jsons/hotel.json", function (hotels) {

//     }).fail(function () {
//         console.log("An error has occurred.");
//     });


// }


function hotelObjet(hotel) {

    let description = ''
    if (hotel[1].hotel.description) {
        description = hotel[1].hotel.description.text
    } else {
        description = 'No description of selected hotel';
    }

    const hotels = {
        'nema': hotel[1].hotel.hotelId,
        'city': hotel[1].hotel.address.cityName,
        'address': hotel[1].hotel.address.lines[0],
        'rating': hotel[1].hotel.rating,
        'description_hotel': description,
        'price1': hotel[1].offers[0].price.currency,
        'price2': hotel[1].offers[0].price.total,
        'options': options(hotel[1].offers[0].price.variations.changes),
        'description_room': hotel[1].offers[0].room.description.text
    }
    HOTELS.push(hotels);

}

function options(option) {
  let  rooms = '';
    if (option.length > 1) {
        for (let i = 0; i <=option.length; i++) {
            rooms += `<option value="">startDate: "${option[i].startDat}", endDate: "${option[i].endDate}", total: "${option[i].total}"</option>`
        }
    } else {
        rooms = `<option value="">startDate: "${option[0].startDat}", endDate: "${option[0].endDate}", total: "${option[0].total}"</option>`;
    }
    return rooms
}






