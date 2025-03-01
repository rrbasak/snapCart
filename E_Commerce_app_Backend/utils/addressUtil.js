export const parseAddress = (fullAddress) => {
  if (typeof fullAddress !== "string") {
    throw new TypeError("Expected fullAddress to be a string");
  }

  const parts = fullAddress.split(",").map((part) => part.trim());
  const regionCode = parts.pop();
  const locality = parts.pop();
  const addressLines = parts;

  return {
    address: {
      regionCode: regionCode || "IN",
      locality: locality || "",
      addressLines: addressLines.length ? addressLines : [""],
    },
  };
};
