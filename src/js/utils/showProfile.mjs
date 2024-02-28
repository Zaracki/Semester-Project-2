
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

  } else {
      console.log('User data not found in localStorage');
  }
});

