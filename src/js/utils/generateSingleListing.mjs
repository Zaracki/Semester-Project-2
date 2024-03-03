import { updateCountdown } from '../utils/countdownTimer.mjs'; // Import the countdown timer function

/**
 * Generates HTML content for a given listing, including its image, title, description,
 * countdown to the listing's end date, and current bids.
 *
 * @param {Object} listing - The listing object containing all necessary data to populate the HTML.
 * @param {string} listing.endsAt - The end date and time for the listing.
 * @param {string} listing.title - The title of the listing.
 * @param {string} listing.description - The description of the listing.
 * @param {string} listing.media - The URL to the listing's media image.
 * @param {Object} listing._count - An object containing various counts related to the listing.
 * @param {number} listing._count.bids - The number of bids for the listing.
 * @param {Array} listing.bids - An array of bid objects related to the listing.
 * @returns {HTMLElement} The parent container element populated with the listing's information.
 */
function generateListingHtml(listing) {
  const {endsAt, title, description, media, _count, bids} = listing;
  
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

  listingBody.appendChild(listingTitle);
  listingBody.appendChild(listingDescription);
  listingBody.appendChild(currentBid);

  listingContain.appendChild(countdownTime);
  listingContain.appendChild(listingBody);

  const showBidsContainer = document.createElement("div");
  showBidsContainer.className = "container";

  const currentBidsTitle = document.createElement("h2");
  currentBidsTitle.textContent = "Current bids";

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

  showBidsContainer.appendChild(currentBidsTitle);
  showBidsContainer.appendChild(bidsListGroup);

  parentContainer.appendChild(imageContainer);
  parentContainer.appendChild(listingContain);
  parentContainer.appendChild(showBidsContainer);

  return parentContainer;
};

export {generateListingHtml};