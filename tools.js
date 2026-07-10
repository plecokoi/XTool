const tools = [
    // --- Active Tools ---
    {   
        name: "To Do List", 
        icon: "checklist", 
        desc: "Sort out your daily tasks", 
        url: "To Do List/index.html", 
        restricted: false,
        category: "productivity",
        id: "to-do-list"
    },

    { 
        name: "Notes App", 
        icon: "text_snippet", 
        desc: "Keep ideas organised", 
        url: "NotesApp/index.html", 
        restricted: false,
        category: "productivity",
        id: "notes-app"
    },

    { 
        name: "English Dictionary", 
        icon: "dictionary", 
        desc: "Discover definitions", 
        url: "English Dictionary/index.html", 
        restricted: false,
        category: "language",
        id: "eng-dict"
    },

    { 
        name: "Calculator", 
        icon: "calculate", 
        desc: "Solve your problems", 
        url: "Calculator/index.html", 
        restricted: false,
        category: "calculator",
        id: "calc"
    },

    { 
        name: "Unit Converter", 
        icon: "currency_exchange", 
        desc: "Get your desired unit", 
        url: "Unit converter/index.html", 
        restricted: false,
        category: "utility",
        id: "unit-conv"
    },

    { 
        name: "Translator", 
        icon: "translate", 
        desc: "Break language barriers", 
        url: "Translator/index.html", 
        restricted: false,
        category: "language",
        id: "translator"
    },

    { 
        name: "Text to Speech", 
        icon: "text_to_speech", 
        desc: "Bring your words to life", 
        url: "Text to Speech/index.html", 
        restricted: false,
        category: "utility",
        id: "text-to-speech"
    },

    { 
        name: "Chatbot", 
        icon: "chat", 
        desc: "Clear your doubts", 
        url: "Chatbot/index.html", 
        restricted: false,
        category: "productivity",
        id: "chatbot"
    },

    { 
        name: "BMI Calculator", 
        icon: "monitor_weight", 
        desc: "Track your health", 
        url: "BMI Calculator/index.html", 
        restricted: false,
        category: "calculator",
        id: "bmi-calc"
    },

    { 
        name: "Timer", 
        icon: "av_timer", 
        desc: "Track your time", 
        url: "Timer/index.html", 
        restricted: false,
        category: "time",
        id: "timer"
    },

    // --- Under Development ---

    { 
        name: "World Clock", 
        icon: "nest_clock_farsight_analog", 
        desc: "Sync across timezone", 
        restricted: true,
        category: "time",
        id: "clock"
    },

    { 
        name: "Stopwatch", 
        icon: "timer", 
        desc: "Capture every second", 
        restricted: true,
        category: "time",
        id: "stopwatch"
    },

    { 
        name: "Geometric Calculator", 
        icon: "architecture", 
        desc: "Solve shapes and figures", 
        restricted: true,
        category: "calculator",
        id: "geometric-calc"
    },

    { 
        name: "Age Calculator", 
        icon: "cake", 
        desc: "Time since birth", 
        restricted: true,
        category: "calculator",
        id: "age-calc"
    },

    { 
        name: "Password Generator", 
        icon: "password", 
        desc: "Create secure passwords", 
        restricted: true,
        category: "generator",
        id: "password-gen"
    },

    { 
        name: "Quote Generator", 
        icon: "format_quote", 
        desc: "Find inspiration with quotes", 
        restricted: true,
        category: "generator",
        id: "quote-gen"
    },

    { 
        name: "Color Generator", 
        icon: "palette", 
        desc: "Unleash a world of colors", 
        restricted: true,
        category: "generator",
        id: "color-gen"
    },

    { 
        name: "Name Generator", 
        icon: "badge", 
        desc: "Find the perfect name", 
        restricted: true,
        category: "generator",
        id: "name-gen"
    },

    { 
        name: "Spinning Wheel", 
        icon: "poker_chip", 
        desc: "Let the wheel decide", 
        restricted: true,
        category: "utility",
        id: "spinning-wheel"
    },

    { name: "Music Player", 
        icon: "music_note", 
        desc: "Stream your music instantly", 
        restricted: true,
        category: "entertainment",
        id: "music-player"
    },

    { 
        name: "Weather App", 
        icon: "cloud", 
        desc: "Get real-time weather updates", 
        restricted: true,
        category: "utility",
        id: "weather-app"
    },

    { 
        name: "Recipe App", 
        icon: "chef_hat", 
        desc: "Master every flavour", 
        restricted: true,
        category: "productivity",
        id: "recipe-app"
    },

    { 
        name: "News Hub", 
        icon: "newspaper", 
        desc: "Get today's top headlines", 
        restricted: true,
        category: "productivity",
        id: "news-hub"
    },

    { 
        name: "QR Code Generator", 
        icon: "qr_code", 
        desc: "Create QR codes", 
        restricted: true,
        category: "generator",
        id: "qr-code-gen" 
    },

    { 
        name: "Drawing App", 
        icon: "draw", 
        desc: "Sketch your ideas", 
        restricted: true,
        category: "creative",
        id: "drawing-app"
    },

    { 
        name: "Periodic Table", 
        icon: "science", 
        desc: "Explore the elements", 
        restricted: true,
        category: "productivity",
        id: "periodic-table"
    },

    { 
        name:"Emoji Dictionary", 
        icon: "mood", 
        desc: "Decode emoji meanings", 
        restricted: true,
        category: "language",
        id: "emoji-dict"
    },

    { 
        name:"Meme studio", 
        icon: "comedy_mask", 
        desc: "Generate viral content", 
        restricted: true,
        category: "creative",
        id: "meme-studio"
    },

    { 
        name: "Music Studio", 
        icon: "tune", 
        desc: "Compose your sound", 
        restricted: true,
        category: "creative",
        id: "music-studio" 
    },

    { 
        name: "Video Editor", 
        icon: "video_template", 
        desc: "Bring clips to life", 
        restricted: true,
        category: "creative",
        id: "video-editor"
    },

    { 
        name: "Cinema", 
        icon: "movie", 
        desc: "Explore cinematic worlds", 
        restricted: true,
        category: "entertainment",
        id: "cinema" 
    },

    { 
        name: "Book Hub", 
        icon: "Newsstand", 
        desc: "Discover every volume", 
        restricted: true,
        category: "productivity",
        id: "book-hub"
    },

    { 
        name: "Synonym Finder", 
        icon: "equal", 
        desc: "Expand your vocabulary", 
        restricted: true,
        category: "language",
        id: "synonym-finder"
    },

    { 
        name: "Speech to text", 
        icon: "audio_capture", 
        desc: "Transcribe your audio", 
        restricted: true,
        category: "utility",
        id: "speech-to-text"
    },

    { 
        name: "Flowchart Maker", 
        icon: "flowchart", 
        desc: "Map out your logic", 
        restricted: true,
        category: "productivity",
        id: "flowchart-maker"
    },

    { 
        name: "Grammar Checker", 
        icon: "spellcheck", 
        desc: "Polish your writing", 
        restricted: true,
        category: "language",
        id: "grammar-checker"
    },

    { 
        name: "Speed Test", 
        icon: "network_check", 
        desc: "Check network status", 
        restricted: true,
        category: "utility",
        id: "speed-test"
    }

];

