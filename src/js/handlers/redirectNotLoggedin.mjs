import { checkLoggedIn } from "./checkIfLoggedIn.mjs";

const LoggedIn = checkLoggedIn();

showLoginPage(LoggedIn);

function showLoginPage(LoggedIn) {
  const loginNavbar = document.getElementById('loginNavbar');
  const logoutNavbar = document.getElementById('logoutNavbar');

  if (!LoggedIn) {
    window.location.href = '../login/index.html';
  }
}

