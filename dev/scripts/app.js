const app = {}

app.getTime = () => {
    // creating an object with the time details
    const time = new Date;

    // creating a seconds variable
    // converting the variable into degrees
    const seconds = time.getSeconds();
    const secondsDegrees = seconds * 6 - 90;

    // the rotation of the seconds hall will correspond to the secondsDegrees variable
    $('.seconds').css({transform: `rotate(${secondsDegrees}deg`})

    // eliminating transition animation when seconds hits 12
    if (secondsDegrees === -90) {
        $('.seconds').css({ transition: `all 0s` })
    }
    else if (secondsDegrees !== -90) {
        $('.seconds').css({ transition: `all 0.3s`, 'transition-timing-function': `cubic-bezier(0.1, 2.7, 0.58, 1)` })
    }

    // creating a minutes variable
    // converting the variable into degrees
    const minutes = time.getMinutes();
    const minutesDegrees = minutes * 6 - 90;
    
    // the rotation of the seconds hall will correspond to the secondsDegrees variable
    $('.minutes').css({ transform: `rotate(${minutesDegrees}deg` })

    // creating an hours variable
    let hours = time.getHours();
    
    // accounting for military time
    if (hours > 12) {
        hours = hours - 12;
    }

    // a variable that accounts for the added minutes in an hour
    const hoursMinutesDegrees = minutes * 6 / 12
    
    // an hours variable
    const hoursDegrees = hours * 30 - 90 + hoursMinutesDegrees;

    // the rotation of the seconds hall will correspond to the secondsDegrees variable
    $('.hours').css({ transform: `rotate(${hoursDegrees}deg` })

    
    const animationStartTime = (hoursDegrees + 90) / 360 * 86400;
    
    // set starting % to that number
    // 86 400 seconds in a day
    // $('body').css({animation: `sunset 86400s linear -${animationStartTime}s infinite`})

}

app.init = () => {
    setInterval(app.getTime, 1000);
}

$(document).ready(() => {
    app.init();
})