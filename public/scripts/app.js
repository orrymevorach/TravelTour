'use strict';

var app = {};

app.clock = function () {

    // creating an object with the time details
    var time = new Date();

    // creating a seconds variable
    // converting the variable into degrees
    var seconds = time.getSeconds();

    var secondsDegrees = seconds * 6 - 90;

    // the rotation of the seconds hall will correspond to the secondsDegrees variable
    $('.seconds').css({ transform: 'rotate(' + secondsDegrees + 'deg' });

    // eliminating transition animation when seconds hits 12
    if (secondsDegrees === -90) {
        $('.seconds').css({ transition: 'all 0s' });
    } else if (secondsDegrees !== -90) {
        $('.seconds').css({ transition: 'all 0.3s', 'transition-timing-function': 'cubic-bezier(0.1, 2.7, 0.58, 1)' });
    }

    // creating a minutes variable
    // converting the variable into degrees
    var minutes = time.getMinutes();
    var minutesDegrees = minutes * 6 - 90;

    // the rotation of the seconds hall will correspond to the secondsDegrees variable
    $('.minutes').css({ transform: 'rotate(' + minutesDegrees + 'deg' });

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

    // an hours variable
    var hoursDegrees = twelveHours * 30 - 90 + hoursPlusMinutesDegrees;

    // the rotation of the seconds hand will correspond to the secondsDegrees variable
    $('.hours').css({ transform: 'rotate(' + hoursDegrees + 'deg' });
};

app.skyAnimation = function () {

    var time = new Date();
    var minutes = time.getMinutes();
    // let hours = time.getHours(); 

    var minutesPerentage = minutes / 60;

    // hours = hours + minutesPerentage

    var hours = 20.9;

    var sunriseStartingPoint = hours * 60 * 60 - 5 * 60 * 60;
    var daylightStartingPoint = hours * 60 * 60 - 7 * 60 * 60;
    var sunsetStartingPoint = hours * 60 * 60 - 19 * 60 * 60;

    if (hours >= 21 || hours <= 4) {
        $('body').css({ 'background-color': '#171b5d', 'animation': 'none' });
    } else if (hours >= 5 && hours < 7) {
        // 2 hours
        $('body').css({ animation: 'sunrise 7200s linear -' + sunriseStartingPoint + 's infinite' });
    } else if (hours >= 7 && hours < 19) {
        // 13 hours
        $('body').css({ animation: 'daylight 46800s linear -' + daylightStartingPoint + 's infinite' });
    } else if (hours >= 19 < 21) {
        // 2 hours
        $('body').css({ animation: 'sunset 10800s linear -' + sunsetStartingPoint + 's infinite' });
    }
    console.log(hours);
};

app.init = function () {
    app.clock();
    app.skyAnimation();
    setInterval(app.clock, 1000);
    setInterval(app.skyAnimation, 300000);
};

$(document).ready(function () {
    app.init();
});