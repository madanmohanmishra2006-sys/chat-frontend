const API = "https://chat-backend-v1sh.onrender.com";

// Send message
async function sendMsg() {
    const msg = document.getElementById("msg").value;

    await fetch(`${API}/chat/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: msg })
    });

    document.getElementById("msg").value = "";
    loadMessages();
}

// Load all messages
async function loadMessages() {
    const res = await fetch(`${API}/chat/all`);
    const msgs = await res.json();

    const msgBox = document.getElementById("messages");
    msgBox.innerHTML = "";

    msgs.forEach(m => {
        msgBox.innerHTML += `<p class="msg">${m.text}</p>`;
    });
}

setInterval(loadMessages, 2000);
loadMessages();
