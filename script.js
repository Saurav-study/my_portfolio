// ================= SMOOTH SCROLL =================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));

    if(target){
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});


// ================= NAVBAR SCROLL EFFECT =================

const navbar = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if(window.scrollY > 50){
    navbar.style.background = "rgba(2,6,23,0.95)";
    navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
  } else {
    navbar.style.background = "rgba(2,6,23,0.7)";
    navbar.style.boxShadow = "none";
  }
});


// ================= SCROLL REVEAL =================

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll("section").forEach(section => {
  section.classList.add("hidden");
  observer.observe(section);
});


// ================= TYPING EFFECT (FIXED) =================

const text = "Java Developer • Python Developer • DSA Enthusiast";
let index = 0;

const typingElement = document.querySelector(".hero-subtitle");

typingElement.textContent = ""; // clear first

function typingEffect(){
  if(index < text.length){
    typingElement.textContent += text.charAt(index);
    index++;
    setTimeout(typingEffect, 60);
  }
}

window.addEventListener("load", typingEffect);


// ================= ACTIVE NAV LINK =================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;

    if(pageYOffset >= sectionTop - 200){
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if(link.getAttribute("href") === "#" + current){
      link.classList.add("active");
    }
  });
});


// ================= BUTTON GLOW EFFECT =================

document.querySelectorAll(".btn").forEach(btn => {

  btn.addEventListener("mouseenter", () => {
    btn.style.boxShadow = "0 0 25px #38bdf8";
    btn.style.transform = "translateY(-3px)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.boxShadow = "none";
    btn.style.transform = "translateY(0)";
  });

});


// ================= IMAGE PARALLAX (EXTRA PREMIUM) =================

const heroImage = document.querySelector(".hero-image-container");

window.addEventListener("mousemove", (e) => {
  if(heroImage){
    let x = (window.innerWidth / 2 - e.pageX) / 30;
    let y = (window.innerHeight / 2 - e.pageY) / 30;

    heroImage.style.transform = `translate(${x}px, ${y}px)`;
  }
});