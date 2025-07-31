// Cookie Consent Management
class CookieConsent {
  constructor() {
    this.cookieBar = document.getElementById("cookie-consent");
    this.acceptBtn = document.getElementById("cookie-accept");
    this.storageKey = "bubble-tea-cookie-consent";
    this.init();
  }

  init() {
    // Check if user has already accepted cookies
    if (!this.hasConsent()) {
      this.showCookieBar();
    }

    // Add event listener to accept button
    if (this.acceptBtn) {
      this.acceptBtn.addEventListener("click", () => this.acceptCookies());
    }
  }

  hasConsent() {
    return localStorage.getItem(this.storageKey) === "accepted";
  }

  showCookieBar() {
    // Small delay to ensure smooth animation
    setTimeout(() => {
      if (this.cookieBar) {
        this.cookieBar.classList.add("show");
      }
    }, 500);
  }

  hideCookieBar() {
    if (this.cookieBar) {
      this.cookieBar.classList.remove("show");
    }
  }

  acceptCookies() {
    // Save consent to localStorage
    localStorage.setItem(this.storageKey, "accepted");

    // Hide the cookie bar with animation
    this.hideCookieBar();

    // Optional: Add a small notification
    this.showAcceptanceNotification();
  }

  showAcceptanceNotification() {
    // Create a temporary notification
    const notification = document.createElement("div");
    notification.className = "cookie-notification";
    notification.innerHTML = `
      <span class="cookie-notification-icon">✅</span>
      <span>Cookie preferences saved!</span>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--matcha-green);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 15px var(--shadow-deep);
      z-index: 1001;
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-brew-primary);
      font-size: 0.9rem;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Method to reset consent (for testing purposes)
  resetConsent() {
    localStorage.removeItem(this.storageKey);
    this.showCookieBar();
  }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CookieConsent();
});

// Export for potential external use
window.CookieConsent = CookieConsent;
