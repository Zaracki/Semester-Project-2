import { makeRequest } from "../fetch.mjs";
import { UPDATE_AVATAR_API_URL } from "../constants.mjs";
import { addToLocalStorage } from "../utils/localstorage.mjs";

const userProfile = localStorage.getItem('userProfile');

/**
 * Refreshes the user profile data by fetching updated information from the server.
 * This function retrieves the user's latest profile data, including name, email, credits, and avatar,
 * and updates the local storage with the new data.
 * 
 * @async
 * @export
 * @function refreshUser
 * @param {Object} user - The user object to refresh. This parameter is not used in the function and can be removed.
 * @throws Displays an error message if there is a problem with fetching or updating the user profile data.
 */
export async function refreshUser(user) {
  try {
    const user = JSON.parse(userProfile);
    const nameId = user.name;

    const myData = await makeRequest(`${UPDATE_AVATAR_API_URL}/${nameId}`, {  
      method: "GET"
    },
    true
    );
    if (myData.ok) {
      const json = await myData.json();
      const userProfile = {
        name: json.name,
        email: json.email,
        credits: json.credits,
        avatar: json.avatar
      };
      addToLocalStorage("userProfile", JSON.stringify(userProfile)); 
    } else {
      displayErrorMessage("Error occurred");
    }
  } catch (error) {
    displayErrorMessage("Error occurred");
  }
};
