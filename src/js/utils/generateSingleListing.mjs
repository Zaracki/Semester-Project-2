
import { updateCountdown } from '../utils/countdownTimer.mjs'; // Import the countdown timer function



function generateListingHtml(listing) {
  const {id, endsAt, title, description, media, _count, bids} = listing;
  
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


  
  const showBidsContainer = document.createElement("div");
  showBidsContainer.className = "container";

  const bidsListGroup = document.createElement("ul");
  bidsListGroup.className = "list-group";
  
  bids.forEach(bid => {
    const bidList = document.createElement("li");
    bidList.className = "list-group-item d-flex justify-content-between align-items-center"

    const biderName = document.createElement("p");
    biderName.textContent = bid.bidderName;
    
    const bidAmountBadge = document.createElement("span");
    bidAmountBadge.className = "badge bg-primary";
    bidAmountBadge.textContent = bid.amount;

    bidList.appendChild(biderName);
    bidList.appendChild(bidAmountBadge);

    bidsListGroup.appendChild(bidList);
  });

  showBidsContainer.appendChild(bidsListGroup);

  parentContainer.appendChild(imageContainer);
  parentContainer.appendChild(listingContain);
  parentContainer.appendChild(showBidsContainer);

  return parentContainer;
};


export {generateListingHtml};