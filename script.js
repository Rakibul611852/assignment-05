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

  const date = new Date(issue.updatedAt).toLocaleDateString();

  // status image ternary
  const statusImage = issue.status === "open"
    ? "./assets/Open-Status.png"
    : "./assets/Closed- Status .png";

  // border color ternary
  const borderColor = issue.status === "open"
    ? "bg-green-500"
    : "bg-purple-500";

 const priorityColor =
  issue.priority === "high"
    ? "text-red-800 bg-red-100"
    : issue.priority === "medium"
    ? "text-yellow-800 bg-yellow-100"
    : "text-gray-800 bg-gray-200";

const labelsHTML = issue.labels.map(label => {
  // label অনুযায়ী color assign
  const labelClass =
    label.toLowerCase() === "bug"
      ? "text-red-800 bg-red-100"
      : label.toLowerCase() === "help wanted"
      ? "text-yellow-800 bg-yellow-100"
      : "text-gray-800 bg-gray-200";

  return `<span class="inline-block ${labelClass} px-3 py-1 rounded-full text-sm font-medium">${label}</span>`;
}).join('');

    container.innerHTML += `
    
     <div onclick="openModal(
    '${issue.title}',
    '${issue.description}',
    '${statusImage}', 
    '${issue.priority}',
    '${issue.labels.join(", ")}',
    '${issue.author}',
    '${issue.updatedAt}'
  )"
    class="cursor-pointer card space-y-3 bg-slate-50 p-4 rounded-xl shadow-lg hover:shadow-xl transition">

    <!-- Top Border color -->
    <div class="rounded-lg h-2 ${borderColor}"></div>

    <!-- Header: Status image + Priority -->
    <div class="flex justify-between items-center">
      <img class="h-8 w-8" src="${statusImage}" alt="status">
      <span class="font-semibold ${priorityColor} py-2 px-4 rounded-xl">${issue.priority}</span>
    </div>

    <!-- Title -->
    <h3 class="text-xl font-bold">${issue.title}</h3>

    <!-- Description -->
    <p>${issue.description.slice(0, 80)}...</p>

    <!-- Labels -->
    <div class="flex flex-wrap gap-2 mt-2">
      ${labelsHTML}
  
    </div>

    <!-- Footer: Author + Updated date with top border -->
    <div class=" justify-between text-sm text-gray-600 border-t pt-3 mt-3 space-x-3">
      <p># by ${issue.author}</p>
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

  // Filter data
  const filtered = status === "all" 
    ? data.data 
    : data.data.filter(issue => issue.status === status);

  // Display cards
  displayIssues(filtered);

  // Active button highlight
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    // Reset all to normal
    btn.classList.remove("bg-blue-500", "text-white");
    btn.classList.add("bg-gray-200", "text-gray-800");
  });

  // Set clicked button active
  const activeBtn = document.getElementById(status);
  if (activeBtn) {
    activeBtn.classList.add("bg-blue-500", "text-white");
    activeBtn.classList.remove("bg-gray-200", "text-gray-800");
  }
  
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