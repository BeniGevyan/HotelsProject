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
    validaProperform()
    addEvent();

}

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
        checkingTheDateRange()
        if (date) {
            $('#checkOut').removeAttr('disabled');
            const newDay = new Date(`${date}`);
            newDay.setDate(newDay.getDate() + 1);
            timeValidation('checkOut', newDay)
        }
    })

}

function checkingTheDateRange() {
    const checkIn = $('#checkIn').val()
    const checkOut = $('#checkOut').val()

    if (new Date(`${checkIn}`) > new Date(`${checkOut}`)) {
        $('#checkOut').val('');
    }
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


function validaProperform() {
    ELMENT.$FROM_EL.on('change', function (event) {
        // const form = event.target
        const checkIn = event.target.checkIn.value
        const city = event.target.city.value
        const checkOut = event.target.checkOut.value
        console.log(checkIn);
        console.log(city);
        console.log(checkOut);
        if (city || checkIn || checkOut) {
            // startBtn()
            console.log('yesss');
        }
    })
}

function newelment(hotel) {

    ELMENT.$DIV_CONTENER.append(`
     
    <div class="HotelDetails d-flex flex-row">
    <div class="poto p2">
        <img src="IMEG/237729537.jpg" alt="" class="hotelImg">
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

</div>

            ` )

}

function CreatingHotel(hotel) {
    hotel.data.forEach(newelment);
}

function creatStars(nmuber) {
    const stars = `<span>&#11088;</span>`
    let allStar = ``
    for (let i = 0; i <= nmuber; i++) {
        allStar += stars;

    }
    return allStar;
}

const malon = {
    "data": [
        {
            "type": "hotel-offers",
            "hotel": {
                "type": "hotel",
                "hotelId": "HIPARC12",
                "chainCode": "HI",
                "dupeId": "700132326",
                "name": "HOLIDAY INN PARIS-NOTRE DAME123",
                "rating": "3",
                "cityCode": "PAR",
                "latitude": 48.85254,
                "longitude": 2.34198,
                "hotelDistance": {
                    "distance": 0.3,
                    "distanceUnit": "KM"
                },
                "address": {
                    "lines": [
                        "4 RUE DANTON"
                    ],
                    "postalCode": "75006",
                    "cityName": "PARIS",
                    "countryCode": "FR"
                },
                "contact": {
                    "phone": "+33 1 81690060",
                    "fax": "+33 1 81690061"
                },
                "description": {
                    "lang": "en",
                    "text": "This boutique style eco hotel is in the heart of Paris 5 minutes walk from Notre Dame Cathedral and a short stroll from the Louvre museum. Regular RER trains run to Paris Charles de Gaulle Airport and Paris Orly Airport in 30 minutes. It is a 5 minute walk to Saint Michel Notre Dame Metro station for links to company offices on Avenue de France and events at Paris Nord Villepinte Exhibition and Convention Centre. There are 3 air conditioned meeting rooms with wireless Internet which can accommodate up to 55 of your colleagues. You can round off your meeting with cocktails on the roof terrace with panoramic views of Paris. Internet is available 24 hours a day on the 2 computers in the Lobby and there is high speed Internet in all Guest rooms."
                },
                "amenities": [
                    "24_HOUR_FRONT_DESK",
                    "24_HOUR_ROOM_SERVICE",
                    "ATM/CASH_MACHINE",
                    "CONFERENCE_FACILITIES",
                    "EXCHANGE_FACILITIES",
                    "EXPRESS_CHECK_IN",
                    "EXPRESS_CHECK_OUT",
                    "ACCESSIBLE_FACILITIES",
                    "WHEELCHAIR_ACCESSIBLE_PUBLIC_AREA",
                    "WHEELCHAIR_ACCESSIBLE_ELEVATORS",
                    "WHEELCHAIR_ACCESSIBLE_ROOM",
                    "GARAGE_PARKING",
                    "LAUNDRY_SERVICE",
                    "RESTAURANT",
                    "SAFE_DEPOSIT_BOX",
                    "DRY_CLEANING",
                    "FRONT_DESK",
                    "WIRELESS_CONNECTIVITY",
                    "HIGH_SPEED_WIRELESS",
                    "FEMA_FIRE_SAFETY_COMPLIANT",
                    "PHOTOCOPIER",
                    "PRINTER",
                    "AUDIO-VISUAL_EQUIPMENT",
                    "BUSINESS_CENTER",
                    "COMPUTER_RENTAL",
                    "LCD/PROJECTOR",
                    "CONFERENCE_SUITE",
                    "CONVENTION_CENTRE",
                    "MEETING_FACILITIES",
                    "FIRE_SAFETY",
                    "EMERGENCY_LIGHTING",
                    "FIRE_DETECTORS",
                    "SPRINKLERS",
                    "FIRST_AID_STAF",
                    "SECURITY_GUARD",
                    "VIDEO_SURVEILANCE",
                    "EXTINGUISHERS",
                    "FEMA_FIRE_SAFETY_COMPLIANT"
                ],
                "media": [
                    {
                        "uri": "http://uat.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/39A9137DCEC149B59898A0598BE2C76A",
                        "category": "EXTERIOR"
                    }
                ]
            },
            "available": true,
            "offers": [
                {
                    "id": "0SE8NVG1AQ",
                    "checkInDate": "2021-07-08",
                    "checkOutDate": "2021-07-09",
                    "rateCode": "22A",
                    "rateFamilyEstimated": {
                        "code": "BAR",
                        "type": "P"
                    },
                    "room": {
                        "type": "*RH",
                        "typeEstimated": {
                            "category": "STANDARD_ROOM"
                        },
                        "description": {
                            "text": "BEST FLEXIBLE RATE\nSTANDARD ROOM NONSMOKING RELAX IN A\nCONTEMPORARY DESIGNED ROOM. WE WILL DO OUR BEST"
                        }
                    },
                    "guests": {
                        "adults": 2
                    },
                    "price": {
                        "currency": "EUR",
                        "base": "289.00",
                        "total": "294.76",
                        "variations": {
                            "average": {
                                "base": "289.00"
                            },
                            "changes": [
                                {
                                    "startDate": "2021-07-08",
                                    "endDate": "2021-07-09",
                                    "base": "289.00"
                                }
                            ]
                        }
                    },
                    "policies": {
                        "holdTime": {
                            "deadline": "2021-07-08T16:00:00"
                        },
                        "guarantee": {
                            "acceptedPayments": {
                                "creditCards": [
                                    "AX",
                                    "VI",
                                    "CA"
                                ],
                                "methods": [
                                    "CREDIT_CARD"
                                ]
                            }
                        },
                        "paymentType": "guarantee",
                        "cancellation": {
                            "numberOfNights": 1,
                            "deadline": "2021-07-08T16:00:00+02:00"
                        }
                    },
                    "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/0SE8NVG1AQ"
                }
            ],
            "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=HIPARC12&adults=2&paymentPolicy=NONE&roomQuantity=1&view=FULL"
        },
        {
            "type": "hotel-offers",
            "hotel": {
                "type": "hotel",
                "hotelId": "RTPARNOV",
                "chainCode": "RT",
                "dupeId": "700010549",
                "name": "Novotel Paris les Halles",
                "rating": "4",
                "cityCode": "PAR",
                "latitude": 48.86053,
                "longitude": 2.34653,
                "hotelDistance": {
                    "distance": 0.7,
                    "distanceUnit": "KM"
                },
                "address": {
                    "lines": [
                        "8 PLACE MARGUERITE DE NAVARRE"
                    ],
                    "postalCode": "75001",
                    "cityName": "PARIS",
                    "countryCode": "FR"
                },
                "contact": {
                    "phone": "33/1/42213131",
                    "fax": "33/1/40260579",
                    "email": "H0785@accor.com"
                },
                "description": {
                    "lang": "en",
                    "text": "The 4-star Novotel Paris les Halles is located in the historical center of Paris. It is close to 5 metro lines and 3 RER lines, as well as several tourist attractions such as the Louvre, Notre Dame, the Marais district, the Eiffel Tower and Disneyland® Paris. The Novotel Paris les Halles offers air-conditioned rooms, free WIFI, restaurant, patio, bar, fitness room and 8 meeting rooms. It is ideal for vacations as a couple, family trips, or business travel."
                },
                "amenities": [
                    "ELEVATOR",
                    "ROOM_SERVICE",
                    "PARKING",
                    "INTERNET_SERVICES",
                    "220_AC",
                    "PETS_ALLOWED",
                    "ACCESSIBLE_BATHS",
                    "DISABLED_FACILITIES",
                    "TRANSLATION_SERVICES",
                    "WIRELESS_CONNECTIVITY",
                    "KIDS_WELCOME",
                    "EXCHANGE_FACILITIES",
                    "LOUNGE",
                    "DOCTOR_ON_CALL",
                    "CHILDRENS_PLAY_AREA",
                    "24_HOUR_FRONT_DESK",
                    "PORTER/BELLBOY",
                    "ICE_MACHINES",
                    "SMOKE_DETECTOR",
                    "FIRE_SAFETY",
                    "EMERGENCY_BACKUP_GENERATOR",
                    "FIRE_DETECTORS",
                    "EMERGENCY_LIGHTING",
                    "GARAGE_PARKING",
                    "BABY-SITTING",
                    "MULTILINGUAL_STAFF",
                    "RESTAURANT",
                    "PHOTOCOPIER",
                    "MEETING_FACILITIES",
                    "COMPUTER_RENTAL",
                    "MEETING_ROOMS",
                    "BUSINESS_CENTER",
                    "AUDIO-VISUAL_EQUIPMENT",
                    "HIGH_SPEED_INTERNET_IN_ROOM",
                    "BATH",
                    "CRIBS_AVAILABLE",
                    "ALARM_CLOCK",
                    "SHOWER",
                    "WAKEUP_SERVICE",
                    "WI-FI_IN_ROOM",
                    "DIRECT_DIAL_PHONE",
                    "HAIR_DRYER",
                    "CABLE_TELEVISION",
                    "TELEVISION",
                    "SATELLITE_TV",
                    "AIR_CONDITIONING",
                    "SAFE",
                    "NON_SMOKING_ROOMS"
                ],
                "media": [
                    {
                        "uri": "http://uat.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/BA4D02DA97504F1CA3AE1D7916F1CB8E",
                        "category": "EXTERIOR"
                    }
                ]
            },
            "available": true,
            "offers": [
                {
                    "id": "TMWT9VSQ9R",
                    "checkInDate": "2021-07-08",
                    "checkOutDate": "2021-07-09",
                    "rateCode": "1KD",
                    "rateFamilyEstimated": {
                        "code": "BAR",
                        "type": "P"
                    },
                    "room": {
                        "type": "S1K",
                        "typeEstimated": {
                            "category": "SUITE",
                            "beds": 1,
                            "bedType": "QUEEN"
                        },
                        "description": {
                            "text": "FLEX - RO B2C\nSuperior Suite with one queen size bed and sofa"
                        }
                    },
                    "guests": {
                        "adults": 2
                    },
                    "price": {
                        "currency": "EUR",
                        "total": "335.00",
                        "variations": {
                            "average": {
                                "base": "335.00"
                            },
                            "changes": [
                                {
                                    "startDate": "2021-07-08",
                                    "endDate": "2021-07-09",
                                    "total": "335.00"
                                }
                            ]
                        }
                    },
                    "policies": {
                        "guarantee": {
                            "acceptedPayments": {
                                "creditCards": [
                                    "AX",
                                    "CA",
                                    "DC",
                                    "EC",
                                    "IK",
                                    "JC",
                                    "VI"
                                ],
                                "methods": [
                                    "CREDIT_CARD"
                                ]
                            }
                        },
                        "paymentType": "guarantee",
                        "cancellation": {
                            "deadline": "2021-07-07T00:00:00+02:00"
                        }
                    },
                    "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/TMWT9VSQ9R"
                }
            ],
            "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=RTPARNOV&adults=2&paymentPolicy=NONE&roomQuantity=1&view=FULL"
        },
        {
            "type": "hotel-offers",
            "hotel": {
                "type": "hotel",
                "hotelId": "BRPARVDB",
                "chainCode": "BR",
                "dupeId": "700035209",
                "name": "Renaissance Paris Vendome Hotel",
                "rating": "4",
                "cityCode": "PAR",
                "latitude": 48.86195,
                "longitude": 2.33592,
                "hotelDistance": {
                    "distance": 1.1,
                    "distanceUnit": "KM"
                },
                "address": {
                    "lines": [
                        "4 RUE DE MONT THABOR"
                    ],
                    "postalCode": "75001",
                    "cityName": "PARIS",
                    "countryCode": "FR"
                },
                "contact": {
                    "phone": "+33 1 4020-2000",
                    "fax": "+33 1 4020-2001",
                    "email": "rhi.parvd.reception@renhotels.com"
                },
                "description": {
                    "lang": "en",
                    "text": "Bask in the lavish lifestyle of our boutique hotel in the heart of downtown Paris. Renaissance Paris Vendome Hotel was remodeled in 2018 by the famous designer Didier Gomez. Our hotel is just a few steps away from the vast assortment of world-class boutiques in the shopping district and only one block from Place Vendome. We are also a short distance from the Louvre Museum, the Opera Garnier and the Tuileries Garden. Our trendy hotel features a cutting-edge spa, a fitness center, a heated indoor pool lit by a skylight and a Mediterranean restaurant with a unique, festive ambiance. If you're visiting Paris for a business meeting or a social gathering, plan your event in our sleek, adaptable venues. All of our beautifully appointed hotel rooms feature sophisticated Parisian touches with modern amenities like marble bathrooms, luxury bedding and 24-hour room service. When extra space is needed, upgrade to one of our trendy hotel suites. 5 Star luxury boutique awaits you at Renaissance Paris Vendome Hotel."
                },
                "amenities": [
                    "BREAKFAST_FULL",
                    "SPA",
                    "SAUNA",
                    "EXPRESS_CHECK_OUT",
                    "LOUNGE",
                    "INTERIOR_ROOM_ENTRY",
                    "ACCESSIBLE_FACILITIES",
                    "SERVICE_DOGS_ALLOWED",
                    "DISABLED_ACCESSIBLE_TOILETS",
                    "HANDRAILS_BATHROOM",
                    "CONCIERGE",
                    "SAFE_DEPOSIT_BOX",
                    "EXCHANGE_FACILITIES",
                    "DRY_CLEANING",
                    "LAUNDRY_SERVICE",
                    "FRONT_DESK",
                    "24_HOUR_FRONT_DESK",
                    "FLORIST",
                    "ONSITE_LAUNDRY",
                    "24_HOUR_ROOM_SERVICE",
                    "ROOM_SERVICE",
                    "BEAUTY_PARLOUR",
                    "CAR_RENTAL",
                    "CHILDREN_PROGRAMS",
                    "GYM",
                    "SWIMMING_POOL",
                    "INDOOR_POOL",
                    "RESTAURANT",
                    "HIGH_SPEED_INTERNET",
                    "HIGH_SPEED_WIRELESS",
                    "WIRELESS_CONNECTIVITY",
                    "ELEVATOR",
                    "PRINTER",
                    "PHOTOCOPIER",
                    "BUSINESS_CENTER",
                    "MEETING_FACILITIES",
                    "HIGH_SPEED_INTERNET_IN_ROOM",
                    "WI-FI_IN_ROOM",
                    "NON_SMOKING_ROOMS",
                    "TEA/COFFEE_MAKER",
                    "ALARM_CLOCK",
                    "AIR_CONDITIONING",
                    "SAFE",
                    "BATH",
                    "HAIR_DRYER",
                    "IRON/IRON_BOARD",
                    "CRIBS_AVAILABLE",
                    "ROLLAWAY_BEDS",
                    "OUTLET_ADAPTERS",
                    "TELEVISION",
                    "CABLE_TELEVISION",
                    "MOVIE_CHANNELS",
                    "VOICEMAIL_IN_ROOM",
                    "DIRECT_DIAL_PHONE",
                    "CORDLESS_PHONE",
                    "FITNESS_CENTER",
                    "BOWLING"
                ],
                "media": [
                    {
                        "uri": "http://uat.multimediarepository.testing.amadeus.com/cmr/retrieve/hotel/8C0BFC3265C146DCA4765CAB16755EF4",
                        "category": "EXTERIOR"
                    }
                ]
            },
            "available": true,
            "offers": [
                {
                    "id": "FHDML0HVXX",
                    "checkInDate": "2021-07-08",
                    "checkOutDate": "2021-07-09",
                    "rateCode": "S9R",
                    "rateFamilyEstimated": {
                        "code": "SRS",
                        "type": "C"
                    },
                    "room": {
                        "type": "XMI",
                        "typeEstimated": {
                            "category": "STANDARD_ROOM",
                            "beds": 1,
                            "bedType": "QUEEN"
                        },
                        "description": {
                            "text": "Marriott Senior Discount, includes see Rate Rules\nLa Petite, 1 Queen(s), Bathrooms: 1, Mini fridg\ne, 18sqm/194sqft, Wireless internet, for a fee,"
                        }
                    },
                    "guests": {
                        "adults": 2
                    },
                    "price": {
                        "currency": "EUR",
                        "base": "356.00",
                        "total": "363.50",
                        "variations": {
                            "average": {
                                "base": "356.00"
                            },
                            "changes": [
                                {
                                    "startDate": "2021-07-08",
                                    "endDate": "2021-07-09",
                                    "base": "356.00"
                                }
                            ]
                        }
                    },
                    "policies": {
                        "paymentType": "guarantee",
                        "cancellation": {
                            "deadline": "2021-07-07T23:59:00+02:00"
                        }
                    },
                    "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/FHDML0HVXX"
                }
            ],
            "self": "https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=BRPARVDB&adults=2&paymentPolicy=NONE&roomQuantity=1&view=FULL"
        }
    ],
    "meta": {
        "links": {
            "next": "https://test.api.amadeus.com/v2/shopping/hotel-offers?adults=2&bestRateOnly=true&cityCode=PAR&includeClosed=false&paymentPolicy=NONE&radius=5&radiusUnit=KM&roomQuantity=1&sort=NONE&view=FULL&page[offset]=EGEVL5K8XBDH_100"
        }
    }
}

