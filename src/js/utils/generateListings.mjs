

function generatePostHtml(post) {
  const {id, title, body, description, media} = post;

  const listingCard = document.createElement("div");
  listingCard.className = "card card-width";

  const image = document.createElement("img");
  if (media) {
    image.src = media;
    image.className = "thumbnail-image-size";
    listingCard.appendChild(image);
  }

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