

function generatePostHtml(post) {
  const {id, title, body, media} = post;

  const listingCard = document.createElement("div");
  listingCard.className = "card card-width";

  const image = document.createElement("img");
  if (media) {
    image.src = media;
    image.className = "thumbnail-image-size";
    listingCard.appendChild(image);
  }


  return listingCard;
};

export {generatePostHtml};