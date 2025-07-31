// Bubble Tea Mixing Game - Interactive Functions

// Shake dashboard function for additional interactions
function shakeDashboard() {
  const dashboard = document.querySelector(".brew-main");
  if (dashboard) {
    // Simple shake effect without animation
    dashboard.style.transform = "translateX(-5px)";
    setTimeout(() => {
      dashboard.style.transform = "translateX(5px)";
      setTimeout(() => {
        dashboard.style.transform = "translateX(0)";
      }, 100);
    }, 100);
  }
}

// Add bubble effects to elements
function addBubbleEffects() {
  const cards = document.querySelectorAll(
    ".feature-bubble-card, .upgrade-bubble-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
      this.style.boxShadow = "0 15px 40px var(--shadow-deep)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 4px 20px var(--shadow-soft)";
    });
  });
}

// Initialize bubble interactions
document.addEventListener("DOMContentLoaded", function () {
  addBubbleEffects();
});
