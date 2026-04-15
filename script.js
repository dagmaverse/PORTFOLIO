AOS.init({
  duration: 1000,
  once: true
});

// ===== CUSTOM CURSOR =====
const customCursor = document.getElementById('customCursor');
document.addEventListener('mousemove', (e) => {
  customCursor.style.left = e.clientX - 10 + 'px';
  customCursor.style.top = e.clientY - 10 + 'px';
});

// Hide custom cursor when mouse leaves window
document.addEventListener('mouseenter', () => {
  customCursor.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
  customCursor.style.opacity = '0';
});

// ===== PROGRESS BAR =====
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = (window.scrollY / scrollHeight) * 100;
  progressBar.style.width = scrollProgress + '%';
});

// ===== PARTICLES =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = `rgba(12, 138, 234, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Initialize particles
for (let i = 0; i < 50; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();

// Resize canvas on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ===== BUTTON RIPPLE EFFECT =====
document.querySelectorAll('.btn, .gradient-btn').forEach((button) => {
  button.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple to cards
document.querySelectorAll('.goal-box, .skill-card, .stat-box').forEach((card) => {
  card.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// ===== LAZY LOADING IMAGES =====
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.classList.remove('loading');
      observer.unobserve(img);
    }
  });
});

images.forEach((img) => {
  imageObserver.observe(img);
});

// ===== FLOATING ANIMATION =====
document.querySelectorAll('.home-img img, .about-img img').forEach((img) => {
  img.classList.add('floating');
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 16);
}

// Observe for counter
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      const countValue = parseInt(entry.target.dataset.count) || 5;
      animateCounter(entry.target, countValue);
    }
  });
});

document.querySelectorAll('.counter').forEach((el) => {
  counterObserver.observe(el);
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
      alert("Form submission successful!");
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
