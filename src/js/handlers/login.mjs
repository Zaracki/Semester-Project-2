import { makeRequest } from "../fetch.mjs";
import { LOGIN_API_URL } from "../constants.mjs";
import { addToLocalStorage } from "../utils/localstorage.mjs";
import { displayErrorMessage } from "../utils/displayError.mjs";

const form = document.querySelector("#loginForm");

/**
 * Attempts to log in a user using provided credentials.
 * Sends a POST request to the login API with the user's credentials. If successful,
 * the user's profile data and access token are stored in local storage, and the user is redirected to the homepage.
 * Displays an error message if login fails.
 *
 * @async
 * @param {Object} user - An object containing the user's login credentials.
 */
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
      const userProfile = {
        name: json.name,
        email: json.email,
        credits: json.credits,
        avatar: json.avatar,
        accessToken: json.accessToken,
      };
      addToLocalStorage("userProfile", JSON.stringify(userProfile));
      addToLocalStorage("accessToken", json.accessToken);
      window.location.href = "../index.html";   
    } else {
      displayErrorMessage("Login failed");
    }
  } catch (error) {
    displayErrorMessage("Login failed");
  }
};

/**
 * Adds an event listener to the login form to handle the submit event.
 * Prevents the default form submission, collects the form data into a user object,
 * and then calls the loginUser function with the collected data.
 */
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const userLoginDetails = Object.fromEntries(formData.entries());

  await loginUser(userLoginDetails);
});