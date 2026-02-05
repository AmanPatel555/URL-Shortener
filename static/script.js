let urlHistory = JSON.parse(localStorage.getItem("urlHistory")) || [];

async function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value;
    const resultDiv = document.getElementById("result");
    const spinner = document.getElementById("spinner");
    const button = document.getElementById("shortenBtn");

    if (!longUrl) {
        resultDiv.innerHTML = "<p class='error'>Please enter a URL</p>";
        return;
    }

    spinner.style.display = "block";
    button.disabled = true;
    resultDiv.innerHTML = "";

    try {
        const response = await fetch("/shorten", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ long_url: longUrl })
        });

        const data = await response.json();

        if (!response.ok) {
            resultDiv.innerHTML = `<p class="error">${data.detail}</p>`;
            return;
        }

        urlHistory.unshift(data.short_url);
        localStorage.setItem("urlHistory", JSON.stringify(urlHistory));
        renderHistory();

        resultDiv.innerHTML = `
            <p>Short URL:</p>
            <div class="copy-box">
                <a id="shortUrl" href="${data.short_url}" target="_blank">
                    ${data.short_url}
                </a>
                <button class="copy-btn" onclick="copyToClipboard()">Copy</button>
            </div>
            <p class="copied-msg" id="copiedMsg"></p>
        `;
    } catch (error) {
        console.error("Fetch error:", error);
        resultDiv.innerHTML = "<p class='error'>Server not reachable</p>";
    } finally {
        spinner.style.display = "none";
        button.disabled = false;
    }
}

function copyToClipboard() {
    const text = document.getElementById("shortUrl").innerText;
    navigator.clipboard.writeText(text);

    const msg = document.getElementById("copiedMsg");
    msg.innerText = "Copied!";
    setTimeout(() => msg.innerText = "", 2000);
}

function renderHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    if (urlHistory.length === 0) {
        historyList.innerHTML = "<li>No History Yet</li>";
        return;
    }

    urlHistory.forEach(url => {
        const li = document.createElement("li");

        li.innerHTML = `
            <a href="${url}" target="_blank">${url}</a>
            <button onclick="copyHistoryUrl('${url}')">Copy</button>
        `;

        historyList.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderHistory();
});

function copyHistoryUrl(url) {
    navigator.clipboard.writeText(url);
    alert("Copied!");
}

function clearHistory() {
    urlHistory = [];
    localStorage.removeItem("urlHistory");
    renderHistory();
}
