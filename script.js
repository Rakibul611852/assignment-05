
const manageSpinner = (status)=>{
  if(status==true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("issuesContainer").classList.add("hidden");
  } else {
    document.getElementById("issuesContainer").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
}

const baseURL = "https://phi-lab-server.vercel.app/api/v1/lab";
let allIssues = [];
async function loadIssues() {

  manageSpinner(true);
  const container = document.getElementById("issuesContainer");
  container.innerHTML = `
  <p class="text-center text-gray-500">Loading Issues...</p>
  `;

  const res = await fetch(`${baseURL}/issues`);
  const data = await res.json();

  allIssues = data.data;

  displayIssues(allIssues);


}

function displayIssues(issues) {

  const container = document.getElementById("issuesContainer");
  container.innerHTML = "";

  document.getElementById("issueCount").innerText =
    issues.length + " Issues";

  const openIssues = issues.filter(issue => issue.status === "open").length;
  const closedIssues = issues.filter(issue => issue.status === "closed").length;

  document.getElementById("openCount").innerText = openIssues;
  document.getElementById("closedCount").innerText = closedIssues;

  if (issues.length === 0) {
    container.innerHTML = `
    <p class="text-center text-red-500">No Issues Found</p>
    `;
    return;
  }

  issues.forEach(issue => {

    const date = new Date(issue.updatedAt).toLocaleDateString();

    const statusImage =
      issue.status === "open"
        ? "./assets/Open-Status.png"
        : "./assets/Closed-Status.png";

    const borderColor =
      issue.status === "open"
        ? "bg-green-500"
        : "bg-purple-500";

    const priorityColor =
      issue.priority === "high"
        ? "text-red-800 bg-red-100"
        : issue.priority === "medium"
        ? "text-yellow-800 bg-yellow-100"
        : "text-gray-800 bg-gray-200";

    const labelsHTML = issue.labels.map(label => {

      const labelClass =
        label.toLowerCase() === "bug"
          ? "text-red-800 bg-red-100"
          : label.toLowerCase() === "help wanted"
          ? "text-yellow-800 bg-yellow-100"
          : "text-gray-800 bg-gray-200";

      return `
      <span class="inline-block ${labelClass} px-3 py-1 rounded-full text-sm font-medium">
        ${label}
      </span>
      `;
    }).join("");

    container.innerHTML += `

    <div onclick="openModal('${issue.id}')"
    class="cursor-pointer card space-y-3 bg-slate-50 p-4 rounded-xl shadow-lg hover:shadow-xl transition">

      <div class="rounded-lg h-2 ${borderColor}"></div>

      <div class="flex justify-between items-center">

        <img class="h-8 w-8" src="${statusImage}" alt="status">

        <span class="font-semibold ${priorityColor} py-2 px-4 rounded-xl">
        ${issue.priority}
        </span>

      </div>

      <h3 class="text-xl font-bold">${issue.title}</h3>

      <p>${issue.description?.slice(0, 80)}...</p>

      <div class="flex flex-wrap gap-2 mt-2">
        ${labelsHTML}
      </div>

      <div class="justify-between flex text-sm text-gray-600 border-t pt-3 mt-3">

        <div class="space-y-2">
          <p class="font-semibold">Author: #${issue.id} ${issue.author}</p>
          <p class="font-semibold">Assignee: ${issue.assignee || "Unassigned"}</p>
        </div>

        <div class="space-y-2 text-right">
          <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
          <p>${date}</p>
        </div>

      </div>

    </div>
    `;
  });
    manageSpinner(false);
}

function filterIssues(status) {

  const filtered =
    status === "all"
      ? allIssues
      : allIssues.filter(issue => issue.status === status);

  displayIssues(filtered);

  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach(btn => {
    btn.classList.remove("bg-blue-700", "text-white");
    btn.classList.add("bg-gray-200", "text-gray-800");
  });

  const activeBtn = document.getElementById(status);

  if (activeBtn) {
    activeBtn.classList.add("bg-blue-700", "text-white");
    activeBtn.classList.remove("bg-gray-200", "text-gray-800");
  }
}

async function searchIssues() {

  const text = document.getElementById("searchInput").value.trim();
   manageSpinner(true);
  const res = await fetch(`${baseURL}/issues/search?q=${text}`);
  const data = await res.json();

  displayIssues(data.data);
}

document.getElementById("searchInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchIssues();
    }

  });

async function openModal(id) {

  const res = await fetch(`${baseURL}/issue/${id}`);
  const data = await res.json();

  const issue = data.data;

  document.getElementById("title").innerText = issue.title;
  document.getElementById("status").innerText = issue.status;
  document.getElementById("author").innerText = issue.author;
  document.getElementById("description").innerText = issue.description;
  document.getElementById("assignee").innerText =
    issue.assignee || "Unassigned";
  document.getElementById("priority").innerText = issue.priority;

  const date = new Date(issue.createdAt).toLocaleDateString();
  document.getElementById("date").innerText = date;

  const labelContainer = document.getElementById("labels");

  labelContainer.innerHTML = "";

  issue.labels.forEach(label => {

    let span = document.createElement("span");

    if (label === "bug") {
      span.className =
        "border border-red-400 text-red-500 px-3 py-1 rounded-full text-sm";
    } else {
      span.className =
        "border border-yellow-400 text-yellow-600 px-3 py-1 rounded-full text-sm";
    }

    span.innerText = label.toUpperCase();

    labelContainer.appendChild(span);
  });

  const modal = document.getElementById("issueModal");

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal() {

  const modal = document.getElementById("issueModal");

  modal.classList.remove("flex");
  modal.classList.add("hidden");
}

loadIssues();