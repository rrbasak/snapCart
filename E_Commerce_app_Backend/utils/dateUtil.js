// export function formatTimestamp(timestamp) {
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



export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}
