import { makeRequest } from "../fetch.mjs";
import { UPDATE_AVATAR_API_URL } from "../constants.mjs";
import { addToLocalStorage } from "../utils/localstorage.mjs";
import { refreshTokenDisplay } from "./showCredits.mjs";

const userProfile = localStorage.getItem('userProfile');

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
      const token = json.accessToken;
      const username = json.name;
      // Assuming the API response includes the user profile details
      const userProfile = {
        name: json.name,
        email: json.email,
        credits: json.credits,
        avatar: json.avatar
      };
      // Store the user profile in local storage
      addToLocalStorage("userProfile", JSON.stringify(userProfile)); 
    } else {
      displayErrorMessage("Error occurred");
    }
  } catch (error) {
    displayErrorMessage("Error occurred");
  }
};
