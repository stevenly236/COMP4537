import MESSAGES from "../lang/messages/en/user.js";

const API_BASE_URL = "https://goldfish-app-4bryv.ondigitalocean.app"; 

document.getElementById("searchBtn").addEventListener("click", function () {
    const word = document.getElementById("search").value.trim();
    const resultEl = document.getElementById("result");

    if (!word || /[^a-zA-Z\s]/.test(word)) {
        resultEl.textContent = MESSAGES.invalidInput;
        return;
    }

    fetch(`${API_BASE_URL}/api/definitions/?word=${encodeURIComponent(word)}`)
        .then((response) => response.json())
        .then((data) => {
            resultEl.textContent = `Response: ${data.message}`;
        })
        .catch((error) => {
            resultEl.textContent = MESSAGES.serverError;
        });
});
