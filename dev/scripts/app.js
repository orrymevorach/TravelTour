const app = {}

app.clock = () => {
    
    // creating an object with the time details
    const time = new Date;
    
    // creating a seconds variable
    // converting the variable into degrees
    const seconds = time.getSeconds();
    
    const secondsInDegrees = seconds * 6 - 90;

    // the rotation of the seconds hall will correspond to the secondsDegrees variable
    $('.seconds').css({transform: `rotate(${secondsInDegrees}deg`})

    // eliminating transition animation when seconds hits 12
    if (secondsInDegrees === -90) {
        $('.seconds').css({ transition: `all 0s` })
    }
    else if (secondsInDegrees !== -90) {
        $('.seconds').css({ transition: `all 0.3s`, 'transition-timing-function': `cubic-bezier(0.1, 2.7, 0.58, 1)` })
    }

    // creating a minutes variable
    // converting the variable into degrees
    const minutes = time.getMinutes();
    const minutesInDegrees = minutes * 6 - 90;
    
    // the rotation of the seconds hall will correspond to the secondsDegrees variable
    $('.minutes').css({ transform: `rotate(${minutesInDegrees}deg` })

    // creating an hours variable
    let twentyFourHours = time.getHours(); // minutes in 24Hour clock
    
    let twelveHours = 0;
    // accounting for military time
    if (twentyFourHours > 12) {
        twelveHours = twentyFourHours - 12;
    }
    else if (twentyFourHours <= 12) {
        twelveHours = twentyFourHours
    }

    // a variable that accounts for the added minutes in an hour
    const hoursPlusMinutesDegrees = minutes * 6 / 12
    
    // hours in degrees
    const hoursInDegrees = twelveHours * 30 - 90 + hoursPlusMinutesDegrees;

    // the rotation of the hours hand will correspond to the hoursInDegrees variable
    $('.hours').css({ transform: `rotate(${hoursInDegrees}deg` })
    
}

app.skyAnimation = () => {

    const time = new Date;
    const minutes = time.getMinutes();
    let hours = time.getHours(); 

    const minutesPerentage = minutes / 60

    hours = hours + minutesPerentage



    
    const sunriseStartingPoint = (hours * 60 * 60) - (5 * 60 * 60);
    const daylightStartingPoint = (hours * 60 * 60) - (7 * 60 * 60); 
    const sunsetStartingPoint = (hours * 60 * 60) - (19 * 60 * 60);


    if (hours >= 21 || hours <= 4) {
        // 8 hours
        $('body').css({ 'background-color': `#171b5d`, 'animation': 'none' })
    }
    else if (hours >= 5 && hours < 7) {
        // 2 hours
        $('body').css({animation: `sunrise 7200s linear -${sunriseStartingPoint}s infinite`})
    }
    else if (hours >= 7 && hours < 19) {
        // 12 hours
        $('body').css({ animation: `daylight 43200s linear -${daylightStartingPoint}s infinite` })
    }
    else if (hours >= 19 < 21) {
        // 2 hours
        $('body').css({ animation: `sunset 7200s linear -${sunsetStartingPoint}s infinite` })
    }
    console.log(hours)
    
    
}

app.init = () => {
    app.clock();
    app.skyAnimation();
    setInterval(app.clock, 1000);
    setInterval(app.skyAnimation, 300000)
}

$(document).ready(() => {
    app.init();
})