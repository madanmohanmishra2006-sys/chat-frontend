// === FINAL ADMIN.JS FOR RENDER BACKEND ===
// Backend API base URL
const API = "https://chat-backend-v1sh.onrender.com/api";

// Common fetch helper with token auto attach
async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("CHAT_TOKEN");
  options.headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: "Bearer " + token } : {}),
  };
  const res = await fetch(API + path, options);
  return res.json();
}

// -------------------------------
// 1) ADMIN LOGIN (SETUP SECRET)
// -------------------------------
document.getElementById("setupBtn").onclick = async () => {
  const secret = document.getElementById("setupSecret").value.trim();
  if (!secret) return alert("Enter ADMIN_SECRET");

  try {
    const res = await fetch(API + "/admin/setup-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret }),
    });

    const data = await res.json();
    console.log("Admin Setup Response:", data);

    if (data.token) {
      localStorage.setItem("CHAT_TOKEN", data.token);
      alert("Admin authenticated successfully!");
    } else {
      alert(data.error || "Invalid secret");
    }
  } catch (err) {
    alert("Network error: " + err);
  }
};

// -------------------------------
// 2) LOAD PENDING USERS
// -------------------------------
document.getElementById("loadReqBtn").onclick = async () => {
  try {
    const data = await apiFetch("/admin/pending");
    console.log("Pending Users:", data);
    alert("Check console for pending users.");
  } catch (err) {
    alert("Failed: " + err);
  }
};

// -------------------------------
// 3) IMPERSONATE USER
// -------------------------------
document.getElementById("impersonateBtn").onclick = async () => {
  const id = document.getElementById("impersonateId").value.trim();
  if (!id) return alert("Enter a User ID");

  try {
    const data = await apiFetch("/admin/impersonate/" + id);
    console.log("Impersonate Response:", data);

    if (data.token) {
      localStorage.setItem("CHAT_TOKEN", data.token);
      localStorage.setItem("CHAT_USER", JSON.stringify(data.user));
      alert("Logged in as: " + data.user.name);
      window.location = "chat.html";
    } else {
      alert("Error: " + JSON.stringify(data));
    }
  } catch (err) {
    alert("Impersonate error: " + err);
  }
};
