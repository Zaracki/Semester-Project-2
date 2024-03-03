import { makeRequest } from "../fetch.mjs";
import { LISTINGS_API_URL } from "../constants.mjs";
import { refreshUser } from "./refreshUserProfile.mjs";
import { displayErrorMessage } from "./displayError.mjs";

/**
 * Attaches an event listener to the DOMContentLoaded event to initialize bid submission handling.
 */
document.addEventListener("DOMContentLoaded", function() {
  var bidForm = document.getElementById("bidForm");

    /**
   * Attaches an event listener to the bid form for the submit event.
   */
  bidForm.addEventListener("submit", function(event) {
      event.preventDefault(); 

      var bidAmountInput = document.getElementById("bidAmount");
      var bidAmount = bidAmountInput.value;

      console.log("Bid amount submitted: " + bidAmount);
      console.log("Form submitted successfully!");
      bidAmountInput.value = "";
      console.log("bid was" + bidAmount);
      placeBid(bidAmount);
  });
});

/**
 * Submits a bid for a listing using the provided bid amount.
 * @async
 * @param {string} bid - The bid amount submitted by the user.
 */
async function placeBid(bid) {
  const listingsId = getListingsId();
  console.log(listingsId);

  const body = {
    amount: parseFloat(bid)
  }

  const bidSuccess = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  try {
    const myData = await makeRequest(`${LISTINGS_API_URL}/${listingsId}/bids`, {
      method: 'POST',
      body: JSON.stringify(body)
    }, true);
    if (myData.ok) {
      refreshUser();
      bidSuccess();
    } else {
      displayErrorMessage("Error submitting bid")
    }
  } 
  catch (error) {
    displayErrorMessage("Error submitting bid")
  }
};

/**
 * Retrieves the listing ID from the current URL query parameters.
 * @returns {string|null} The listing ID if present in the URL, otherwise null.
 */
function getListingsId() {
  const currentPostId = new URLSearchParams(window.location.search).get('id');
  return currentPostId;
};