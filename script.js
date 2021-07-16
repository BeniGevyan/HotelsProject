const ELEMENTS = {
    $FROM_EL: $('#orderForm'),
    $DIV_CONTAINER: $('#result'),
    $ORDER: $('#contact_form'),
}

const order = [];

start();



//#region Initial Loading Methods

function start() {
    
    getJsonFile()
    setMinimumTime('checkIn', new Date());
    validationMinimumRange();
    addEvent();
    // validateProprietyForm()

}

function getJsonFile() {
    $.getJSON("test.json", function (data) {
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
 console.log(hotel);
    ELEMENTS.$DIV_CONTAINER.append(`
     
    <div class="HotelDetails d-flex flex-row">
    <div class="foto p2">
        <img src=${imgs('hotel')} alt="" class="hotelImg">
    </div>
    <div class="text p2">

        <div class="bodyOfContent">
            <h1>${hotel.nema}</h1>
            <div>
            ${creatStars(hotel.rating)}
            </div>
                  
        </div>

        <div class="endOfContent">
            <p>${hotel.description_hotel}</p>
        </div>
        <div class="ContentHead d-flex flex-row">
            <div class="p2">
                <p>${hotel.price1},${hotel.price2}</p>
                <p>readily available
                    Not available
                    ${hotel.description_room}</p>
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
        event.preventDefault();
        $(".roaderSurface").css("display", "block");
        getTokens();
        const form = event.target
        const data = {
            city: form.city.value,
            checkIn: form.checkIn.value,
            checkOut: form.checkOut.value,
        }
        getHotelsJsonFile()
        form.reset();

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

function getTokens() {
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



const modal = document.getElementById("myModal");

const btn = document.getElementById("myBtn");

const span = document.getElementsByClassName("close")[0];





// function getTokens2() {
//     $.get({
//         method: "post",
//         url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
//         headers: { "Authorization: Bearer B1uK7IaUyN44sFc2xm8oYUvPFcJa" },
//         data: "Authorization: Bearer fZOO7SZ6YZkuGjFxgNeUrRD2VQjx",
//         success: function (result) {
//             if (result) {
//                 console.log(result);
//                 $(".roaderSurface").hide;

//             }
//         }
//     });

// }


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
function CreatOrder(x) {
    modal.style.display = "block";
    ELEMENTS.$ORDER.on("submit", function (event) {
        event.preventDefault();
        const form = event.target
        const data = {

        }


    });




    span.onclick = function () {
        modal.style.display = "none";
        saveToLocalStorage(key, value)
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            saveToLocalStorage(key, value)
        }
    }


}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}



const HOTELS = []

function getHotelsJsonFile() {


    $.getJSON("hotel.json", function (hotels) {
        Object.entries(hotels.data).forEach(n => hotelObjet(n));
        HOTELS.forEach(creatingHotels);
        $(".roaderSurface").css("display", "none");
    }).fail(function () {
        console.log("An error has occurred.");
    });
    
   
}


function hotelObjet(hotel) {

    const hotels = {
        'nema': hotel[1].hotel.hotelId,
        'rating':  hotel[1].hotel.rating,
        'description_hotel':  hotel[1].hotel.description.text,
        'price1': hotel[1].offers[0].price.currency,
        'price2': hotel[1].offers[0].price.total,
        'description_room': hotel[1].offers[0].room.description.text 
    }
    HOTELS.push(hotels);

}








