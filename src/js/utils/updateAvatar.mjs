import { makeRequest } from "../fetch.mjs";
import { UPDATE_AVATAR_API_URL } from "../constants.mjs";

document.addEventListener("DOMContentLoaded", function() {
  var bidForm = document.getElementById("avatarForm");

  bidForm.addEventListener("submit", function(event) {
      event.preventDefault(); 

      var avatarUrlInput = document.getElementById("avatarUrlInput");
      var imageUrl = avatarUrlInput.value;

      console.log(imageUrl);
      avatarUrlInput.value = "";
      console.log(imageUrl);
      updateAvatarUrl(imageUrl);
  });
});

const userProfile = localStorage.getItem('userProfile');

async function updateAvatarUrl(imageUrl) {

  const user = JSON.parse(userProfile);
  const nameId = user.name;

  const body = {
    avatar: imageUrl
  };

console.log(body)
  try {
  const myData = await makeRequest(`${UPDATE_AVATAR_API_URL}/${nameId}/media`, {
    method: 'PUT',
    body: JSON.stringify(body)
  }, true);
  console.log(myData);
  console.log(nameId);
  if (myData.ok) {

  } else {
    
  }
  } 
  catch (error) {
  
  }

}