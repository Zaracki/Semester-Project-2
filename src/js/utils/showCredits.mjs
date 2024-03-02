document.addEventListener("DOMContentLoaded", function() {
  // Retrieve user data from localStorage
  const userProfile = localStorage.getItem('userProfile');

  // Check if userProfile exists
  if (userProfile) {
      // Parse JSON string to JavaScript object
      const user = JSON.parse(userProfile);
    
      refreshTokenDisplay(user);
  } else {
      // Handle case where user data is not available
      console.log('User data not found in localStorage');
  }
});

export function refreshTokenDisplay(user) {    
  const creditsDisplay = document.getElementById('creditsDisplay');
  creditsDisplay.textContent = 'Credits: ' + user.credits;
}

