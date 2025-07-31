// Bubble Tea Mixing Game - Contact Loader

// Load contact information from JSON
async function loadBubbleContact() {
  try {
    const contactResponse = await fetch("data/contact-info.json");
    if (contactResponse.ok) {
      const contactInfo = await contactResponse.json();
      displayContactInfo(contactInfo);
    }
  } catch (error) {
    console.error("Bubble contact loading error:", error);
  }
}

// Display contact information
function displayContactInfo(contactInfo) {
  const container = document.getElementById("contact-info-content");
  if (!container || !contactInfo.contact) return;

  let contactHTML = "";

  contactInfo.contact.forEach((info) => {
    // Format details text for better readability
    const formattedDetails = info.details.replace(/\n/g, "<br>");

    contactHTML += `
            <div class="contact-bubble-card">
                <div class="contact-bubble-icon">${info.icon}</div>
                <div class="contact-bubble-content">
                    <h3>${info.title}</h3>
                    <p>${formattedDetails}</p>
                    ${
                      info.link
                        ? `<a href="${info.link}" class="contact-bubble-link" target="_blank" rel="noopener noreferrer">${info.linkText}</a>`
                        : ""
                    }
                </div>
            </div>
        `;
  });

  container.innerHTML = contactHTML;
}

// Handle contact form submission
function setupBubbleContactForm() {
  const form = document.getElementById("bubble-contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      timestamp: new Date().toISOString(),
    };

    // Simulate form submission
    submitBubbleContact(contactData);
  });
}

// Submit contact form
function submitBubbleContact(contactData) {
  // Scroll to top of page
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "bubble-overlay";

  // Create spinner
  const spinner = document.createElement("div");
  spinner.className = "bubble-spinner";
  spinner.innerHTML = `
    <div class="spinner-container">
      <div class="spinner-ring"></div>
      <div class="spinner-text">Sending message...</div>
    </div>
  `;

  // Add overlay and spinner to page
  overlay.appendChild(spinner);
  document.body.appendChild(overlay);

  // Show loading state on button
  const submitButton = document.querySelector(".form-bubble-submit");
  const originalText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  // Simulate API call
  setTimeout(() => {
    // Replace spinner with notification
    const notification = document.createElement("div");
    notification.className = "bubble-notification";
    notification.textContent =
      "Thank you! Your message has been sent. We will contact you soon. 🧋";

    overlay.innerHTML = "";
    overlay.appendChild(notification);

    // Remove overlay after 3 seconds
    setTimeout(() => {
      overlay.remove();
    }, 3000);

    // Reset form
    document.getElementById("bubble-contact-form").reset();

    // Reset button
    submitButton.textContent = originalText;
    submitButton.disabled = false;

    // Save to localStorage for demo purposes
    saveBubbleContact(contactData);
  }, 2000);
}

// Show message to user
function showBubbleMessage(message, type) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `bubble-message bubble-message-${type}`;
  messageDiv.textContent = message;

  // Add to page
  document.body.appendChild(messageDiv);

  // Remove after 5 seconds
  setTimeout(() => {
    messageDiv.remove();
  }, 5000);
}

// Save contact data to localStorage
function saveBubbleContact(contactData) {
  try {
    const existingContacts = JSON.parse(
      localStorage.getItem("bubbleContacts") || "[]"
    );
    existingContacts.push(contactData);
    localStorage.setItem("bubbleContacts", JSON.stringify(existingContacts));
  } catch (error) {
    console.error("Failed to save contact:", error);
  }
}

// Initialize contact page
document.addEventListener("DOMContentLoaded", function () {
  loadBubbleContact();
  setupBubbleContactForm();
});
