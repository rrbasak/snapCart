// dateUtil.js
export function formatTimestampforOrder(timestamp) {
  //console.log("timestamp", timestamp);
  const date = new Date(timestamp);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const options = {
    weekday: "long", // Add the weekday to the format
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

// module.exports = formatTimestampforOrder;
