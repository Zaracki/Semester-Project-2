/**
 * Updates the countdown timer displayed in the provided element to show the time remaining
 * until a specified end date and time. The function calculates the difference between the current
 * time and the end date, then formats this difference as hours, minutes, and seconds.
 * If the specified end time has passed, it updates the text content to indicate that the event has ended.
 * This function recursively calls itself every second to continuously update the countdown until the end time is reached.
 *
 * @param {Date} endsAtDate - The end date and time for which the countdown is being calculated.
 * @param {HTMLElement} countdownTime - The DOM element where the countdown is displayed.
 */
function updateCountdown(endsAtDate, countdownTime) {
  const now = new Date();
  const timeDifference = endsAtDate - now;

  if (timeDifference > 0) {
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      countdownTime.textContent = `Ends in: ${hours}h ${minutes}m ${seconds}s`;

      setTimeout(function () {
          updateCountdown(endsAtDate, countdownTime);
      }, 1000);
  } else {
      cardTitle.textContent = "The event has ended";
  }
}

export { updateCountdown };