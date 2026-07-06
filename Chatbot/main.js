const inputBox = document.querySelector(".input-box");
const conversationPanel = document.querySelector(".conversation-panel");
let msgContent;

function sendMsg() {
    msgContent = inputBox.value;
    if (msgContent !== "") {

        const userLine = document.createElement('div');
        userLine.classList.add('user-line');
        const userAvatar = document.createElement('div');
        userAvatar.classList.add('user-avatar');
        userAvatar.innerHTML = `<i class="material-symbols-outlined">person</i>`;
        const userMsg = document.createElement('div');
        userMsg.classList.add('user-msg');
        const msgSpan = document.createElement('span');
        msgSpan.textContent = msgContent;
        userMsg.appendChild(msgSpan);
        userLine.appendChild(userAvatar);
        userLine.appendChild(userMsg);
        conversationPanel.appendChild(userLine);
        inputBox.value = "";

        fetchApi();
    }
}

function clearMsg() {
    inputBox.value = "";
    conversationPanel.innerHTML =
        `
    <div class="bot-line">
        <div class="bot-avatar"><i class="material-symbols-outlined">smart_toy</i></div>
        <div class="bot-msg"><span>Hello, how can I help?</span></div>
    </div>
    `;

}

function fetchApi() {

    const botLine = document.createElement('div');
    botLine.classList.add('bot-line');
    const botAvatar = document.createElement('div');
    botAvatar.classList.add('bot-avatar');
    botAvatar.innerHTML = `<i class="material-symbols-outlined">smart_toy</i>`;
    const botMsg = document.createElement('div');
    botMsg.classList.add('bot-msg');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('loading-animation');
    const msgDiv1 = document.createElement('div');
    msgDiv1.classList.add('dot');
    const msgDiv2 = document.createElement('div');
    msgDiv2.classList.add('dot');
    const msgDiv3 = document.createElement('div');
    msgDiv3.classList.add('dot');
    msgDiv.append(msgDiv1, msgDiv2, msgDiv3);
    botMsg.appendChild(msgDiv);
    botLine.appendChild(botAvatar);
    botLine.appendChild(botMsg);
    conversationPanel.appendChild(botLine);

    const apiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`;

    const requestBody = {
        "contents": [{
            "parts": [{ "text": msgContent }]
        }]
    };

    fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    })
        .then(res => res.json())
        .then(data => {
            let bot_response = data.candidates[0].content.parts[0].text;
            let formattedResponse = bot_response
                .replace(/\*(.*?)\*/g, "<p>$1</p>");
            formattedResponse = formattedResponse;
            msgDiv.remove();
            const msgSpan = document.createElement('span');
            msgSpan.innerHTML = formattedResponse;
            botMsg.appendChild(msgSpan);
        })
        .catch(err => {
            msgDiv.remove();
            let error_msg = "Sorry, there was an error processing your request";
            const msgSpan = document.createElement('span');
            msgSpan.textContent = error_msg;
            botMsg.appendChild(msgSpan);
        });

    conversationPanel.scrollTop = conversationPanel.scrollHeight;

}

inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMsg();
    }
});