import MESSAGES from "../lang/messages/en/user.js";

const API_BASE_URL = "https://goldfish-app-4bryv.ondigitalocean.app"; 

document.getElementById("submit").addEventListener("click", function () {
    const word = document.getElementById("word").value.trim();
    const definition = document.getElementById("definition").value.trim();
    const messageEl = document.getElementById("message");

    if (!word || !definition || /[^a-zA-Z\s]/.test(word)) {
        messageEl.textContent = MESSAGES.invalidInput;
        return;
    }

    const data = JSON.stringify({ word, definition });

    fetch(`${API_BASE_URL}/api/definitions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
    })
        .then((response) => response.json())
        .then((data) => {
            messageEl.textContent = `Response: ${data.message}`;
        })
        .catch((error) => {
            messageEl.textContent = MESSAGES.serverError;
        });
});
// chatgpt helped 