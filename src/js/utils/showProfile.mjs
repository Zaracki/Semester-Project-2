import { makeRequest } from "../fetch.mjs";
import { REGISTER_API_URL } from "../constants.mjs";

document.addEventListener("DOMContentLoaded", function() {
  const userProfile = localStorage.getItem('userProfile');

  if (userProfile) {
      const user = JSON.parse(userProfile);
      
      const nameDisplay = document.getElementById('profileNameDisplay');
      const avatarDisplay = document.getElementById('profileAvatar');
      const avatarUrlInput = document.getElementById('avatarUrlInput');

      nameDisplay.textContent = user.name;
      avatarDisplay.src = user.avatar;
      avatarUrlInput.value = user.avatar;

      updateAvatarButton.addEventListener('click', function() {
        const newAvatarUrl = avatarUrlInput.value;
        user.avatar = newAvatarUrl; 

          const myData = makeRequest(`${REGISTER_API_URL}`, {
            method: 'PUT',
            body: JSON.stringify({avatar: newAvatarUrl})
          }, true);
          console.log(myData);
          if (myData.ok) {

        
        }
        
    });

  } else {
      console.log('User data not found in localStorage');
  }
});

