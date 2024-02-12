const { DateTime } = require('luxon');

// Format Unix timestamps to readable date
const formatDate = (timestamp) => {
  const dt = DateTime.fromJSDate(timestamp);

  return dt.toLocaleString();
};

const formatHeight = (height) => {
  const feet = Math.floor(height / 12);
  const inches = height % 12;

  return `${feet}'${inches}"`
}

module.exports = { formatDate, formatHeight };