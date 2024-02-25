import { LISTINGS_API_URL } from "../js/constants.mjs";
import { makeRequest } from "./fetch.mjs";
import { displayPosts } from "../js/utils/displayListings.mjs";
import { displayErrorMessage } from "../js/utils/displayError.mjs";
import { debounce } from "../js/utils/debounce.mjs";


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
    const posts = await makeRequest(LISTINGS_API_URL + "?sort=created", { method: "GET" }, true);
    if (posts.ok) {
      postsArray = await posts.json();
      displayPosts(postsArray);
      sortByNewest();
    } else {
      displayErrorMessage("Could not refresh feed")
    }
  } catch {
    displayErrorMessage("Could not refresh feed");
  }
}

const searchInputElement = document.getElementById('searchInput');
if (searchInputElement) {
    searchInputElement.addEventListener('input', debounce(searchPosts, 1000));
}

const mySelectElement = document.getElementById('mySelect');
if (mySelectElement) {
    mySelectElement.addEventListener('change', function() {
    onSelected(this);
  });
};

/**
 * Handles the selection change event on sorting dropdown.
 * @param {HTMLSelectElement} selection The dropdown select element.
 */

function onSelected(selection) {
  let value = selection.value;
  if (value === 'Newest') {
    sortByNewest();
  } else if (value === 'Oldest') {
    sortByOldest();
  }
}

/**
 * Sorts the posts array by the newest posts.
 */

function sortByNewest() {
  postsArray.sort((a, b) => new Date(b.created) - new Date(a.created));
  displayPosts(postsArray);
}

/**
 * Sorts the posts array by the oldest posts.
 */

function sortByOldest() {
  postsArray.sort((a, b) => new Date(a.created) - new Date(b.created));
  displayPosts(postsArray);
}

function searchPosts() {
  try {
    const searchText = searchInputElement.value.toLowerCase();
    const filteredPosts = postsArray.filter(post => post.title.toLowerCase().includes(searchText));
    displayPosts(filteredPosts);
  } catch {
    displayErrorMessage("Error occurred during search.");
  }
}

refreshFeed();