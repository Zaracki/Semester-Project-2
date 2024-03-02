document.addEventListener("DOMContentLoaded", function() {
  // Check if the user is logged in
  const isLoggedIn = checkLoggedIn();

  updateNavbar(isLoggedIn);

  const logoutButton = document.getElementById('logoutNavbar');
  if (logoutButton) {
      logoutButton.addEventListener('click', handleLogout);
  }

});

export function checkLoggedIn() {
  // Retrieve access token from localStorage
  const accessToken = getFromLocalStorage('accessToken');

  // Check if accessToken exists
  if (accessToken) {
      return true;
  }
  return false;
}

function updateNavbar(isLoggedIn) {
  const loginNavbar = document.getElementById('loginNavbar');
  const logoutNavbar = document.getElementById('logoutNavbar');

  if (isLoggedIn) {
    // Redirect the user to the login page
    if (logoutNavbar) logoutNavbar.style.display = 'block';
    if (loginNavbar) loginNavbar.style.display = 'none';
  } else {
    if (logoutNavbar) logoutNavbar.style.display = 'none';
    if (loginNavbar) loginNavbar.style.display = 'block';
}
}

function handleLogout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userProfile');
  window.location.href = '../login/index.html';
}

function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}