import { makeRequest } from "../fetch.mjs";
import { LOGIN_API_URL } from "../constants.mjs";
import { addToLocalStorage } from "../utils/localstorage.mjs";
import { displayErrorMessage } from "../utils/displayError.mjs";

const form = document.querySelector("#loginForm");

async function loginUser(user) {
  try {
    const postBody = JSON.stringify(user);
    const myData = await makeRequest(LOGIN_API_URL, {  
      method: "POST",
      body: postBody,
    },
    false
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
        avatar: json.avatar,
        accessToken: json.accessToken,
      };
      // Store the user profile in local storage
      addToLocalStorage("userProfile", JSON.stringify(userProfile));
      window.location.href = "../index.html";   
    } else {
      displayErrorMessage("Login failed");
      console.log(postBody);
    }
  } catch (error) {
    displayErrorMessage("Login failed");
  }
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const userLoginDetails = Object.fromEntries(formData.entries());

  await loginUser(userLoginDetails);
});
