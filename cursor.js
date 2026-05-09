(() => {
  const isTouchDevice =
    window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(pointer: coarse)").matches;

  if (isTouchDevice) return;

  const dot = document.createElement("div");
  const ring = document.createElement("div");

  dot.className = "cursor-dot";
  ring.className = "cursor-ring";

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let pointerX = window.innerWidth * 0.5;
  let pointerY = window.innerHeight * 0.5;
  let ringX = pointerX;
  let ringY = pointerY;
  const ringEase = 0.16;
  let cursorVisible = false;

  const setVisible = (visible) => {
    cursorVisible = visible;
    const opacity = visible ? "1" : "0";
    dot.style.opacity = opacity;
    ring.style.opacity = opacity;
  };

  setVisible(false);

  const updatePointer = (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!cursorVisible) setVisible(true);
  };

  window.addEventListener("mousemove", updatePointer, { passive: true });
  window.addEventListener("mouseenter", () => setVisible(true), { passive: true });
  window.addEventListener("mouseleave", () => setVisible(false), { passive: true });

  window.addEventListener(
    "mousedown",
    () => {
      ring.style.transform = "translate(-50%, -50%) scale(0.9)";
    },
    { passive: true }
  );

  window.addEventListener(
    "mouseup",
    () => {
      ring.style.transform = "translate(-50%, -50%) scale(1)";
    },
    { passive: true }
  );

  const animate = () => {
    ringX += (pointerX - ringX) * ringEase;
    ringY += (pointerY - ringY) * ringEase;

    dot.style.left = `${pointerX}px`;
    dot.style.top = `${pointerY}px`;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
})();
