/**
 *
 * @param {string} endsAt date and time when the event ends, formatted as a string.
 * @returns { days: number, hours: number, minutes: number }: An object representing the remaining time in days, hours, and minutes.
 * This function calculates the time difference between the current date and the provided endsAt date. It returns an object containing the number of days, hours, and minutes left until the specified end date.
 */
export function calculateTimeLeft(endsAt) {
  const now = new Date();
  const endsAtDate = new Date(endsAt);
  const timeDifference = endsAtDate - now;

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes };
}
