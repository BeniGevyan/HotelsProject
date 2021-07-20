const Authorization_Url = "https://test.api.amadeus.com/v1/security/oauth2/token";
const HotelApiBaseUrl = "https://test.api.amadeus.com";
const bookingsUrl = 'https://test.api.amadeus.com/v1/booking/hotel-bookings'
const ImagesApiBaseUrl = "https://source.unsplash.com/800x450/?hotel&id=";
const API_Keys = {
    "grant_type": 'client_credentials',
    "client_id": '6NvSjIcGLPFLt7eW4IGHmdJuV2AUfY8O',
    "client_secret": 'AI5zIvWHnSvdXBcO'
};
const orderHistory = []

let offerId = '';

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
    // addevent()
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
        <a href="https://www.google.com/maps/place/${hotel.city}${hotel.address}"
          target="_blank">${hotel.city}${hotel.address}</a>

      </div>
      <div>
        ${creatStars(hotel.rating)}
      </div>

    </div>

    <div class="endOfContent">
      ${hotel.description_hotel}
    </div>
    <div class="ContentHead d-flex flex-column">
      <div class="p2">
        <p>${hotel.price1},${hotel.price2}</p>
        <p> ${hotel.description_room}</p>
      </div>
      <div class="p2 d-flex flex-row">
        <div>
        
          <select class="p2">
          ${hotel.Default}
            ${hotel.options}
          </select>
        </div>
        <div class="btnRoom p2">
          
          <button type="submit" class="roomOrder btn btn-success"
           onclick=CreatOrder(  )>order</button>
        </div>
      </div>

    </div>

  </div>

</div>
` )


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
        $("#loaderModal").css("display", "block");
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
function closLoadr() {

    $("#loaderModal").css("display", "none");
    $(".roaderSurface").css("display", "none");
}

function findHotelsOffers(cityCode, checkInDate, checkOutDate) {
    const reqParams = {
        cityCode,
        checkInDate,
        checkOutDate,
    };
    const errorNumber = 0;
    // console.log(`${HotelApiBaseUrl}/v2/shopping/hotel-offers?${joinObjectKeysAndValues(reqParams)}`);
    $.get({
        method: "GET",
        url: `${HotelApiBaseUrl}/v2/shopping/hotel-offers?${joinObjectKeysAndValues(reqParams)}`,
        headers: {
            'Authorization': `Bearer ${getApiBearer()}`
        },
        success: (result) => {
            closLoadr()
            if (result.data.length === 0) {
                errorNumber = 1
            } else {
                Object.entries(result.data).forEach(n => hotelObjet(n));
                HOTELS.forEach(creatingHotels);
            }
        },
        error: () => {
            errorNumber = 2

        },
        complete: () => {

            if (errorNumber === 1) {

            }

            if (errorNumber === 2) {

            }
        },
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


function CreatOrder() {
    modal.css('display', "block")
    loadAllLocalStorageItems()
    ELEMENTS.$ORDER.on("submit", function (event) {
        event.preventDefault();
        const form = event.target
        const data = {

        }


    });
}

btn.on('click', () => {
    modal.css('display', "none");

    saveCustomerDetailsToLocal()

})

$(window).on('click', function (event) {
    const targetE = event.target

    if (targetE != ' div#myModal.modal') {

        modal.css('display', "none");

        saveCustomerDetailsToLocal()
    }
})



// window.onclick = function (event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//         saveToLocalStorage(key, value)
//     }
// }
function loadAllLocalStorageItems() {

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        $(`#${key}`).text(`${value}`);
    }
};

function saveCustomerDetailsToLocal() {
    const first_name = $('#first_name').val()
    const last_name = $('#last_name').val()
    const email = $('#email').val()
    const contact_no = $('#contact_no').val()

    let customerDetails = {
        ' first_name': first_name,
        'last_name': last_name,
        'email': email,
        'contact_no': contact_no
    }
    for (let [key, value] of Object.entries(customerDetails)) {
        saveToLocalStorage(key, value)
    }
}

function orderViewCompleted(Country, orderNem) {
    const order = {
        'Country': Country,
        'orderNem': orderNem
    }
    orderHistory.push(order)

    ELEMENTS.$DIV_CONTAINER.empty();
    saveToLocalStorage(Country, orderNem)
    ELEMENTS.$DIV_CONTAINER.append(`

    <div class="orderViewCompleted">
<p class="order">
    We are pleased to announce that the order has been successfully completed, the order number is ${orderNem}
</p>`)

}

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
        'Default': Default(hotel[1].offers[0]),
        'options': options(hotel[1].offers[0].price.variations.changes),
        'description_room': hotel[1].offers[0].room.description.text,
        'code': hotel[1].offers[0].id,
        "checkInDate": hotel[1].offers[0].checkInDate,
        "checkOutDate": hotel[1].offers[0].checkOutDate,
    }
    HOTELS.push(hotels);

}
function Default(params) {
    return `<option value="" selected >startDate: "${params.checkInDate}", endDate: "${params.checkOutDate}", total: "${params.price.total}"</option>`
}
function options(option) {
    let rooms = '';
    if (option.length > 1) {
        for (let i = 0; i < option.length; i++) {
            rooms += `<option value="">startDate: "${option[i].startDate}", endDate: "${option[i].endDate}", total: "${option[i].total}"</option>`
        }
    } else {
        rooms = `<option value="">startDate: "${option[0].startDate}", endDate: "${option[0].endDate}", total: "${option[0].total}"</option>`;
    }
    return rooms
}

// // ---------------------------/



// function addevent() {
//     $('#formcontainer').on("submit", function (event) {
//         console.log('1111111');

//         event.preventDefault();
//         const form = event.target
//         const data = {
//             first_name: form.first_name.value,
//             last_name: form.last_name.value,
//             email: form.email.value,
//             contact_no: form.contact_no.value,
//         }
//         validData(data)

//     });
// }

// function validData(data) {
//     if (ValidaName(data.first_name) && ValidaName(data.last_name) && ValidateEmail(data.email) && phonenumber(data.contact_no)) {
//         $('#formcontainer').addClass('was-validated')

//     }

// }
// function ValidaName(name) {
//     const clinSpace = name.trim();
//     if (!clinSpace) {
//         return false;
//     } else {

//         return true;
//     }

// }

// function ValidateEmail(mail) {
//     if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail.value)) {
//         return (true)
//     } else {

//         return false;
//     }


// }
// function phonenumber(inputphon) {
//     const phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
//     if ((inputphon.value.match(phone))) {
//         return true;
//     } else {

//         return false;
//     }
// }



// $.post({
//     method: "POST",
//     url: `${HotelApiBaseUrl}/v2/shopping/hotel-offers?${joinObjectKeysAndValues(reqParams)}`,
//     headers: {
//         'Authorization': `Bearer ${getApiBearer()}`
//     }


//     ,
//     complete: () => {

//     },
//     success: (result) => {

//     },
//     error: () => {

//     },

// });