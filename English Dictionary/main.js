let input = document.getElementById('search-input');
let infoElem = document.getElementById('info-text');
let wordElem = document.getElementById('word');
let pronounciationElem = document.getElementById('pronounciation');
let closeBtn = document.getElementById('close-btn');
let speakBtn = document.getElementById('speak-btn');
let searchedWord;
let audio;
let sets = [];
let setsOfMeanings = [];
let appDiv = document.getElementById('app-div');
let wordDiv = document.getElementById('word-container');
let myTimer;

function data(result, word) {
    if (result.title) {
        infoElem.style.color = "var(--error-color)";
        infoElem.textContent = `Couldn't  find the meaning of ${word}`;
    } else {
        document.getElementById('app-div').style.visibility = 'visible';
        input.value = '';
        infoElem.style.visibility = 'hidden';
        searchedWord = result[0].word;

        for (let i = 0; i < result[0].meanings.length; i++) {
            let partOfSpeech = result[0].meanings[i].partOfSpeech;
            let definition = result[0].meanings[i].definitions[0].definition;
            let example = result[0].meanings[i].definitions[0].example;

            if (partOfSpeech === undefined) {
                partOfSpeech = '-';
            }
            if (definition === undefined) {
                definition = '-';
            }
            if (example === undefined) {
                example = '-';
            }

            sets.push(
                partOfSpeech,
                definition,
                example,
            );

        }

        for (var i = 0, j = 0; i < sets.length; i++) {
            if (i >= 3 && i % 3 === 0)
                j++;
            setsOfMeanings[j] = setsOfMeanings[j] || [];
            setsOfMeanings[j].push(sets[i]);
        }

        setsOfMeanings.forEach((item) => {

            let partOfSpeech = item[0];
            let definition = item[1];
            let example = item[2];

            wordDiv.style.visibility = 'visible';
            wordElem.innerText = searchedWord;

            appDiv.innerHTML += `
            <p class="meaning-title">Definition ${setsOfMeanings.indexOf(item) + 1}</p>
            <div class="result-div">
                <ul>
                    <li>
                        <p>Part Of Speech
                            <span id="definition-text" class="details">${partOfSpeech}</span>
                        </p>
                    </li>
                    <li>
                        <p>Definition
                            <span id="definition-text" class="details">${definition}</span>
                        </p>
                    </li>
                    <li>
                        <p>Example
                            <span id="example-text" class="details">${example}</span>
                        </p>
                    </li>
                </ul>
            </div>
            `;
        });

        audio = new Audio(result[0].phonetics[0].audio);

    }
}

function fetchApi(word) {
    sets = [];
    setsOfMeanings = [];
    infoElem.style.visibility = 'visible';
    infoElem.style.color = "var(--info-text-color)";
    infoElem.textContent = 'Searching word...';
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then((res) => res.json()).then((result) => data(result, word));
}

input.addEventListener('keyup', e => {
    if (e.key == 'Enter' && e.target.value) {
        sets = [];
        setsOfMeanings = [];
        appDiv.style.visibility = 'hidden';
        wordDiv.style.visibility = 'hidden';
        appDiv.innerHTML = '';
        fetchApi(e.target.value);
    }
});

closeBtn.addEventListener('click', () => {
    sets = [];
    setsOfMeanings = [];
    input.value = '';
    appDiv.innerHTML = '';
    appDiv.style.visibility = 'hidden';
    wordDiv.style.visibility = 'hidden';
    infoElem.textContent = ""
});

speakBtn.addEventListener('click', () => {
    clearInterval(myTimer);
    window.focus();
    var playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(function () {
            speakBtn.innerText = 'graphic_eq';
        }).catch(function (error) {
            infoElem.innerText = 'Audio unavailable';
            infoElem.style.color = "var(--error-color)";
            infoElem.style.visibility = 'visible';
            myTimer = setInterval(() => {
                infoElem.style.visibility = 'hidden';
            }, 2000);
        });
    }
    audio.onended = function () {
        speakBtn.innerText = 'volume_up';
    };
});
