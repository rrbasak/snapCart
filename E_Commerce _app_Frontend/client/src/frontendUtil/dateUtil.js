// export default function formatTimestamp(timestamp) {
//   const date = new Date(timestamp);

//   const options = {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     second: "numeric",
//     timeZoneName: "short",
//   };

//   return date.toLocaleString("en-US", options);
// }

export default function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  ////console.log(date.toLocaleString("en-US", options));
  return date.toLocaleDateString("en-US", options);
}

// export function formatTimestampforreview(timestamp) {
//   const date = new Date(timestamp);
//   const now = new Date();
//   const timeDifference = Math.floor((now - date) / 1000); // Time difference in seconds

//   if (timeDifference < 60) {
//     return "just now";
//   }

//   const options = {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   };

//   return date.toLocaleDateString("en-US", options);
// }

export function formatTimestampforreview(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const timeDifference = Math.floor((now - date) / 1000); // Time difference in seconds

  if (timeDifference < 60) {
    return `${timeDifference} second${timeDifference > 1 ? "s" : ""} ago`;
  }

  const timeDifferenceInMinutes = Math.floor(timeDifference / 60);
  if (timeDifferenceInMinutes < 60) {
    return `${timeDifferenceInMinutes} minute${
      timeDifferenceInMinutes > 1 ? "s" : ""
    } ago`;
  }

  const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
  if (timeDifferenceInHours < 24) {
    return `${timeDifferenceInHours} hour${
      timeDifferenceInHours > 1 ? "s" : ""
    } ago`;
  }

  const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
  if (timeDifferenceInDays < 7) {
    return `${timeDifferenceInDays} day${
      timeDifferenceInDays > 1 ? "s" : ""
    } ago`;
  }

  const timeDifferenceInWeeks = Math.floor(timeDifferenceInDays / 7);
  if (timeDifferenceInWeeks < 4) {
    return `${timeDifferenceInWeeks} week${
      timeDifferenceInWeeks > 1 ? "s" : ""
    } ago`;
  }

  const timeDifferenceInMonths = Math.floor(timeDifferenceInDays / 30);
  if (timeDifferenceInMonths < 12) {
    return `${timeDifferenceInMonths} month${
      timeDifferenceInMonths > 1 ? "s" : ""
    } ago`;
  }

  const timeDifferenceInYears = Math.floor(timeDifferenceInMonths / 12);
  return `${timeDifferenceInYears} year${
    timeDifferenceInYears > 1 ? "s" : ""
  } ago`;
}
