import { displayErrorMessage } from "./displayError.mjs";

/**
 * Attaches an event listener to the DOMContentLoaded event to initialize the refresh token display.
 */
document.addEventListener("DOMContentLoaded", function() {
  const userProfile = localStorage.getItem('userProfile');

  if (userProfile) {
      const user = JSON.parse(userProfile);
    
      refreshTokenDisplay(user);
  }
});

/**
 * Updates the display of user credits.
 * @param {Object} user - The user object containing the user's data.
 */
export function refreshTokenDisplay(user) {    
  const creditsDisplay = document.getElementById('creditsDisplay');
  creditsDisplay.textContent = 'Credits: ' + user.credits;
};