const container = document.querySelector(".toolContainer");
const toolElem = document.querySelectorAll(".toolElem");
let dividerAdded = false;
let htmlContent = "";

tools.forEach(tool => {

    if (tool.restricted && !dividerAdded) {
        htmlContent += `
            <div class="line-divider restricted">
                <hr class="line-segment">
                <span>UNDER DEVELOPMENT</span>
            </div>`;
        dividerAdded = true;
    }

    htmlContent += `
        <div class="toolElem ${tool.restricted ? 'restricted' : ''}" data-category="${tool.category}">
            <span class="toolName">${tool.name}</span>
            <span class="material-symbols-outlined favIcon">favorite</span>
            <i class="material-symbols-outlined toolIcon">${tool.icon}</i>
            <span class="toolDescription">${tool.desc}</span>
            <button type="button" id="${tool.id}" class="toolButton" ${tool.url ? `data-url="${tool.url}"` : ''}>
                <i class="material-symbols-outlined buttonIcon">chevron_forward</i>
            </button>
        </div>
    `;
});

container.innerHTML = htmlContent;
container.style.visibility = "visible";


function filterTools(category) {

    const divider = document.querySelector(".line-divider");

    toolElements.forEach(elem => {
        if (category === "all" || elem.dataset.category === category){
            elem.style.display = "";
        }else{
            elem.style.display = "none";
        }
    });

    if (divider) { divider.style.display = (category === "all") ? "block" : "none"; }

}

document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", (e) =>{

        document.querySelectorAll(".tab-btn").forEach(b => {
            b.classList.remove("active");
        })

        e.target.classList.add("active");

        const category = e.target.getAttribute("data-filter");
        filterTools(category);
    })
})