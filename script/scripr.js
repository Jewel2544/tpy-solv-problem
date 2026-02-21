
const tabs = document.querySelectorAll(".tabBtn");
let currentTab = "all";

function updateCounts() {
  const cards = document.querySelectorAll(".jobCard");

  let interview = 0;
  let rejected = 0;

  cards.forEach(card => {
    if (card.dataset.status === "interview") interview++;
    if (card.dataset.status === "rejected") rejected++;
  });

  document.getElementById("interviewCount").innerText = interview;
  document.getElementById("rejectedCount").innerText = rejected;
  document.getElementById("totalCount").innerText = cards.length;
}

function filterCards() {
  const cards = document.querySelectorAll(".jobCard");
  let visible = 0;

  cards.forEach(card => {
    if (currentTab === "all" || card.dataset.status === currentTab) {
      card.style.display = "block";
      visible++;
    } else {
      card.style.display = "none";
    }
  });

  document.getElementById("tabCount").innerText = visible + " Jobs";
}

tabs.forEach(tab => {
  tab.addEventListener("click", function () {
    tabs.forEach(btn => btn.classList.remove("bg-blue-700","text-white"));
    this.classList.add("bg-blue-700","text-white");

    currentTab = this.dataset.tab;
    filterCards();
  });
});

document.addEventListener("click", function (e) {

  const card = e.target.closest(".jobCard");
  if (!card) return;

  // Interview
  if (e.target.innerText === "INTERVIEW") {
    card.dataset.status = "interview";
    card.querySelector(".statusBtn").innerText = "Interview";
    updateCounts();
    filterCards();
  }

  // Rejected
  if (e.target.innerText === "REJECTED") {
    card.dataset.status = "rejected";
    card.querySelector(".statusBtn").innerText = "Rejected";
    updateCounts();
    filterCards();
  }

  // Delete
  if (e.target.innerText === "DELETE") {
    card.remove();
    updateCounts();
    filterCards();
  }

});

updateCounts();
filterCards();
