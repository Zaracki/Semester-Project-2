
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