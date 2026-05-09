(() => {
  if (typeof gsap === "undefined") return;

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const revealItems = document.querySelectorAll(".reveal");
  revealItems.forEach((item) => {
    gsap.fromTo(
      item,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 86%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  const heroTitle = document.querySelector(".hero-title");
  if (!heroTitle) return;

  const lines = Array.from(heroTitle.querySelectorAll("[data-line]"));
  if (!lines.length) return;

  lines.forEach((line) => {
    const text = line.textContent || "";
    const chars = [...text];
    line.textContent = "";

    const fragment = document.createDocumentFragment();
    chars.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.opacity = "0";
      span.style.display = "inline-block";
      span.style.transform = "translateY(22px)";
      fragment.appendChild(span);
    });
    line.appendChild(fragment);
  });

  const allChars = heroTitle.querySelectorAll("span");
  gsap.to(allChars, {
    opacity: 1,
    y: 0,
    duration: 0.55,
    ease: "power3.out",
    stagger: 0.024,
    delay: 0.15
  });
})();
