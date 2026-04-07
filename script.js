const splashScreen = document.getElementById("splashScreen");
const splashEnter = document.getElementById("splashEnter");
const splashSkip = document.getElementById("splashSkip");
const revealItems = document.querySelectorAll("[data-reveal]");

function hideSplash() {
  if (!splashScreen || splashScreen.classList.contains("is-hidden")) {
    return;
  }

  splashScreen.classList.add("is-hidden");
  document.body.classList.remove("splash-lock");
}

function setupSplash() {
  if (!splashScreen) {
    return;
  }

  document.body.classList.add("splash-lock");
  const timeout = window.setTimeout(hideSplash, 6000);

  [splashEnter, splashSkip].forEach((button) => {
    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      window.clearTimeout(timeout);
      hideSplash();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      window.clearTimeout(timeout);
      hideSplash();
    }
  });
}

function setupReveal() {
  if (!revealItems.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.16
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

setupSplash();
setupReveal();
