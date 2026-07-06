const menuButton = document.getElementById("menuButton")
const menuDiv = document.querySelector(".menuDiv")
const searchButton = document.getElementById("searchButton")
const searchDiv = document.querySelector(".searchDiv")
const searchInput = document.getElementById("searchBox")
let toolElements = Array.from(document.querySelectorAll(".toolElem"))
const restrictedZone = document.querySelectorAll(".restricted")
const favouriteButton = document.getElementById("favourites")
const recentButton = document.getElementById("recents")
const settingsButton = document.getElementById("settings")
const devTextSpan = document.querySelector(".devTextSpan")
let recentList = []
const toolButtons = document.querySelectorAll(".toolButton")
const favIcon = document.querySelectorAll(".favIcon")
const clearRecents = document.getElementById("clearRecentsBtn")
const clearFav = document.getElementById("clearFavsBtn")
const clearSettings = document.getElementById("clearSettingsBtn")
const closeBtn = document.querySelector(".closeBtn")
const toolCont= document.querySelector(".toolContainer")
const settingsDiv = document.querySelector(".settingsDiv")
const defaultSettings = {
    theme: "light",
    cardSize: "normal",
    newTab: false,
    recentCount: 3,
    history: "forever"
}
let currentSettings = JSON.parse(localStorage.getItem("userSettings")) || defaultSettings

function enforceHistoryPolicy(){
    const policy = currentSettings.history || "forever";

    if (policy === "forever") return;

    if (policy === "session"){
        if (!sessionStorage.getItem("active_session")){
            wipeHistoryData();
            sessionStorage.setItem("active_session", "initialised");
        }
        return;
    }

    const lastUpdated = localStorage.getItem("historyLastUpdated");

    if (lastUpdated){
        const timeElapsed = Date.now() - parseInt(lastUpdated, 10);

        let allowedDuration = 0;
        
        if (policy === "1hour") allowedDuration = 60*60*1000;
        if (policy === "1day") allowedDuration = 24*60*60*1000;

        if (timeElapsed > allowedDuration){
            wipeHistoryData();
        }
    }
}

function wipeHistoryData(){
    localStorage.removeItem("recentButtons");
    localStorage.removeItem("historyLastUpdated");
    updateUI();
}


clearRecents.onclick = () => {
    if (confirm ("Are you sure you want to clear your recently used tools history?")){
        localStorage.removeItem("recentButtons");
        alert("Recent tools history has been cleared.");
    }
}

clearFav.onclick = () => {
    if (confirm ("Are you sure you want to remove all favourited tools?")){
        localStorage.removeItem("favTools");
        favIcon.forEach(icon => {
            icon.classList.remove("isFav");
        });
        alert("All favourites have been reset.");
    }
}

closeBtn.addEventListener("click", () => {
    favouriteButton.classList.remove("active");
    recentButton.classList.remove("active");
    settingsButton.classList.remove("active");
    updateUI();
})




function restoreSettings(){

    enforceHistoryPolicy();

    currentSettings = JSON.parse(localStorage.getItem("userSettings")) || defaultSettings
    document.querySelectorAll("[data-setting]").forEach(input => {
        const key = input.dataset.setting;
        const value = currentSettings[key];

        if (input.type === "checkbox"){
            input.checked = value;
        }else if (input.tagName === "SELECT" || input.type === "range"){
            input.value = value;
            if (key === "recentCount"){
                document.getElementById("historyVal").textContent = value;
            }
        }
    })
    applyUIChanges();
}

function applyUIChanges(){

    if (currentSettings.theme === "dark"){
        document.body.classList.add("dark-theme");
        document.getElementById("darkModeToggle").textContent = "Toggle Light Mode";
    }else{
        document.body.classList.remove("dark-theme");
        document.getElementById("darkModeToggle").textContent = "Toggle Dark Mode";
    }

    toolCont.classList.toggle("compact", currentSettings.cardSize === "compact");

}


document.getElementById("darkModeToggle").addEventListener("click", () => {
    if (currentSettings.theme === "dark"){
        currentSettings.theme = "light";
    }else{
        currentSettings.theme = "dark";
    }
    localStorage.setItem("userSettings", JSON.stringify(currentSettings));
    applyUIChanges();
})


