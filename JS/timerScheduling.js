const buttons = document.querySelectorAll('[data-time]');
const input = document.minuteInputForm;
const timerDisplay = document.querySelector('.timerDisplay');
const returnTime = document.querySelector('.returnTime');
let controlTimer;

function setTimer(seconds){
    clearInterval(controlTimer);
    seconds = parseInt(seconds);
    endTime(seconds);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    controlTimer = setInterval(()=>{
        if(seconds < 0 && minutes > 0){
            seconds = 59;
            minutes--;
        }
        else if(seconds === 0 && minutes === 0){
            clearInterval(controlTimer);
        }
        timerDisplay.textContent = `${minutes}:${seconds >= 10 ? seconds : '0'+seconds}`;
        seconds--;
    },1000)
}

input.addEventListener('submit',handleSubmit);
buttons.forEach(button => button.addEventListener('click',handleClick));

function endTime(seconds){
    let endDate = Date.now();
    let yo = endDate + seconds * 1000;
    let yo1 = new Date(yo);
    const hours = yo1.getHours();
    const minutes = yo1.getMinutes();
    returnTime.textContent = `${hours}:${minutes >= 10 ? minutes : '0'+minutes}`;
}

function handleClick(e) {
    setTimer(parseInt(this.dataset.time));
}

function handleSubmit(e){
    e.preventDefault();
    setTimer(this.children[0].value);
    this.reset();
}