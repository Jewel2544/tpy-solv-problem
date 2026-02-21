

const tabs = document.querySelectorAll(".tabBtn");
const cards = document.querySelectorAll(".jobCard");
let currentTab = "all";

function updateDashboard() {
  let interview = 0;
  let rejected = 0;
  let total = document.querySelectorAll(".jobCard").length;

  cards.forEach(card => {
    if(card.dataset.status === "interview") interview++;
    if(card.dataset.status === "rejected") rejected++;
  });

  document.getElementById("interviewCount").innerText = interview;
  document.getElementById("rejectedCount").innerText = rejected;
  document.getElementById("totalCount").innerText = total;
}

function filterJobs() {
  let visible = 0;

  cards.forEach(card => {
    if(currentTab === "all" || card.dataset.status === currentTab){
      card.style.display = "block";
      visible++;
    } else {
      card.style.display = "none";
    }
  });

  document.getElementById("tabCount").innerText = visible + " Jobs";
}

tabs.forEach(tab => {
  tab.addEventListener("click", function(){
    tabs.forEach(btn => btn.classList.remove("bg-blue-600","text-white"));
    this.classList.add("bg-blue-600","text-white");
    currentTab = this.dataset.tab;
    filterJobs();
  });
});

document.addEventListener("click", function(e){

  const card = e.target.closest(".jobCard");
  if(!card) return;

  if(e.target.classList.contains("interviewBtn")){
    card.dataset.status = "interview";
    card.querySelector(".statusText").innerText = "Interview";
    updateDashboard();
    filterJobs();
  }

  if(e.target.classList.contains("rejectBtn")){
    card.dataset.status = "rejected";
    card.querySelector(".statusText").innerText = "Rejected";
    updateDashboard();
    filterJobs();
  }

  if(e.target.classList.contains("deleteBtn")){
    card.remove();
    updateDashboard();
    filterJobs();
  }

});

updateDashboard();
filterJobs();

