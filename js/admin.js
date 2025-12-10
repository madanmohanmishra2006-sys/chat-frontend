// FINAL RENDER VERSION — JARVIS APPROVED
const API = "https://chat-backend-v1sh.onrender.com/api";

// Universal fetch helper
async function apiFetch(path, opts = {}) {
  const token = localStorage.getItem("CHAT_TOKEN");
  opts.headers = {
    ...(opts.headers || {}),
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
  const res = await fetch(API + path, opts);
  return await res.json();
}

// ===== ADMIN SETUP TOKEN =====
document.getElementById("setupBtn").onclick = async () => {
  const secret = document.getElementById("setupSecret").value.trim();
  const j = await apiFetch("/admin/setup", {
    method: "POST",
    body: JSON.stringify({ secret }),
  });
  alert(JSON.stringify(j));
  if (j.token) {
    localStorage.setItem("CHAT_TOKEN", j.token);
  }
};

// ===== LOAD PENDING REQUESTS =====
document.getElementById("loadReqBtn").onclick = async () => {
  const j = await apiFetch("/admin/pending");
  console.log(j);
  alert(JSON.stringify(j, null, 2));
};

// ===== IMPERSONATE =====
document.getElementById("impersonateBtn").onclick = async () => {
  const userId = document.getElementById("impersonateId").value.trim();
  const j = await apiFetch("/admin/impersonate", {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
  console.log(j);
  if (j.token) {
    localStorage.setItem("CHAT_TOKEN", j.token);
    window.location = "chat.html";
  } else {
    alert(JSON.stringify(j));
  }
};
