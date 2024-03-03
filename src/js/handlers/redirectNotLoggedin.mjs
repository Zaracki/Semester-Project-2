import { checkLoggedIn } from "./checkIfLoggedIn.mjs";

const LoggedIn = checkLoggedIn();

showLoginPage(LoggedIn);

function showLoginPage(LoggedIn) {
  if (!LoggedIn) {
    window.location.href = '../login/index.html';
  }
}

