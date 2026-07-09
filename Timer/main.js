const startBtn = document.querySelector(".start-btn");
const restartBtn = document.querySelector(".restart-btn");
const startBtnText = document.querySelector(".startBtnText")
const timerValue = document.querySelectorAll(".value");
const notiDiv = document.querySelector(".noti-div");
const notiMsg = document.querySelector(".noti-msg");
let isPlaying = false
let timerInterval;
let notiTimeOut;
let scrollTimeOut;

function showNoti(msg){
    clearTimeout(notiTimeOut);
    notiDiv.classList.add("show");
    notiMsg.textContent = msg;
    notiTimeOut = setTimeout(() => {
        notiDiv.classList.remove("show");
    }, 3000);
}

const handleWheel = (e) => {
    e.preventDefault();
    
    const value = e.currentTarget;
    const index = Array.from(timerValue).indexOf(value);

    let currentNum = parseInt(value.textContent, 10);
    const limit = (index===0) ? 23 : 59;

    if (e.deltaY < 0){ /*SCROLL UP*/
        value.textContent = Math.min(currentNum + 1, limit).toString().padStart(2,'0');


    } else if (e.deltaY > 0){ /*SCROLL DOWN*/
        value.textContent = Math.max(currentNum - 1, 0).toString().padStart(2,'0');
    }

    savingTimer();
    clearTimeout(scrollTimeOut);
    scrollTimeOut = setTimeout(() => {
        showNoti("Timer saved.");
    }, 1000);
};

function savingTimer(){
    const data = {
        hour: parseInt(timerValue[0].textContent, 10),
        min: parseInt(timerValue[1].textContent, 10),
        sec: parseInt(timerValue[2].textContent, 10)
    };
    localStorage.setItem("savedTimer", JSON.stringify(data));
}

function allowChange(){
    timerValue.forEach(value => {
        value.addEventListener("wheel", handleWheel, {passive: false});
    });
}

function disableChange(){
    timerValue.forEach(value => {
        value.removeEventListener("wheel", handleWheel);
    });
}

function getTotalSeconds(){
    const h = parseInt(timerValue[0].textContent, 10);
    const m = parseInt(timerValue[1].textContent, 10);
    const s = parseInt(timerValue[2].textContent, 10);

    return (h*3600) + (m*60) + s;
}

function resetTimer(){
    showNoti("Timer restored.");
    allowChange();
    const data = JSON.parse(localStorage.getItem("savedTimer")) || {hour:0, min:0, sec:0};
    timerValue[0].textContent = data.hour.toString().padStart(2,"0");
    timerValue[1].textContent = data.min.toString().padStart(2,"0");
    timerValue[2].textContent = data.sec.toString().padStart(2,"0");
}

function handleTimer(){
    if (isPlaying){
        let totalSeconds = getTotalSeconds();

        timerInterval = setInterval(() => {
            if (totalSeconds <= 0){
                clearInterval(timerInterval);
                isPlaying = false;
                startBtnText.textContent = "play_arrow";
                resetTimer();
                return;
            }
            totalSeconds--;
            timerValue[0].textContent = Math.floor(totalSeconds/3600). toString().padStart(2,"0");
            timerValue[1].textContent = Math.floor((totalSeconds%3600)/60).toString().padStart(2,"0");
            timerValue[2].textContent = (totalSeconds%60).toString().padStart(2,"0");
        }, 1000);

    }else{
        clearInterval(timerInterval);
        allowChange();
    }
}

startBtn.addEventListener("click", () => {
    if (!isPlaying){ /*START THE TIMER*/
        isPlaying = true;
        startBtnText.textContent = "pause"
        disableChange();
        handleTimer();
    }else{          /*PAUSE THE TIMER*/
        isPlaying = false;
        startBtnText.textContent = "play_arrow"
        handleTimer();
        allowChange();
    }
})

restartBtn.addEventListener("click", () => {
    isPlaying = false;
    startBtnText.textContent = "play_arrow"
    clearInterval(timerInterval);
    resetTimer();
})

timerValue.forEach(value => {
    value.addEventListener("click", () => {
        if (isPlaying) return; 

        const input = document.createElement("input");
        input.type = "number";
        input.className = "value-input";
        input.value = value.textContent;

        input.oninput = function(){
            if (this.value.length > 2){
                this.value = this.value.slice(0,2);
            }
        }
        value.parentNode.replaceChild(input, value);
        input.focus();
        input.select();

        const save = () => {
            let num = parseInt(input.value, 10);
            if (isNaN(num)) num = 0;
            
            const index = Array.from(timerValue).indexOf(value);
            const limit = (index === 0) ? 23 : 59;

            let val = Math.min(Math.max(num, 0), limit).toString().padStart(2,'0');

            value.textContent = val;
            input.parentNode.replaceChild(value, input);
            savingTimer();
            showNoti("Timer saved.");
        };

        input.addEventListener("blur", save);
        input.addEventListener("keypress", (e) => { if (e.key === 'Enter') save(); });
    });
});

allowChange();
resetTimer();