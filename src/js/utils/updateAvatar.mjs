import { makeRequest } from "../fetch.mjs";
import { UPDATE_AVATAR_API_URL } from "../constants.mjs";
import { refreshUser } from "./refreshUserProfile.mjs";
import { displayErrorMessage } from "./displayError.mjs";

// displayErrorMessage("Error occurred");


/**
 * Event listener for the DOMContentLoaded event to attach a submit event listener
 * to the avatar form, preventing its default submission and calling updateAvatarUrl
 * with the input value.
 */
document.addEventListener("DOMContentLoaded", function() {
  var avatarField = document.getElementById("avatarForm");

  avatarField.addEventListener("submit", function(event) {
      event.preventDefault(); 

      var avatarUrlInput = document.getElementById("avatarUrlInput");
      var imageUrl = avatarUrlInput.value;

      avatarUrlInput.value = "";
      updateAvatarUrl(imageUrl);
  });
});

const userProfile = localStorage.getItem('userProfile');

/**
 * Updates the user's avatar URL.
 * @async
 * @param {string} imageUrl - The new URL of the user's avatar image.
 * @throws Will throw an error if the request fails.
 */
async function updateAvatarUrl(imageUrl) {
  const user = JSON.parse(userProfile);
  const nameId = user.name;

  const body = {
    avatar: imageUrl
  };

  try {
  const myData = await makeRequest(`${UPDATE_AVATAR_API_URL}/${nameId}/media`, {
    method: 'PUT',
    body: JSON.stringify(body)
  }, true);
  
  if (myData.ok) {
    refreshUser();
    setTimeout(() => {
      window.location.reload();
      }, 500);
    } else {
      displayErrorMessage("Error updating avatar");
    }
  } catch (error) {
    displayErrorMessage("Error updating avatar");
  }
};