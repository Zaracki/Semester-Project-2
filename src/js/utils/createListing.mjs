import { makeRequest } from "../fetch.mjs";
import { LISTINGS_API_URL } from "../constants.mjs";
import { refreshFeed } from "../homeListings.mjs";
import { displayErrorMessage } from "./displayError.mjs";

/**
 * Handles the post submission event.
 * Processes the input data and sends a POST request to the server.
 * Refreshes the feed upon successful post creation or displays an error message otherwise.
 * 
 * @async
 * @function handlePostSubmit
 * @param {Event} event - The event object associated with the form submission.
 * @returns {Promise<void>} A promise that resolves when the post is successfully submitted or an error occurs.
 */

export async function handleListingSubmit(event) {
  event.preventDefault(); 

  const title = event.target.querySelector("#listingTitle").value;
  const description = event.target.querySelector("#listingContent").value;
  const media = event.target.querySelector("#listingMedia").value;
  const deadline = event.target.querySelector("#listingDeadline").value;

  const listingData = {
    title: title,
    description: description || "",
    tags: [],
    media: [media] || [],
    endsAt: new Date(deadline).toISOString()
  };

  try {
    const myData = await makeRequest(LISTINGS_API_URL, {
      method: 'POST',
      body: JSON.stringify(listingData)
    }, true);
    if (myData.ok) {
      event.target.querySelector("#listingTitle").value = '';
      event.target.querySelector("#listingContent").value = '';
      event.target.querySelector("#listingMedia").value = '';
      event.target.querySelector("#listingDeadline").value = '';

      refreshFeed();
    } else {
      displayErrorMessage("Something went wrong creating the post");
    }
  } catch (error) {
    displayErrorMessage("Error creating post: " + error.message);
  }
};

/**
 * Attaches a submit event listener to the post creation form.
 * The listener is attached once the DOM content is fully loaded.
 * 
 * @function attachPostSubmitListener
 */

export function attachPostSubmitListener() {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createListingForm');
    if (form) {
      form.addEventListener('submit', handleListingSubmit);
    }
  });
};

attachPostSubmitListener();