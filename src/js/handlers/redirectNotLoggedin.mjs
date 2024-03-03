import { checkLoggedIn } from "./checkIfLoggedIn.mjs";

const LoggedIn = checkLoggedIn();

showLoginPage(LoggedIn);

/**
 * Redirects the user to the login page if they are not logged in.
 * This function evaluates the logged-in status provided by the `LoggedIn` parameter.
 * If the user is not logged in, it redirects them to the login page.
 *
 * @param {boolean} LoggedIn - A boolean flag indicating whether the user is logged in.
 */
function showLoginPage(LoggedIn) {
  if (!LoggedIn) {
    window.location.href = '../login/index.html';
  }
};

