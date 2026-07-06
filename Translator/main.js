const input_box = document.querySelector(".input-box");
const output_box = document.querySelector(".output-box");
const from_lang_box = document.querySelector(".input-lang");
const to_lang_box = document.querySelector(".output-lang");
const infoPanel = document.querySelector(".warning-msg");
let apiTimer;
let languageSelection = document.querySelectorAll('select');
const countryCode = {
    "en-GB": "English",
    "zh-CN": "Chinese (S)",
    "zh-TW": "Chinese (T)",
    "ta-LK": "Tamil",
    "ms-MY": "Malay",
    "te-IN": "Telugu",
    "es-ES": "Spanish",
    "de-DE": "German",
    "fr-FR": "French",
    "hi-IN": "Hindi",
    "id-ID": "Indonesian",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "ko-KR": "Korean",
    "th-TH": "Thai",
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "is-IS": "Icelandic",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
};

languageSelection.forEach((item) => {
    for (const code in countryCode) {
        item.innerHTML += `<option>${countryCode[code]}</option>`;
    }
});

for (i = 0; i < from_lang_box.options.length; i++) {
    if (from_lang_box.options[i].text === "English") {
        from_lang_box.options[i].selected = true;
    }
}

for (i = 0; i < to_lang_box.options.length; i++) {
    if (to_lang_box.options[i].text === "Chinese (S)") {
        to_lang_box.options[i].selected = true;
    }
}

function fetchApi() {

    clearTimeout(apiTimer);

    output_box.innerHTML = `Translating...`;
    output_box.style.color = "var(--output-color)";

    apiTimer = setTimeout(() => {

        let input = input_box.value;
        let from_lang = Object.keys(countryCode).find(key => countryCode[key] === from_lang_box.value);
        let to_lang = Object.keys(countryCode).find(key => countryCode[key] === to_lang_box.value);
        const apiUrl = `https://api.mymemory.translated.net/get?q=${input}&langpair=${from_lang}|${to_lang}`;

        fetch(apiUrl)

            .then((res) => res.json())
            .then((data) => {

                console.log(data);

                if (data.responseStatus === 200) {
                    let translatedText = data.responseData.translatedText;

                    if (translatedText === null) {               //null
                        output_box.innerHTML = `Invalid input`;
                        output_box.style.color = "var(--error-msg)";

                    } else {                                      //success
                        output_box.innerHTML = `${translatedText}`;
                        output_box.style.color = "var(--ouput-color";
                    }

                } else if (data.responseStatus === "403" && input !== "") {       //error
                    output_box.innerHTML = `Error`;
                    output_box.style.color = "var(--error-msg)";

                } else if (input.trim() === "") {                 //empty input
                    output_box.innerHTML = `Invalid input`;
                    output_box.style.color = "var(--error-msg)";

                } else if (data.quotaFinished === true) {
                    output_box.innerHTML = `Quota limit reached`;
                    output_box.style.color = "var(--error-msg)";
                }

            })
            .catch((error) => console.log(error));


    }, 200);

}

input_box.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        fetchApi();
    }
});
from_lang_box.addEventListener("input", fetchApi);
to_lang_box.addEventListener("input", fetchApi);

function switchBtn() {
    let tempLang1 = from_lang_box.value;
    let tempLang2 = to_lang_box.value;
    from_lang_box.value = tempLang2;
    to_lang_box.value = tempLang1;

    let tempInput = input_box.value;
    let tempOutput = output_box.value;
    input_box.value = tempOutput;
    output_box.innerHTML = tempInput;
}

window.speechSynthesis.onvoiceschanged = () => {
    window.voices = window.speechSynthesis.getVoices();
};

let inputTimer;

function playInput() {

    let from_lang = Object.keys(countryCode).find(key => countryCode[key] === from_lang_box.value);
    clearTimeout(inputTimer);

    const inputAudio = new SpeechSynthesisUtterance(input_box.value);
    inputAudio.lang = input_box.value;
    inputAudio.volume = 1;

    let voices = window.speechSynthesis.getVoices();
    let langVoice = voices.find(voice => voice.lang.startsWith(from_lang.split("-")[0]));
    if (langVoice) {
        inputAudio.voice = langVoice;
    } else {
        console.warn("Cannot play audio");
        clearTimeout(inputTimer);
        infoPanel.textContent = "Voice not fully supported";
        infoPanel.style.visibility = "visible";
        inputTimer = setTimeout(() => {
            infoPanel.style.visibility = "hidden";
            infoPanel.textContent = "Info";
        }, 3000);
    }

    window.speechSynthesis.speak(inputAudio);
}

let outputTimer;

function playOutput() {

    let to_lang = Object.keys(countryCode).find(key => countryCode[key] === to_lang_box.value);
    clearTimeout(outputTimer);

    const outputAudio = new SpeechSynthesisUtterance(output_box.value);
    outputAudio.lang = to_lang_box.value;
    outputAudio.volume = 1;

    let voices = window.voices || window.speechSynthesis.getVoices();
    let langVoice = voices.find(voice => voice.lang.startsWith(to_lang.split("-")[0]));
    if (langVoice) {
        outputAudio.voice = langVoice;
    } else {
        console.warn("Cannot play audio");
        clearTimeout(outputTimer);
        infoPanel.textContent = "Voice not fully supported";
        infoPanel.style.visibility = "visible";
        outputTimer = setTimeout(() => {
            infoPanel.style.visibility = "hidden";
            infoPanel.textContent = "Info";
        }, 3000);
    }

    window.speechSynthesis.speak(outputAudio);
}

let copyInputTimer;

function copyInput() {
    clearTimeout(copyInputTimer);
    navigator.clipboard.writeText(input_box.value)
        .then(() => {
            infoPanel.textContent = "Copied text";
            clearTimeout(copyInputTimer);
            infoPanel.style.visibility = "visible";
            copyInputTimer = setTimeout(() => {
                infoPanel.style.visibility = "hidden";
                infoPanel.textContent = "Info";
            }, 3000);
        });
}

let copyOutputTimer;

function copyOutput() {
    clearTimeout(copyInputTimer);
    navigator.clipboard.writeText(output_box.value)
        .then(() => {
            infoPanel.textContent = "Copied text";
            clearTimeout(copyInputTimer);
            infoPanel.style.visibility = "visible";
            copyInputTimer = setTimeout(() => {
                infoPanel.style.visibility = "hidden";
                infoPanel.textContent = "Info";
            }, 3000);
        });
}


