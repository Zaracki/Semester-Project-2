import { LISTINGS_API_URL } from "../js/constants.mjs";
import { makeRequest } from "../js/fetch.mjs";
import { displayErrorMessage } from "../js/utils/displayError.mjs";
import { generateListingHtml } from "../js/utils/generateSingleListing.mjs";

const resultsContainer = document.querySelector("#displaySingleListing");

/**
 * Extracts the post ID from the current URL's query parameters.
 * 
 * @returns {string|null} The ID of the post if present in the URL; otherwise, null.
 */
function getIdFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  if (id) {
    return id;
  }
  return null;
}

/**
 * Fetches a single post by its ID including its bids.
 * 
 * @param {string} id - The unique identifier of the post.
 * @returns {Promise<Object|null>} A promise that resolves to the post data as an object if the request is successful; otherwise, null.
 * @async
 */
async function getSinglePost(id) {
  try {
    const data = await makeRequest(`${LISTINGS_API_URL}/${id}?_bids=true`, { method: "GET" }, true);
    if (data.ok){
      return await data.json();     
    } else {
      displayErrorMessage("Error fetching single post")
    }
  } catch {
    displayErrorMessage("Error fetching single post")
    return null;
  }
}

/**
 * Generates the HTML content for a single post and appends it to the results container.
 * It retrieves the post ID from the URL, fetches the post data, and uses a utility function to generate the HTML.
 * 
 * @async
 */
async function generateSinglePost() {
  try {
    const postId = getIdFromUrl();
    if (postId) {
      const post = await getSinglePost(postId);
      if (post) {
        console.log(post)
        const currentSinglePost = generateListingHtml(post);
        resultsContainer.appendChild(currentSinglePost);
      } else {
        displayErrorMessage("Error retriving post")
      }
    }
  } catch {
    displayErrorMessage("Error retriving post")
  }
}

/**
 * The main entry point of the script. It calls the function to generate and display a single post's content.
 */
function main() {
  generateSinglePost();
}

main();