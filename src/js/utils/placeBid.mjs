import { makeRequest } from "../fetch.mjs";
import { LISTINGS_API_URL } from "../constants.mjs";

document.addEventListener("DOMContentLoaded", function() {
  var bidForm = document.getElementById("bidForm");

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


async function placeBid(bid) {
  const listingsId = getListingsId();
  console.log(listingsId);

  const body = {
    amount: parseFloat(bid)
  }

  const bidSuccess = () => {
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  };

console.log(body)
  try {
  const myData = await makeRequest(`${LISTINGS_API_URL}/${listingsId}/bids`, {
    method: 'POST',
    body: JSON.stringify(body)
  }, true);
  console.log(myData);
  if (myData.ok) {
    bidSuccess();
      
  } else {
    
  }
  } 
  catch (error) {
  
  }

}

function getListingsId() {
  const currentPostId = new URLSearchParams(window.location.search).get('id');
  return currentPostId;
}

