
import { displayErrorMessage } from "./displayError.mjs";

/**
 * Attaches an event listener to the DOMContentLoaded event. Once the DOM is fully loaded, it retrieves the user's profile from localStorage.
 * If a user profile exists, it updates the DOM elements with the user's name and avatar. If no profile is found, logs a message to the console.
 */
document.addEventListener("DOMContentLoaded", function() {
  const userProfile = localStorage.getItem('userProfile');

  if (userProfile) {
      const user = JSON.parse(userProfile);
      
      const nameDisplay = document.getElementById('profileNameDisplay');
      const avatarDisplay = document.getElementById('profileAvatar');
      const avatarUrlInput = document.getElementById('avatarUrlInput');

      nameDisplay.textContent = user.name;
      avatarDisplay.src = user.avatar;
      avatarUrlInput.value = user.avatar;

  } else {
      displayErrorMessage("Error has occurred")
  }
});

