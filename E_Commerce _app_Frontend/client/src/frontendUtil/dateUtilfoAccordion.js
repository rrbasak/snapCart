// export default function formatDate (dateString) {
//   const date = new Date(dateString);

//   const daysOfWeek = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const dayOfWeek = daysOfWeek[date.getDay()];
//   const day = date.getDate();
//   const month = months[date.getMonth()];

//   return `${dayOfWeek}, ${day} ${month}`;
// };



// export default function formatDate(dateString) {
//   const date = new Date(dateString);
//   const today = new Date();
//   const tomorrow = new Date(today);
//   tomorrow.setDate(today.getDate() + 1);

//   const daysOfWeek = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const dayOfWeek = daysOfWeek[date.getDay()];
//   const day = date.getDate();
//   const month = months[date.getMonth()];

//   // Check if the date is today
//   if (
//     date.getDate() === today.getDate() &&
//     date.getMonth() === today.getMonth() &&
//     date.getFullYear() === today.getFullYear()
//   ) {
//     return "Today";
//   }

//   // Check if the date is tomorrow
//   if (
//     date.getDate() === tomorrow.getDate() &&
//     date.getMonth() === tomorrow.getMonth() &&
//     date.getFullYear() === tomorrow.getFullYear()
//   ) {
//     return "Tomorrow";
//   }

//   return `${dayOfWeek}, ${day} ${month}`;
// }

// First function: Format to "Today", "Tomorrow", or "Day, DD Month"

export default function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const isToday = date.toDateString() === today.toDateString();
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];

  if (isToday) {
    return `Today, ${day} ${month}`;
  } else if (isTomorrow) {
    return `Tomorrow, ${day} ${month}`;
  } else {
    return `${dayOfWeek}, ${day} ${month}`;
  }
}
// Second function: Format to "DD/MM/YYYY"
export function formatDate2(isoDateString) {
  const date = new Date(isoDateString);
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with '0' if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad
  const year = date.getFullYear(); // Get full year

  return `${day}/${month}/${year}`; // Return formatted date
}
