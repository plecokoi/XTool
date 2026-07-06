const inputBox = document.querySelector(".input-box");
const speechEngine = window.speechSynthesis;
const playpauseIcon = document.getElementById("playPauseIcon");
let speech = null;
const voiceSelect = document.querySelector(".voice-select");
const settingInput = document.querySelectorAll(".setting-input");
const settingSpan = document.querySelectorAll(".setting-span");
let settingIndex;
let updatedSpeed = 1;
let updatedPitch = 1;
let updatedVolume = 1;
let isPaused;

settingInput.forEach((item) => {
    item.value = 1;
});

function restartSpeech() {
    speechEngine.cancel();
    inputBox.classList.remove("speaking");
    generateSpeech();
    isPaused = false;
}

function clearText() {
    inputBox.value = "";
    speechEngine.cancel();
    inputBox.classList.remove("speaking");
    playpauseIcon.textContent = "play_arrow";
    isPaused = false;
}

function toggleSpeech() {

    if (inputBox.value !== "") {
        if (!speechEngine.speaking) {
            generateSpeech();
            console.log("speaking");
        } else if (isPaused) {
            speechEngine.resume();
            inputBox.classList.add("speaking");
            playpauseIcon.textContent = "pause";
            isPaused = false;
            console.log("resume");
        } else {
            speechEngine.pause();
            inputBox.classList.remove("speaking");
            playpauseIcon.textContent = "play_arrow";
            isPaused = true;
            console.log("pause");
        }
    }

}

const voices = {
    "Microsoft George - English (United Kingdom)": "George",
    "Microsoft Hazel - English (United Kingdom)": "Hazel",
    "Microsoft Susan - English (United Kingdom)": "Susan",
    "Microsoft David - English (United States)": "David",
    "Microsoft Mark - English (United States)": "Mark",
    "Microsoft Zira - English (United States)": "Zira",
    "Microsoft Huihui - Chinese (Simplified, PRC)": "Huihui",
    "Microsoft Kangkang - Chinese (Simplified, PRC)": "Kangkang",
    "Microsoft Yaoyao - Chinese (Simplified, PRC)": "Yaoyao",
    "Google Deutsch": "Google Deutsch",
    "Google US English": "Google US English",
    "Google UK English Female": "Google UK English Female",
    "Google UK English Male": "Google UK English Male",
    "Google español": "Google Spanish",
    "Google español de Estados Unidos": "Google US Spanish",
    "Google français": "Google French",
    "Google हिन्दी": "Google Hindi",
    "Google Bahasa Indonesia": "Google Indonesian",
    "Google italiano": "Google Italian",
    "Google 日本語": "Google Japanese",
    "Google 한국의": "Google Korean",
    "Google Nederlands": "Google Netherlands",
    "Google polski": "Google Polish",
    "Google português do Brasil": "Google Portugese",
    "Google русский": "Google Russian",
    "Google 普通话（中国大陆）": "Google Mainland Mandarin",
    "Google 粤語（香港）": "Google Hong Kong Cantonese",
};

for (const voice in voices) {
    voiceSelect.innerHTML += `<option>${voices[voice]}</option>`;
}

speechEngine.onvoiceschanged = () => {
    speechEngine.cancel()
    window.voices = window.speechSynthesis.getVoices();
};

function generateSpeech() {
    let text = inputBox.value;
    speech = new SpeechSynthesisUtterance(text);
    speech.volume = updatedVolume;
    speech.pitch = updatedPitch;
    speech.rate = updatedSpeed;


    const allVoices = window.speechSynthesis.getVoices();
    const selectedVoice = Object.keys(voices).find(key => voices[key] === voiceSelect.value);
    speech.voice = allVoices.find(v => v.name === selectedVoice);

    speechEngine.speak(speech);

    speech.onstart = () => {
        inputBox.classList.add("speaking");
        playpauseIcon.textContent = "pause";
    };

    speech.onend = () => {
        inputBox.classList.remove("speaking");
        speechEngine.cancel();
        playpauseIcon.textContent = "play_arrow";
        isPaused = false;
    };

}

settingInput.forEach((item, index) => {

    item.addEventListener("input", function () {

        let inputValue = item.value;
        settingSpan[index].textContent = inputValue.toString();
        updatedSpeed = settingInput[0].value;
        updatedPitch = settingInput[1].value;
        updatedVolume = settingInput[2].value;

    });

});

window.onload = () => {
    clearText();
}

