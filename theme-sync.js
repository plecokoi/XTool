(function (){
    function applyGlobalThemeState(){
        const saved = localStorage.getItem("userSettings");
        if (saved) {
            const currentSettings = JSON.parse(saved);

            if (currentSettings.theme === "dark"){
                document.documentElement.classList.add("dark-theme");
            }else{
                document.documentElement.classList.remove("dark-theme");
            }
        }
    }
    applyGlobalThemeState()

    document.addEventListener("DOMContentLoaded", applyGlobalThemeState);
}) ();

window.addEventListener("storage", (event) => {
    if (event.key === "userSettings"){
        const dynamicSettings = JSON.parse(event.newValue) || [];

        if (dynamicSettings.theme === "dark"){
            document.documentElement.classList.add("dark-theme");
        }else{
            document.documentElement.classList.remove("dark-theme");
        }
    }
})