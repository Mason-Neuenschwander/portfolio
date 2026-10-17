// Paste the Power BI "Publish to web" embed URL between the quotes below.
// Example format: https://app.powerbi.com/view?r=...
const POWER_BI_EMBED_URL = "https://app.fabric.microsoft.com/view?r=eyJrIjoiNzM4ZDQ3ZGMtYzY0Ni00OTgzLTgyNTItOTg0MzAwYWRlNTQzIiwidCI6IjMzYmY2MTRkLTY3ZjQtNGE5YS05YmUzLTIxMzliZTQxNDIzYyJ9";

const frame = document.getElementById("powerbi-frame");
const placeholder = document.getElementById("powerbi-placeholder");

if (POWER_BI_EMBED_URL.trim()) {
  frame.src = POWER_BI_EMBED_URL.trim();
  frame.style.display = "block";
  placeholder.style.display = "none";
}

document.getElementById("year").textContent = new Date().getFullYear();

