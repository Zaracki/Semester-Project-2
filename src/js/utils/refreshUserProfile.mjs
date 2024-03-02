import { makeRequest } from "../fetch.mjs";
import { UPDATE_AVATAR_API_URL } from "../constants.mjs";
import { addToLocalStorage } from "../utils/localstorage.mjs";

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
