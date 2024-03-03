import { makeRequest } from "../../js/fetch.mjs";
import { REGISTER_API_URL } from "../constants.mjs";
import { displayErrorMessage } from "../utils/displayError.mjs";

const form = document.querySelector("#registerForm");

/**
 * Submits a registration request for a new user to the server.
 * This function sends user registration details to the server using a POST request.
 * If the registration is successful, it redirects the user to the homepage.
 * In case of failure, an error message is displayed.
 *
 * @async
 * @param {Object} user - An object containing the user's registration details.
 */
async function registerUser(user) {
  try {
    const postBody = JSON.stringify(user);
    const myData = await makeRequest(REGISTER_API_URL, { 
      method: "POST",
      body: postBody,
    });
    if (myData.ok) {
      window.location.href = "../index.html";
    } else {
      displayErrorMessage("Registration failed")
    };
  } catch {
    displayErrorMessage("Registration failed")
  }
};

/**
 * Adds an event listener to the registration form to handle the submit event.
 * Prevents the default form submission, collects the form data, and then
 * calls the registerUser function with the collected data.
 */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form)
  const userRegistrationDetails = Object.fromEntries(formData.entries())

  registerUser(userRegistrationDetails)
});