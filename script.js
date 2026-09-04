const header = document.querySelector("[data-header]");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

const updateHeader = () => {
  if (header) header.classList.toggle("is-scrolled", window.scrollY > 18);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (toggle) toggle.addEventListener("click", () => {
  const isOpen = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!isOpen));
  toggle.querySelector(".sr-only").textContent = isOpen ? "Open navigation" : "Close navigation";
  if (nav) nav.classList.toggle("is-open", !isOpen);
});

if (nav) nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 720 && nav && toggle) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
}, { passive: true });

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px" }
  );
  revealItems.forEach((item) => observer.observe(item));
}

document.querySelectorAll("details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll("details[open]").forEach((openDetail) => {
      if (openDetail !== detail) openDetail.open = false;
    });
  });
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();
