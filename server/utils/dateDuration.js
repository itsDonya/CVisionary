const { intervalToDuration } = require("date-fns");

exports.calculateDateDuration = (inputTime) => {
  const { years, months, days, hours, minutes, seconds } = intervalToDuration({
    start: new Date(),
    end: new Date(inputTime),
  });

  if (years) return `${years} years ago`;
  if (months) return `${months} months ago`;
  if (days && days > 7) return `${(days / 7).toFixed(0)} weeks ago`;
  if (days) return `${days} days ago`;
  if (hours) return `${hours} hours ago`;
  if (minutes) return `${minutes} minutes ago`;
  if (seconds) return `${seconds} seconds ago`;
};
