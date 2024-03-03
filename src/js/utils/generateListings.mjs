/**
 * Generates HTML content for a given post, including its media (if available), title,
 * description, and a view button that redirects to the post's detailed page.
 *
 * @param {Object} post - The post object containing all necessary data to populate the HTML.
 * @param {string} post.id - The unique identifier for the post.
 * @param {string} post.title - The title of the post.
 * @param {string} post.body - The body content of the post. Currently not used in the function but included in the object structure.
 * @param {string} post.description - The description of the post.
 * @param {string} post.media - The URL to the post's media image.
 * @returns {HTMLElement} The listing card element populated with the post's information.
 */
function generatePostHtml(post) {
  const {title, description, media} = post;

  const listingCard = document.createElement("div");
  listingCard.className = "card card-width";

  const image = document.createElement("img");
  if (media) {
    image.src = media;
    image.className = "thumbnail-image-size";
    listingCard.appendChild(image);
  };

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = title;

  const cardDesc = document.createElement("p");
  cardDesc.className = "card-text";
  cardDesc.textContent = description;

  const cardButton = document.createElement("a");
  cardButton.className = "btn btn-primary"
  cardButton.textContent = "View";
  cardButton.addEventListener("click", () => {
    window.location.href = `product/?id=${post.id}`;
  });

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardDesc);
  cardBody.appendChild(cardButton);

  listingCard.appendChild(cardBody);

  return listingCard;
};


export {generatePostHtml};