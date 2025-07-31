// Bubble Tea Mixing Game - Main JavaScript Loader

// Tea-themed global variables
let teaOrders = [];
let bubbleBlendData = {};
let customerFeedback = [];
let mixInstructions = {};

// Initialize the bubble tea experience
function initializeBubbleTea() {
  loadHeaderAndFooter();
  loadBubbleContent();
  setupBubbleInteractions();
  updateBubbleCopyright();
}

// Load header and footer dynamically
async function loadHeaderAndFooter() {
  try {
    const headerResponse = await fetch("teahead-header.html");
    const footerResponse = await fetch("tapioca-footer.html");

    if (headerResponse.ok) {
      const headerContent = await headerResponse.text();
      document.getElementById("header-container").innerHTML = headerContent;
      setupBubbleNavigation();
    }

    if (footerResponse.ok) {
      const footerContent = await footerResponse.text();
      document.getElementById("footer-container").innerHTML = footerContent;
    }
  } catch (error) {
    console.error("Bubble tea loading error:", error);
  }
}

// Load content from JSON files
async function loadBubbleContent() {
  try {
    // Load mix instructions
    const mixResponse = await fetch("data/mix-instructions.json");
    if (mixResponse.ok) {
      mixInstructions = await mixResponse.json();
      displayMixInstructions();
    }

    // Load customer feedback
    const feedbackResponse = await fetch("data/customer-feedback.json");
    if (feedbackResponse.ok) {
      customerFeedback = await feedbackResponse.json();
      displayBubbleFeedback();
    }

    // Load bubble blend data
    const blendResponse = await fetch("data/bubble-blends.json");
    if (blendResponse.ok) {
      bubbleBlendData = await blendResponse.json();
    }
  } catch (error) {
    console.error("Bubble content loading error:", error);
  }
}

// Display mix instructions
function displayMixInstructions() {
  const instructionsContainer = document.getElementById("mix-instructions");
  if (!instructionsContainer || !mixInstructions.instructions) return;

  let instructionsHTML = '<div class="mix-bubble-steps">';

  mixInstructions.instructions.forEach((step, index) => {
    instructionsHTML += `
            <div class="mix-bubble-step">
                <div class="step-bubble-number">${index + 1}</div>
                <div class="step-bubble-content">
                    <h4>${step.title}</h4>
                    <p>${step.description}</p>
                    ${
                      step.tips
                        ? `<div class="step-bubble-tips"><strong>Tip:</strong> ${step.tips}</div>`
                        : ""
                    }
                </div>
            </div>
        `;
  });

  instructionsHTML += "</div>";
  instructionsContainer.innerHTML = instructionsHTML;
  instructionsContainer.classList.add("loaded");
}

// Display customer feedback grid
function displayBubbleFeedback() {
  const feedbackContainer = document.getElementById("feedback-grid");
  if (!feedbackContainer || !customerFeedback.reviews) return;

  let feedbackHTML = "";

  customerFeedback.reviews.forEach((review) => {
    feedbackHTML += `
            <div class="feedback-bubble-card">
                <div class="feedback-bubble-content">
                    <div class="feedback-bubble-text">
                        "${review.comment}"
                    </div>
                    <div class="feedback-bubble-author">
                        <div class="feedback-bubble-name">${review.name}</div>
                        <div class="feedback-bubble-rating">
                            ${"⭐".repeat(review.rating)}
                        </div>
                    </div>
                </div>
            </div>
        `;
  });

  feedbackContainer.innerHTML = feedbackHTML;
  feedbackContainer.classList.add("loaded");
}

// Setup bubble navigation
function setupBubbleNavigation() {
  const burgerMenu = document.querySelector(".burger-bubble-menu");
  const nav = document.querySelector(".teahead-nav");

  if (burgerMenu && nav) {
    burgerMenu.addEventListener("click", function () {
      this.classList.toggle("active");
      nav.classList.toggle("active");

      // Block/unblock scroll when menu is open/closed
      if (nav.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });
  }

  // Close mobile menu when clicking on links
  const navLinks = document.querySelectorAll(".teahead-nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (burgerMenu && nav) {
        burgerMenu.classList.remove("active");
        nav.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });
}

// Setup bubble interactions
function setupBubbleInteractions() {
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add hover effects for flavor items
  const flavorItems = document.querySelectorAll(".flavor-item");
  flavorItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) rotate(2deg)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)";
    });
  });
}

// Update copyright year
function updateBubbleCopyright() {
  const copyrightElement = document.querySelector(".footer-bubble-copyright");
  if (copyrightElement) {
    const currentYear = new Date().getFullYear();
    copyrightElement.innerHTML = `© ${currentYear} Bubble Tea Mixing Game. All rights reserved.`;
  }
}

// Start bubble adventure (play button)
function startBubbleAdventure() {
  // Simple button effect
  const button = event.target;
  button.style.transform = "scale(0.95)";

  setTimeout(() => {
    button.style.transform = "scale(1)";
    // Here you would typically redirect to the game or show a modal
    alert("Bubble Tea Adventure starting soon! 🧋✨");
  }, 150);
}

// Mix bubble blend function
function mixBubbleBlend(baseTea, flavor, topping) {
  const blend = {
    base: baseTea,
    flavor: flavor,
    topping: topping,
    timestamp: new Date().toISOString(),
    id: generateBubbleId(),
  };

  teaOrders.push(blend);
  saveBubbleOrders();
  return blend;
}

// Generate unique bubble ID
function generateBubbleId() {
  return "bubble_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
}

// Save bubble orders to localStorage
function saveBubbleOrders() {
  try {
    localStorage.setItem("bubbleTeaOrders", JSON.stringify(teaOrders));
  } catch (error) {
    console.error("Failed to save bubble orders:", error);
  }
}

// Load bubble orders from localStorage
function loadBubbleOrders() {
  try {
    const saved = localStorage.getItem("bubbleTeaOrders");
    if (saved) {
      teaOrders = JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load bubble orders:", error);
  }
}

// Shake dashboard function
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

// Brew zone utilities
function createBrewZone(element) {
  element.classList.add("brew-zone");
  element.addEventListener("click", function () {
    this.style.transform = "scale(0.98)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 100);
  });
}

// Boba bar functions
function addBobaBar(element) {
  element.classList.add("boba-bar");
  element.style.background =
    "linear-gradient(135deg, var(--tapioca-brown) 0%, var(--boba-black) 100%)";
  element.style.color = "white";
  element.style.padding = "var(--bubble-spacing-sm)";
  element.style.borderRadius = "var(--bubble-radius-md)";
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeBubbleTea();
  loadBubbleOrders();

  // Add some fun interactive elements
  const heroSection = document.querySelector(".bubble-hero");
  if (heroSection) {
    heroSection.addEventListener("click", function (e) {
      if (e.target === this) {
        shakeDashboard();
      }
    });
  }
});

// Export functions for use in other scripts
window.bubbleTeaGame = {
  mixBubbleBlend,
  shakeDashboard,
  createBrewZone,
  addBobaBar,
  teaOrders,
  bubbleBlendData,
};
