// Bubble Tea Mixing Game - News Loader

// Load news content from JSON files
async function loadBubbleNews() {
  try {
    // Load recipe updates
    const recipeResponse = await fetch("data/recipe-updates.json");
    if (recipeResponse.ok) {
      const recipeUpdates = await recipeResponse.json();
      displayRecipeUpdates(recipeUpdates);
    }

    // Load boba stories
    const storiesResponse = await fetch("data/boba-stories.json");
    if (storiesResponse.ok) {
      const bobaStories = await storiesResponse.json();
      displayBobaStories(bobaStories);
    }
  } catch (error) {
    console.error("Bubble news loading error:", error);
  }
}

// Display recipe updates
function displayRecipeUpdates(updates) {
  const container = document.getElementById("recipe-updates-content");
  if (!container || !updates.updates) return;

  let updatesHTML = "";

  updates.updates.forEach((update, index) => {
    updatesHTML += `
            <div class="flip-card" data-card-index="${index}">
                <div class="flip-card-inner">
                    <!-- Front side -->
                    <div class="flip-card-front update-bubble-card">
                        <div class="update-bubble-header">
                            <span class="update-bubble-date">${
                              update.date
                            }</span>
                            <span class="update-bubble-type">${
                              update.type
                            }</span>
                        </div>
                        <h3 class="update-bubble-title">${update.title}</h3>
                        <p class="update-bubble-description">${
                          update.description
                        }</p>
                        ${
                          update.features
                            ? `
                            <div class="update-bubble-features">
                                <h4>New Features:</h4>
                                <ul>
                                    ${update.features
                                      .slice(0, 2)
                                      .map((feature) => `<li>${feature}</li>`)
                                      .join("")}
                                </ul>
                            </div>
                        `
                            : ""
                        }
                        <div class="flip-hint">Click to see more details</div>
                    </div>
                    
                    <!-- Back side -->
                    <div class="flip-card-back update-bubble-card">
                        <h3 class="flip-card-back-title">${
                          update.backTitle
                        }</h3>
                        <div class="flip-card-back-content">
                            ${update.backContent
                              .map((paragraph) => `<p>${paragraph}</p>`)
                              .join("")}
                        </div>
                        <div class="flip-hint">Click to return</div>
                    </div>
                </div>
            </div>
        `;
  });

  container.innerHTML = updatesHTML;

  // Add click event listeners for flip animation
  const flipCards = container.querySelectorAll(".flip-card");
  flipCards.forEach((card) => {
    card.addEventListener("click", function (event) {
      // Prevent event bubbling to ensure only card clicks trigger the flip
      event.stopPropagation();
      this.classList.toggle("flipped");
    });
  });
}

// Display boba stories
function displayBobaStories(stories) {
  const container = document.getElementById("boba-stories-content");
  if (!container || !stories.stories) return;

  let storiesHTML = "";

  stories.stories.forEach((story, index) => {
    storiesHTML += `
            <div class="flip-card story-flip-card" data-card-index="${index}">
                <div class="flip-card-inner">
                    <!-- Front side -->
                    <div class="flip-card-front story-bubble-card">
                        <div class="story-bubble-content">
                            <h3 class="story-bubble-title">${story.title}</h3>
                            <p class="story-bubble-text">${story.content}</p>
                            <div class="story-bubble-author">
                                <strong>${story.author}</strong>
                                <span class="story-bubble-date">${story.date}</span>
                            </div>
                            ${
                              story.recipe
                                ? `
                                <div class="story-bubble-recipe">
                                    <h4>Featured Recipe:</h4>
                                    <p>${story.recipe}</p>
                                </div>
                            `
                                : ""
                            }
                            <div class="flip-hint">Click to read the full story</div>
                        </div>
                    </div>
                    
                    <!-- Back side -->
                    <div class="flip-card-back story-bubble-card story-card-back">
                        <h3 class="story-flip-card-back-title">${story.backTitle}</h3>
                        <div class="story-flip-card-back-content">
                            ${story.backContent
                              .map((paragraph) => `<p>${paragraph}</p>`)
                              .join("")}
                        </div>
                        <div class="story-bubble-author story-back-author">
                            <strong>${story.author}</strong>
                            <span class="story-bubble-date">${story.date}</span>
                        </div>
                        <div class="flip-hint">Click to return</div>
                    </div>
                </div>
            </div>
        `;
  });

  container.innerHTML = storiesHTML;

  // Add click event listeners for flip animation
  const flipCards = container.querySelectorAll(".story-flip-card");
  flipCards.forEach((card) => {
    card.addEventListener("click", function (event) {
      // Prevent event bubbling to ensure only card clicks trigger the flip
      event.stopPropagation();
      this.classList.toggle("flipped");
    });
  });
}

// Initialize news page
document.addEventListener("DOMContentLoaded", function () {
  loadBubbleNews();
});
