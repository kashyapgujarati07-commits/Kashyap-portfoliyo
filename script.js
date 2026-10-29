
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// Typing animation
const typingText = document.getElementById("typingText");
const phrases = [
  "web experiences",
  "creative websites",
  "digital solutions",
  "my coding skills"
];

let phraseIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
  const phrase = phrases[phraseIndex];

  typingText.textContent = phrase.substring(0, characterIndex);

  if (!deleting && characterIndex < phrase.length) {
    characterIndex++;
    setTimeout(typeEffect, 85);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typeEffect, 1300);
  } else if (characterIndex > 0) {
    characterIndex--;
    setTimeout(typeEffect, 40);
  } else {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeEffect, 300);
  }
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typeEffect();
} else {
  typingText.textContent = phrases[0];
}

// Reveal sections on scroll
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Update active navigation link
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: "-25% 0px -60% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form: prepare an email in the visitor's email application
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const message = formData.get("message").trim();

  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  formNote.textContent = "Opening your email application...";

  window.location.href =
    `mailto:kashyapgujarati07@gmail.com?subject=${subject}&body=${body}`;
});
