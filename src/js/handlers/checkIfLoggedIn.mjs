/**
 * Listens for the DOMContentLoaded event to check the user's login state and update the navigation bar accordingly.
 * Also sets up a click event listener for the logout button if it exists.
 */
document.addEventListener("DOMContentLoaded", function() {
  // Check if the user is logged in
  const isLoggedIn = checkLoggedIn();

  updateNavbar(isLoggedIn);

  const logoutButton = document.getElementById('logoutNavbar');
  if (logoutButton) {
      logoutButton.addEventListener('click', handleLogout);
  }

});

/**
 * Checks if the user is currently logged in by looking for an access token in local storage.
 * @returns {boolean} True if the user is logged in (access token exists), false otherwise.
 */
export function checkLoggedIn() {
  // Retrieve access token from localStorage
  const accessToken = getFromLocalStorage('accessToken');

  // Check if accessToken exists
  if (accessToken) {
      return true;
  }
  return false;
};

/**
 * Updates the navigation bar to show or hide the login and logout links based on the user's login state.
 * @param {boolean} isLoggedIn - True if the user is logged in, false otherwise.
 */
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
};

/**
 * Handles the logout process by removing the user's access token and profile from local storage and redirecting to the login page.
 */
function handleLogout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userProfile');
  window.location.href = '../login/index.html';
};

/**
 * Retrieves a value from local storage by its key.
 * @param {string} key - The key of the item to retrieve from local storage.
 * @returns {string|null} The value associated with the key, or null if the key does not exist.
 */
function getFromLocalStorage(key) {
  return localStorage.getItem(key);
};