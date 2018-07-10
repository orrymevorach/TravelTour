'use strict';

require('babel-polyfill');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var unique = require('uniq');

var data = [1, 2, 2, 3, 4, 5, 5, 5, 6];

console.log(unique(data));

var app = {};

app.getWeather = function () {
    var API_KEY = 'f5e0f0300e91b6e2ab30cc5258ccebbb';
    var TORONTO_ID = '6167865';

    return $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/forecast?id=' + TORONTO_ID + '&APPID=' + API_KEY,
        dataType: 'jsonp',
        method: 'GET'
    }).then(function (res) {

        app.displayWeather(res.list[0]);

        // console.log(results.list)

        // let i = '';

        // for (i = 0; i < results.list.length; i++) {
        // console.log(results.list[i])
        // }

        // rain and lightning animations

        // if (rain = true errr... wtvr) {}
        // $('.rain-image').css({display: 'block'})

    });
};

app.displayWeather = function (results) {

    // let currentTempInKelvin = results.list[0].main.temp;
    // let currentTempInCelsius = Math.round(currentTempInKelvin - 273.15);
    // $('.temperature').html(currentTempInCelsius)

    console.log(results);

    // const conditions = results.list[0].weather[0].description
    // $('.conditions').html(conditions)

    // const iconID = results.list[0].weather[0].icon
    // $('.conditions-icon').html(`<img src=http://openweathermap.org/img/w/${iconID}.png>`)

    // const humidity = results.list[0].main.humidity
    // $('.humidity').html(`${humidity}%`)

    // const windSpeed = results.list[0].wind.speed
    // let windDirection = results.list[0].wind.deg
    // if (windDirection === 0) {
    //     windDirection = 'N'
    // }
    // else if (windDirection > 0 && windDirection < 90) {
    //     windDirection = 'NE'
    // }
    // else if (windDirection === 90) {
    //     windDirection = 'E'
    // }
    // else if (windDirection > 90 && windDirection < 180) {
    //     windDirection = 'SE'
    // }
    // else if (windDirection === 180) {
    //     windDirection = 'S'
    // }
    // else if (windDirection > 180 && windDirection < 270) {
    //     windDirection = 'SW'
    // }
    // else if (windDirection === 270) {
    //     windDirection = 'W'
    // }
    // else if (windDirection > 270 && windDirection < 360) {
    //     windDirection = 'NW'
    // }
    // $('.wind').html(`<p>${windSpeed}<span class="km-h"> km/h</span> ${windDirection}</p>`)

    // const rain = results.list[0].rain
    // // console.log(rain)


    // // START OF MESSY CODE
    // let time = new Date;
    // let minutes = time.getMinutes();
    // let hours = time.getHours();

    // if (hours >= 20 || hours <= 4 && rain === undefined) {
    //     $('.rain').html('No Rain Tonight!')
    // }
    // else if (hours >= 5 && hours <= 19) {
    //     $('.rain').html('No Rain Currently!')
    // }

    // $('#submit').on('submit', function (e) {
    //     e.preventDefault();
    //     let newValue = $('#rangeValue').val();
    //     console.log(newValue);
    //     hours = newValue;
    //     app.skyAnimation(hours);
    // })    


    // $('#reset').on('click', function() {
    //     $('.rain-image').css({ display: 'none'})
    //     let time = new Date;
    //     let minutes = time.getMinutes();
    //     let hours = time.getHours();
    //     let minutesPerentage = minutes / 60 ;
    //     hours = hours + minutesPerentage;
    //     app.skyAnimation(hours)
    //     console.log('reset')
    // })

    // $('#rain-checkbox').on('change', function() {
    //     $('.rain-image').toggle({display: 'block'})
    // })
};

app.clock = function () {

    // creating an object with the time details
    var time = new Date();

    // creating a seconds variable
    // converting the variable into degrees
    var seconds = time.getSeconds();

    var secondsInDegrees = seconds * 6 - 90;

    // the rotation of the seconds hall will correspond to the secondsDegrees variable
    $('.seconds').css({ transform: 'rotate(' + secondsInDegrees + 'deg' });

    // eliminating transition animation when seconds hits 12
    if (secondsInDegrees === -90) {
        $('.seconds').css({ transition: 'all 0s' });
    } else if (secondsInDegrees !== -90) {
        $('.seconds').css({ transition: 'all 0.3s', 'transition-timing-function': 'cubic-bezier(0.1, 2.7, 0.58, 1)' });
    }

    // creating a minutes variable
    // converting the variable into degrees
    var minutes = time.getMinutes();
    var minutesInDegrees = minutes * 6 - 90;

    // the rotation of the seconds hall will correspond to the secondsDegrees variable
    $('.minutes').css({ transform: 'rotate(' + minutesInDegrees + 'deg' });

    // creating an hours variable
    var twentyFourHours = time.getHours(); // minutes in 24Hour clock

    var twelveHours = 0;
    // accounting for military time
    if (twentyFourHours > 12) {
        twelveHours = twentyFourHours - 12;
    } else if (twentyFourHours <= 12) {
        twelveHours = twentyFourHours;
    }

    // a variable that accounts for the added minutes in an hour
    var hoursPlusMinutesDegrees = minutes * 6 / 12;

    // hours in degrees
    var hoursInDegrees = twelveHours * 30 - 90 + hoursPlusMinutesDegrees;

    // the rotation of the hours hand will correspond to the hoursInDegrees variable
    $('.hours').css({ transform: 'rotate(' + hoursInDegrees + 'deg' });
};

app.skyAnimation = function (hoursFunction) {

    var time = new Date();
    var minutes = time.getMinutes();
    var hours = time.getHours();

    var minutesPerentage = minutes / 60;

    hours = hours + minutesPerentage;
    hours = hoursFunction;

    var sunriseStartingPoint = hours * 60 * 60 - 5 * 60 * 60;
    var daylightStartingPoint = hours * 60 * 60 - 7 * 60 * 60;
    var sunsetStartingPoint = hours * 60 * 60 - 20 * 60 * 60;

    if (hours >= 21.75 || hours <= 4) {
        // 8 hours
        $('body').css({ 'background-color': '#171b5d', 'animation': 'none' });
    } else if (hours >= 5 && hours < 7) {
        // 2 hours
        $('body').css({ animation: 'sunrise 7200s linear -' + sunriseStartingPoint + 's infinite' });
    } else if (hours >= 7 && hours < 20) {
        // 13 hours
        $('body').css({ animation: 'daylight 46800s linear -' + daylightStartingPoint + 's infinite' });
        // $('.weather-container').css({ 'background-color': `rgba(15, 168, 189, 0.2)` })
        $('.weather-container').css({ 'background': 'linear-gradient(to bottom, transparent, rgba(15, 168, 189, 0.1), transparent' });
    } else if (hours >= 20 < 21.75) {
        // 1 hours
        $('body').css({ animation: 'sunset 6300s linear -' + sunsetStartingPoint + 's infinite' });
    }
    // console.log(hours)
};

app.init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var todaysWeather;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return app.getWeather();

                case 2:
                    todaysWeather = _context.sent;

                    app.clock();
                    app.getWeather();
                    app.displayWeather();
                    app.skyAnimation();
                    setInterval(app.clock, 1000);
                    setInterval(app.getWeather, 300000);

                case 9:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
}));

$(document).ready(function () {
    app.init();
});