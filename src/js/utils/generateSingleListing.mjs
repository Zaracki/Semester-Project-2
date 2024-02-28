
import { updateCountdown } from '../utils/countdownTimer.mjs'; // Import the countdown timer function



function generateListingHtml(listing) {
  const {id, endsAt, title, description, media, _count} = listing;

  const bidsCount = _count.bids;

  const parentContainer = document.createElement("div");
  parentContainer.className = "container";

  const imageContainer = document.createElement("div");
  imageContainer.className = "row justify-content-center"

  const productImage = document.createElement("img");
  if (media) {
    productImage.src = media;
    productImage.className = "custom-image-size";
    imageContainer.appendChild(productImage);
  }
  

  const listingContain = document.createElement("div");
  listingContain.className = "card bg-light mb-3 mt-3";

  const countdownTime = document.createElement("div");
  countdownTime.className = "card-header";
  countdownTime.textContent = endsAt;
  
  const endsAtDate = new Date(endsAt);
  updateCountdown(endsAtDate, countdownTime);


  const listingBody = document.createElement("div");
  listingBody.className = "card-body";

  const listingTitle = document.createElement("h5");
  listingTitle.className = "card-title"
  listingTitle.textContent = title;

  const listingDescription = document.createElement("p");
  listingDescription.className = "card-text";
  listingDescription.textContent = description;

  const currentBid = document.createElement("p");
  currentBid.textContent = `Bids: ${bidsCount}`;

  const bidForm = document.createElement("div");
  bidForm.className = "input-group";

  const bidInput = document.createElement("input");
  bidInput.className = "form-control rounded card-width";
  bidInput.placeholder = "Enter your bid amount";

  const bidButton = document.createElement("button");
  bidButton.className = "btn btn-outline-primary"
  bidButton.textContent = "Bid";

  bidForm.appendChild(bidInput);
  bidForm.appendChild(bidButton);

  listingBody.appendChild(listingTitle);
  listingBody.appendChild(listingDescription);
  listingBody.appendChild(currentBid);
  listingBody.appendChild(bidForm);

  listingContain.appendChild(countdownTime);
  listingContain.appendChild(listingBody);


  parentContainer.appendChild(imageContainer);
  parentContainer.appendChild(listingContain);

  return parentContainer;
};


export {generateListingHtml};