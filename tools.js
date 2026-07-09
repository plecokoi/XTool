const tools = [
    // --- Active Tools ---
    {   
        name: "To Do List", 
        icon: "checklist", 
        desc: "Sort out your daily tasks", 
        url: "To Do List/index.html", 
        restricted: false 
    },

    { 
        name: "Notes App", 
        icon: "text_snippet", 
        desc: "Keep ideas organised", 
        url: "NotesApp/index.html", 
        restricted: false 
    },

    { 
        name: "English Dictionary", 
        icon: "dictionary", 
        desc: "Discover definitions", 
        url: "English Dictionary/index.html", 
        restricted: false 
    },

    { 
        name: "Calculator", 
        icon: "calculate", 
        desc: "Solve your problems", 
        url: "Calculator/index.html", 
        restricted: false 
    },

    { 
        name: "Unit Converter", 
        icon: "currency_exchange", 
        desc: "Get your desired unit", 
        url: "Unit converter/index.html", 
        restricted: false 
    },

    { 
        name: "Translator", 
        icon: "translate", 
        desc: "Break language barriers", 
        url: "Translator/index.html", 
        restricted: false 
    },

    { 
        name: "Text to Speech", 
        icon: "text_to_speech", 
        desc: "Bring your words to life", 
        url: "Text to Speech/index.html", 
        restricted: false 
    },

    { 
        name: "Chatbot", 
        icon: "chat", 
        desc: "Clear your doubts", 
        url: "Chatbot/index.html", 
        restricted: false 
    },

    { 
        name: "BMI Calculator", 
        icon: "monitor_weight", 
        desc: "Track your health", 
        url: "BMI Calculator/index.html", 
        restricted: false 
    },

    { 
        name: "Timer", 
        icon: "av_timer", 
        desc: "Track your time", 
        url: "Timer/index.html", 
        restricted: false 
    },

    // --- Under Development ---

    { 
        name: "World Clock", 
        icon: "nest_clock_farsight_analog", 
        desc: "Sync across timezone", 
        restricted: true 
    },

    { 
        name: "Stopwatch", 
        icon: "timer", 
        desc: "Capture every second", 
        restricted: true 
    },

    { 
        name: "Geometric Calculator", 
        icon: "architecture", 
        desc: "Solve shapes and figures", 
        restricted: true 
    },

    { 
        name: "Age Calculator", 
        icon: "cake", 
        desc: "Time since birth", 
        restricted: true 
    },

    { 
        name: "Password Generator", 
        icon: "password", 
        desc: "Create secure passwords", 
        restricted: true 
    },

    { 
        name: "Quote Generator", 
        icon: "format_quote", 
        desc: "Find inspiration with quotes", 
        restricted: true 
    },

    { 
        name: "Color Generator", 
        icon: "palette", 
        desc: "Unleash a world of colors", 
        restricted: true 
    },

    { 
        name: "Name Generator", 
        icon: "badge", 
        desc: "Find the perfect name", 
        restricted: true 
    },

    { 
        name: "Spinning Wheel", 
        icon: "poker_chip", 
        desc: "Let the wheel decide", 
        restricted: true 
    },

    { name: "Music Player", 
        icon: "music_note", 
        desc: "Stream your music instantly", 
        restricted: true 
    },

    { 
        name: "Weather App", 
        icon: "cloud", 
        desc: "Get real-time weather updates", 
        restricted: true 
    },

    { 
        name: "Recipe App", 
        icon: "chef_hat", 
        desc: "Master every flavour", 
        restricted: true 
    },

    { 
        name: "News Hub", 
        icon: "newspaper", 
        desc: "Get today's top headlines", 
        restricted: true 
    },

    { 
        name: "QR Code Generator", 
        icon: "qr_code", 
        desc: "Create QR codes", 
        restricted: true 
    },

    { 
        name: "Drawing App", 
        icon: "draw", 
        desc: "Sketch your ideas", 
        restricted: true 
    },

    { 
        name: "Periodic Table", 
        icon: "science", 
        desc: "Explore the elements", 
        restricted: true 
    },

    { 
        name:"Emoji Dictionary", 
        icon: "mood", 
        desc: "Decode emoji meanings", 
        restricted: true 
    },

    { 
        name:"Meme studio", 
        icon: "comedy_mask", 
        desc: "Generate viral content", 
        restricted: true 
    },

    { 
        name: "Music Studio", 
        icon: "tune", 
        desc: "Compose your sound", 
        restricted: true 
    },

    { 
        name: "Video Editor", 
        icon: "video_template", 
        desc: "Bring clips to life", 
        restricted: true 
    },

    { 
        name: "Cinema", 
        icon: "movie", 
        desc: "Explore cinematic worlds", 
        restricted: true 
    },

    { 
        name: "Book Hub", 
        icon: "Newsstand", 
        desc: "Discover every volume", 
        restricted: true 
    },

    { 
        name: "Synonym Finder", 
        icon: "equal", 
        desc: "Expand your vocabulary", 
        restricted: true 
    },

    { 
        name: "Speech to text", 
        icon: "audio_capture", 
        desc: "Transcribe your audio", 
        restricted: true 
    },

    { 
        name: "Flowchart Maker", 
        icon: "flowchart", 
        desc: "Map out your logic", 
        restricted: true 
    },

    { 
        name: "Grammar Checker", 
        icon: "spellcheck", 
        desc: "Polish your writing", 
        restricted: true 
    },

    { 
        name: "Speed Test", 
        icon: "network_check", 
        desc: "Check network status", 
        restricted: true 
    }

];

const container = document.querySelector(".toolContainer");
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
        <div class="toolElem ${tool.restricted ? 'restricted' : ''}">
            <span class="toolName">${tool.name}</span>
            <span class="material-symbols-outlined favIcon">favorite</span>
            <i class="material-symbols-outlined toolIcon">${tool.icon}</i>
            <span class="toolDescription">${tool.desc}</span>
            <button type="button" class="toolButton" ${tool.url ? `data-url="${tool.url}"` : ''}>
                <i class="material-symbols-outlined buttonIcon">chevron_forward</i>
            </button>
        </div>
    `;
});

container.innerHTML = htmlContent;
container.style.visibility = "visible";