clearSettings.onclick = () => {
    if (confirm ("Are you sure you want to reset settings?")){
        localStorage.removeItem("userSettings");
        alert("Settings have been reset.");
    }
    restoreSettings();
}

settingsDiv.addEventListener("input", (event) => {
    const target = event.target;
    const key = target.dataset.setting;

    if (!key) return;

    let value;
    if (target.type === "checkbox"){
        value = target.checked;
    }else{
        value = target.value;
    }

    if (key === "recentCount"){
        document.getElementById("historyVal").textContent = value;
        let recentButtons = JSON.parse(localStorage.getItem("recentButtons")) || [];
        if (recentButtons.length > value) {
            recentButtons = recentButtons.slice(0,value);
            localStorage.setItem('recentButtons', JSON.stringify(recentButtons));
        }
    }

    currentSettings[key] = value;
    localStorage.setItem("userSettings", JSON.stringify(currentSettings));
    applyUIChanges();
    enforceHistoryPolicy();
})

restoreSettings();


function restoreFav(){
    const favTools = JSON.parse(localStorage.getItem("favTools")) || [];
    favIcon.forEach(icon => {
        const parentCard = icon.closest(".toolElem");
        const targetId = parentCard.querySelector(".toolButton").id;
        if (favTools.includes(targetId)){
            icon.classList.add("isFav");
        }
    })
}

restoreFav();


function updateUI(){

    const isFavActive = favouriteButton.classList.contains("active");
    const isRecentActive = recentButton.classList.contains("active");
    const isSettings = settingsButton.classList.contains("active");

    restrictedZone.forEach(zone => zone.style.display = "none");
    settingsDiv.style.display = "none";
    toolCont.style.display = "";
    const oldMsg = document.getElementById("emptyPlaceholder");
    if (oldMsg){
        oldMsg.remove();
    }


    if (isFavActive){

        devTextSpan.textContent = "FAVOURITES";
        devTextSpan.style.visibility = "visible";
        menuDiv.style.visibility = "hidden";
        closeBtn.style.visibility = "visible";

        const favTools = JSON.parse(localStorage.getItem("favTools")) || [];
        
        toolElements.forEach(element => {
            const childButton = element.querySelector("button");
            const isSaved = childButton && favTools.includes(childButton.id);
            element.style.display = isSaved ? "" : "none";
        })

        if (favTools.length === 0){
            toolCont.insertAdjacentHTML("beforeend", `
                <div class="emptyMsg" id="emptyPlaceholder">
                    <span>No favourites added yet.</span>
                </div>
            `)
        }
        
    }

    else if (isRecentActive){

        devTextSpan.textContent = "RECENTS";
        devTextSpan.style.visibility = "visible";
        menuDiv.style.visibility = "hidden";
        closeBtn.style.visibility = "visible";

        const recentButtons = JSON.parse(localStorage.getItem("recentButtons")) || [];

        toolElements.forEach(element => {
            const childButton = element.querySelector("button");
            const isRecent = childButton && recentButtons.includes(childButton.id);
            element.style.display = isRecent ? "" : "none";
        });

        if (recentButtons.length === 0){
            toolCont.insertAdjacentHTML("beforeend", `
                <div class="emptyMsg" id="emptyPlaceholder">
                    <span>Your recently used tools history is empty.</span>
                </div>
            `)
        }

    }

    else if(isSettings){
        
        devTextSpan.textContent = "SETTINGS";
        devTextSpan.style.visibility = "visible";
        menuDiv.style.visibility = "hidden";
        toolCont.style.display = "none";
        settingsDiv.style.display = "block";
        closeBtn.style.visibility = "visible";

    }

    else{

        devTextSpan.style.visibility = "hidden";
        menuDiv.style.visibility = "hidden";
        closeBtn.style.visibility = "hidden";

        toolElements.forEach(element => {
            element.style.display = "";
        });
        
        restrictedZone[0].style.display = "";

    }
}

