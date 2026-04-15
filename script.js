AOS.init({
  duration: 1000,
  once: true
});

// MENU
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  navbar.classList.toggle("active");
  menuIcon.textContent =
    menuIcon.textContent.trim() === "menu" ? "close" : "menu";
};

// CLOSE MENU WHEN CLICK
document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    menuIcon.textContent = "menu";
  });
});

// DARK MODE
let darkMode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-icon");

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
};

const updateIcon = () => {
  themeSwitch.textContent = document.body.classList.contains("darkmode")
    ? "light_mode"
    : "dark_mode";
};

if (darkMode === "active") enableDarkmode();
updateIcon();

themeSwitch.addEventListener("click", () => {
  darkMode === "active" ? disableDarkmode() : enableDarkmode();
  darkMode = localStorage.getItem("darkmode");
  updateIcon();
});

// TYPING EFFECT
const words = ["Student", "Learner", "Developer"];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function type() {
  currentWord = words[i];

  if (isDeleting) j--;
  else j++;

  document.getElementById("typing-text").textContent =
    currentWord.substring(0, j);

  if (!isDeleting && j === currentWord.length) {
    isDeleting = true;
    setTimeout(type, 1000);
    return;
  }

  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % words.length;
  }

  setTimeout(type, isDeleting ? 50 : 100);
}

type();

// ACTIVE NAV
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let top = window.scrollY;

  sections.forEach(sec => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove("active");
      });
      const activeLink = document.querySelector(".navbar a[href*=" + id + "]");
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
});

// SCROLL TO TOP
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// FORM VALIDATION
const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Validate form fields
  const name = form.querySelector('[name="Fullname"]').value.trim();
  const email = form.querySelector('[name="Email"]').value.trim();
  const message = form.querySelector('[name="message"]').value.trim();

  if (!name || !email || !message) {
    result.innerHTML = "Please fill in all fields.";
    result.style.display = "block";
    return;
  }

  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."
  result.style.display = "block";

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
  .then(async (response) => {
    let json = await response.json();
    if (response.status == 200) {
      result.innerHTML = json.message;
    } else {
      console.log(response);
      result.innerHTML = json.message;
    }
  })
  .catch(error => {
    console.log(error);
    result.innerHTML = "Something went wrong!";
  })
  .then(function() {
    form.reset();
    setTimeout(() => {
      result.style.display = "none";
    }, 3000);
  });
});
