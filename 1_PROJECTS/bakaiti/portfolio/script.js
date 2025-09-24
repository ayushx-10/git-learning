// ==== Project Form Handling ====
const projectForm = document.getElementById("projectForm");
const projectList = document.getElementById("projectList");

projectForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("projectName").value;
  const link = document.getElementById("projectLink").value;
  const desc = document.getElementById("projectDesc").value;
  const imgPath = document.getElementById("projectImg").value || "images/default.jpg";

  const li = document.createElement("li");
  li.innerHTML = `
    <img src="${imgPath}" alt="Project Image" class="card-img">
    <strong>${name}</strong><br>
    ${desc}<br>
    <a href="${link}" target="_blank">View</a>`;
  projectList.appendChild(li);

  projectForm.reset();
});

// ==== Contact Form Handling ====
const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

contactForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const phone = document.getElementById("contactPhone").value;
  const imgPath = document.getElementById("contactImg").value || "images/default.jpg";

  const li = document.createElement("li");
  li.innerHTML = `
    <img src="${imgPath}" alt="Contact Image" class="card-img">
    <strong>${name}</strong> - ${email} ${phone ? "- " + phone : ""}`;
  contactList.appendChild(li);

  contactForm.reset();
});

// ==== Scroll Animation ====
const sections = document.querySelectorAll("section");
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(sec => {
    const boxTop = sec.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      sec.classList.add("show");
    }
  });
};
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
