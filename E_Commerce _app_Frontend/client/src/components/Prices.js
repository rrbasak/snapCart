// export const Prices = [
//   {
//     _id: 0,
//     name: "$0 to 19",
//     array: [0, 19],
//   },
//   {
//     _id: 1,
//     name: "$20 to 39",
//     array: [20, 39],
//   },
//   {
//     _id: 2,
//     name: "$40 to 59",
//     array: [40, 59],
//   },
//   {
//     _id: 3,
//     name: "$60 to 79",
//     array: [60, 79],
//   },
//   {
//     _id: 4,
//     name: "$80 to 99",
//     array: [80, 99],
//   },
//   {
//     _id: 4,
//     name: "$100 or more",
//     array: [100, 9999],
//   },
// ];

// export const Prices = [
//   {
//     _id: 0,
//     name: "₹100 to 500",
//     array: [100, 500],
//   },
//   {
//     _id: 1,
//     name: "₹500 to 1000",
//     array: [500, 1000],
//   },
//   {
//     _id: 2,
//     name: "₹1000 to 2000",
//     array: [1000, 2000],
//   },
//   {
//     _id: 3,
//     name: "₹2000 to 5000",
//     array: [2000, 5000],
//   },
//   {
//     _id: 4,
//     name: "₹5000 to 10000",
//     array: [5000, 10000],
//   },
//   {
//     _id: 4,
//     name: "₹10000 or more",
//     array: [10000, 100000],
//   },
// ];

const generatePriceRanges = (prices) => {
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;

  const ranges = [];
  let id = 0;
  const step = Math.ceil(priceRange / 10);
  ////console.log("Generating prices", prices);
  ////console.log("minPrice prices", minPrice);
  // Create ranges dynamically
  for (let start = minPrice; start < maxPrice; start += step) {
    const end = start + step;
    ranges.push({
      _id: id++,
      name: `₹${start} to ₹${end}`,
      array: [start, end],
    });
  }

  // Add a final "or more" range
  ranges.push({
    _id: id,
    name: `₹${maxPrice} or more`,
    array: [maxPrice, maxPrice * 10],
  });

  return ranges;
};
export default generatePriceRanges;
