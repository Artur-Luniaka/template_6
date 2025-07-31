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

  updates.updates.forEach((update) => {
    updatesHTML += `
            <div class="update-bubble-card">
                <div class="update-bubble-header">
                    <span class="update-bubble-date">${update.date}</span>
                    <span class="update-bubble-type">${update.type}</span>
                </div>
                <h3 class="update-bubble-title">${update.title}</h3>
                <p class="update-bubble-description">${update.description}</p>
                ${
                  update.features
                    ? `
                    <div class="update-bubble-features">
                        <h4>New Features:</h4>
                        <ul>
                            ${update.features
                              .map((feature) => `<li>${feature}</li>`)
                              .join("")}
                        </ul>
                    </div>
                `
                    : ""
                }
            </div>
        `;
  });

  container.innerHTML = updatesHTML;
}

// Display boba stories
function displayBobaStories(stories) {
  const container = document.getElementById("boba-stories-content");
  if (!container || !stories.stories) return;

  let storiesHTML = "";

  stories.stories.forEach((story) => {
    storiesHTML += `
            <div class="story-bubble-card">
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
                </div>
            </div>
        `;
  });

  container.innerHTML = storiesHTML;
}

// Initialize news page
document.addEventListener("DOMContentLoaded", function () {
  loadBubbleNews();
});