menuButton.onclick = (event) => {
    event.stopPropagation();
    if (menuDiv.style.visibility !== "visible"){
        searchDiv.style.visibility = "hidden";
        menuDiv.style.visibility = "visible";
    }else{
        menuDiv.style.visibility = "hidden";
    }    
}

document.addEventListener("click", (event) => {
    if (menuDiv.style.visibility === "visible"){
        if (!menuDiv.contains(event.target)){
            menuDiv.style.visibility = "hidden";
        }
    }
})

searchButton.onclick = () => {
    if (searchDiv.style.visibility !== "visible"){
        menuDiv.style.visibility = "hidden";
        searchDiv.style.visibility = "visible";
        searchInput.focus();
        searchInput.value = "";
        favouriteButton.classList.remove("active");
        recentButton.classList.remove("active");
        settingsButton.classList.remove("active");
        updateUI();
    }else{
        searchDiv.style.visibility = "hidden";
        searchInput.value = "";
        updateUI();
    }    
}

searchInput.addEventListener("input", (event) => {

    const searchTerm = event.target.value.toLowerCase();
    restrictedZone[0].style.display = "none";

    favouriteButton.classList.remove("active");
    recentButton.classList.remove("active");
    devTextSpan.style.visibility = "hidden";

    toolElements.forEach(element => {
        const toolName = element.querySelector(".toolName");
        if (toolName){
            const nameText = toolName.textContent.toLowerCase();
            element.style.display = nameText.startsWith(searchTerm) ? "":"none";
        }
    })
    
})

searchInput.addEventListener("blur", () => {
    searchDiv.style.visibility = "hidden";
    updateUI();

})

favIcon.forEach(icon => {

    icon.addEventListener("click", (e) => {

        const parentCard = icon.closest(".toolElem");
        const targetId = parentCard.querySelector(".toolButton").id;

        icon.classList.toggle('isFav');
        const isFav = icon.classList.contains("isFav");

        let favTools = JSON.parse(localStorage.getItem("favTools")) || [];

        if (isFav){
            if (!favTools.includes(targetId)){
                favTools.push(targetId);
            }
        }else{
            favTools = favTools.filter(id => id!==targetId);
        }

        localStorage.setItem("favTools",JSON.stringify(favTools));

        if (favouriteButton.classList.contains("active")){
            updateUI();
        }
    });
    
})

toolButtons.forEach( button => {

    button.addEventListener('click', (event) => {

        const targetedBtn = event.currentTarget;
        const buttonId = targetedBtn.id;
        const targetUrl = targetedBtn.getAttribute("data-url");

        if (!buttonId) {
            if (targetUrl) {
                if (currentSettings.newTab) {
                    window.open(targetUrl, "_blank")
                }else{
                    window.location.href = targetUrl;
                }
            }
            return;
        }

        let recentButtons = JSON.parse(localStorage.getItem("recentButtons")) || [];
        recentButtons = recentButtons.filter( id => id!==buttonId);
        recentButtons.unshift(buttonId);

        if (recentButtons.length > currentSettings.recentCount) {
            recentButtons = recentButtons.slice(0,currentSettings.recentCount);
        }

        localStorage.setItem('recentButtons', JSON.stringify(recentButtons));

        const currentTime = Date.now().toString();
        localStorage.setItem("historyLastUpdated", currentTime);

         if (targetUrl) {
            if (currentSettings.newTab) {
                window.open(targetUrl, "_blank")
            }else{
                window.location.href = targetUrl;
            }
        }

    });

})

favouriteButton.addEventListener("click", () => {
    favouriteButton.classList.toggle("active");
    if (favouriteButton.classList.contains("active")){
        recentButton.classList.remove("active");
        settingsButton.classList.remove("active");
    }
    updateUI();
})

recentButton.addEventListener("click", () => {
    recentButton.classList.toggle("active");
    if (recentButton.classList.contains("active")){
        favouriteButton.classList.remove("active");
        settingsButton.classList.remove("active");
    }
    updateUI();
})

settingsButton.addEventListener("click", (event) => {
    settingsButton.classList.toggle("active");
    if (settingsButton.classList.contains("active")){
        favouriteButton.classList.remove("active");
        recentButton.classList.remove("active");
    }
    updateUI();
    restoreSettings();
})

