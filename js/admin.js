const API = "https://chat-backend-v1sh.onrender.com";

// Approve user request
async function approveUser(id) {
    await fetch(`${API}/admin/approve/${id}`, {
        method: "POST"
    });
    loadRequests();
}

// Delete user request
async function deleteUser(id) {
    await fetch(`${API}/admin/delete/${id}`, {
        method: "DELETE"
    });
    loadRequests();
}

// Load pending requests
async function loadRequests() {
    const res = await fetch(`${API}/admin/requests`);
    const data = await res.json();

    const reqBox = document.getElementById("requests");
    reqBox.innerHTML = "";

    data.forEach(r => {
        reqBox.innerHTML += `
            <div class="req">
                <p>${r.username}</p>
                <button onclick="approveUser('${r._id}')">Approve</button>
                <button onclick="deleteUser('${r._id}')">Delete</button>
            </div>
        `;
    });
}

loadRequests();
