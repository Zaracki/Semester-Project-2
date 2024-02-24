import { LISTINGS_API_URL } from "../js/constants.mjs";
import { makeRequest } from "./fetch.mjs";
import { displayPosts } from "../js/utils/displayListings.mjs";
import { displayErrorMessage } from "../js/utils/displayError.mjs";


let postsArray = [];

/**
 * Refreshes the feed by loading posts if the user is logged in.
 * Displays login screen otherwise.
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when the feed is refreshed.
 * @throws {Error} Throws an error if the request fails or if an error occurs in displaying posts.
 */

export async function refreshFeed() {
  try {
    const posts = await makeRequest(LISTINGS_API_URL, { method: "GET" }, true);
    if (posts.ok) {
      postsArray = await posts.json();
      displayPosts(postsArray);
    } else {
      displayErrorMessage("Could not refresh feed")
    }
  } catch {
    displayErrorMessage("Could not refresh feed");
  }
}

const mySelectElement = document.getElementById('mySelect');
if (mySelectElement) {
    mySelectElement.addEventListener('change', function() {
    onSelected(this);
  });
};

refreshFeed();