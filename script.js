// ================================
// API Base URL
// ================================
const baseURL = "https://phi-lab-server.vercel.app/api/v1/lab";


// ================================
// Load All Issues
// ================================
async function loadIssues() {

  const container = document.getElementById("issuesContainer");

  // loading message
  container.innerHTML = `<p class="text-center text-gray-500">Loading Issues...</p>`;

  const res = await fetch(`${baseURL}/issues`);
  const data = await res.json();

  displayIssues(data.data);
}


// ================================
// Display Issues
// ================================
function displayIssues(issues) {

  const container = document.getElementById("issuesContainer");

  container.innerHTML = "";

  // issues count
  document.getElementById("issueCount").innerText =
    issues.length + " Issues";


// ================================
// Count Open / Closed Issues
// ================================

const openIssues =
issues.filter(issue => issue.status === "open").length;

const closedIssues =
issues.filter(issue => issue.status === "closed").length;

document.getElementById("openCount").innerText = openIssues;
document.getElementById("closedCount").innerText = closedIssues;
    

  if (issues.length === 0) {
    container.innerHTML = `<p class="text-center text-red-500">No Issues Found</p>`;
    return;
  }

  issues.forEach(issue => {

    const statusImage =
      issue.status === "open"
        ? "assets/Open-Status.png"
        : "assets/Closed-Status.png";

    const date = new Date(issue.updatedAt).toLocaleDateString();

    container.innerHTML += `

   <div onclick="openModal('${issue.title}','${issue.description}')"
      class="cursor-pointer card space-y-3 bg-slate-50 p-4 rounded-xl shadow-lg hover:shadow-xl transition">

      <div class="flex justify-between">

        <img class="h-8 w-8" src="${statusImage}" alt="status">

        <span class="font-semibold text-red-800 bg-red-100 py-2 px-4 rounded-xl">
          ${issue.priority}
        </span>

      </div>

      <h3 class="text-xl font-bold">
        ${issue.title}
      </h3>

      <p>
        ${issue.description.slice(0, 80)}...
      </p>

      <div class="flex gap-4">

        <span class="text-red-800 bg-red-100 py-1 px-3 rounded-xl text-sm">
          BUG
        </span>

        <span class="text-yellow-600 bg-yellow-100 py-1 px-3 rounded-xl text-sm">
          HELP WANTED
        </span>

      </div>

      <div class="flex justify-between text-sm text-gray-600">

        <p>${issue.assignee}</p>
        <p>${date}</p>

      </div>

    </div>

    `;
  });
}


// ================================
// Filter Issues
// ================================
async function filterIssues(status) {

  const res = await fetch(`${baseURL}/issues`);
  const data = await res.json();

  let filtered;

  if (status === "all") {
    filtered = data.data;
  } else {
    filtered = data.data.filter(
      issue => issue.status === status
    );
  }

  displayIssues(filtered);

  // active button highlight
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("bg-blue-500", "text-white");
  });

  document.getElementById(status).classList.add("bg-blue-500", "text-white");
}


// ================================
// Search Issues
// ================================
async function searchIssues() {

  const text = document.getElementById("searchInput").value;

  const res = await fetch(`${baseURL}/issues/search?q=${text}`);
  const data = await res.json();

  displayIssues(data.data);
}


// ================================
// Search with Enter key
// ================================
document
  .getElementById("searchInput")
  .addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
      searchIssues();
    }

  });


// ================================
// Show Issue Modal
// ================================
function openModal(title, description){

  document.getElementById("modalTitle").innerText = title;

  document.getElementById("modalDescription").innerText = description;

  const modal = document.getElementById("issueModal");

  modal.classList.remove("hidden");
  modal.classList.add("flex"); // center করার জন্য
}


// ================================
// Close Modal
// ================================
function closeModal(){

  const modal = document.getElementById("issueModal");

  modal.classList.remove("flex");
  modal.classList.add("hidden");

}


// ================================
// Page Load
// ================================
loadIssues();