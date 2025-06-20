import axios from "axios";
import { parseAddress } from "../utils/addressUtil.js";

// export const getAddressCoordinateController = async (req, res) => {
//   const { address } = req.query;

//   if (!address) {
//     return res.status(400).json({ error: "Address is required" });
//   }
//   const payload = parseAddress(address);

//   // Make the API request
//   const apiKey = process.env.GO_MAPS_API_KEYS;
//   const url = `https://addressvalidation.gomaps.pro/v1:validateAddress?key=${apiKey}`;
//   console.log("payload", payload);
//   try {
//     const response = await axios.post(url, payload);
//     console.log("Google API Response:", response.data);
//     if (response.data.status === "OK") {
//       const location = response.data.results[0].geometry.location;
//       return res.json({ ltd: location.lat, lng: location.lng });
//     } else {
//       console.error("Google API Error:", response.data.status);
//       throw new Error("Unable to fetch coordinates");
//     }
//   } catch (error) {
//     console.error("Error fetching coordinates:", error.message);
//     res.status(500).json({ error: "Error fetching coordinates ok" });
//   }
// };
export const getAddressCoordinateController = async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  const payload = parseAddress(address);

  // Make the API request
  const apiKey = process.env.REACT_APP_GO_MAPS_SEC_API_KEYS;
  const url = `https://addressvalidation.gomaps.pro/v1:validateAddress?key=${apiKey}`;

  try {
    const response = await axios.post(url, payload);
    console.log("Google API Response:", response.data);

    // Check if the response has results and a geocode with location data
    if (response.data.result && response.data.result.geocode) {
      const location = response.data.result.geocode.location;

      if (location) {
        return res.status(201).json({
          ltd: location.latitude,
          lng: location.longitude,
        });
      } else {
        throw new Error("Location not found in the geocode");
      }
    } else {
      throw new Error("Invalid response format or no geocode available");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    res
      .status(500)
      .json({ error: "Error fetching coordinates: " + error.message });
  }
};

export const getLatandLogController = async (req, res) => {
  const { address } = req.params;
  console.log("address", address);
  const apiKey = "pk.d059f309fba9296fce8f5566c8bb11c3";

  const geocodeUrl = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${address}&format=json`;

  try {
    const response = await axios.get(geocodeUrl);
    console.log(`Request URL: ${geocodeUrl}`);

    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      res.json({ lat: parseFloat(lat), lng: parseFloat(lon) });
    } else {
      res.status(404).json({ error: "No results found for the given address" });
    }
  } catch (error) {
    console.error("Error fetching geocode data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getDirectionsController = async (req, res) => {
  const { origin, destination } = req.query;
  const apiKey = "pk.d059f309fba9296fce8f5566c8bb11c3";

  // Check if origin and destination are provided
  if (!origin || !destination) {
    return res
      .status(400)
      .json({ error: "Origin and destination are required" });
  }

  try {
    const geocodeUrl = `https://us1.locationiq.com/v1/directions/driving/${origin};${destination}?key=${apiKey}&steps=true&alternatives=true&geometries=polyline&overview=full`;
    console.log("geocodeUrl", geocodeUrl);
    const response = await axios.get(geocodeUrl);

    // If directions are found
    if (response.data && response.data.routes) {
      return res.json(response.data.routes);
    } else {
      return res.status(404).json({ error: "No routes found" });
    }
  } catch (error) {
    console.error("Error fetching directions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getDistanceTimeController = async (req, res) => {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res
      .status(400)
      .json({ error: "Origin and destination are required" });
  }

  const apiKey = process.env.GO_MAPS_API_KEYS;
  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=${encodeURIComponent(
    destination
  )}&origins=${encodeURIComponent(origin)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    console.log("response.data", response.data);
    if (response.data.status === "OK") {
      const element = response.data.rows[0].elements[0];

      if (element.status === "ZERO_RESULTS") {
        return res.status(404).json({ error: "No routes found" });
      }

      // Extracting distance and duration from the response
      const distance = element.distance;
      const duration = element.duration;

      return res.json({
        distance: {
          text: distance.text,
          value: distance.value,
        },
        duration: {
          text: duration.text,
          value: duration.value,
        },
      });
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching distance and time" });
  }
};

// export const getAutoCompleteSuggestionsController = async (req, res) => {
//   const { input } = req.body;

//   if (!input) {
//     return res.status(400).json({ error: "Query is required" });
//   }

//   const apiKey = process.env.GOOGLE_MAPS_API;
//   const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
//     input
//   )}&key=${apiKey}`;

//   try {
//     const response = await axios.get(url);
//     if (response.data.status === "OK") {
//       const suggestions = response.data.predictions
//         .map((prediction) => prediction.description)
//         .filter((value) => value);
//       return res.json(suggestions);
//     } else {
//       throw new Error("Unable to fetch suggestions");
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error fetching suggestions" });
//   }
// };

// export const getCaptainsInTheRadiusController = async (req, res) => {
//   const { ltd, lng, radius } = req.body;

//   if (!ltd || !lng || !radius) {
//     return res
//       .status(400)
//       .json({ error: "Latitude, longitude, and radius are required" });
//   }

//   try {
//     const captains = await captainModel.find({
//       location: {
//         $geoWithin: {
//           $centerSphere: [[ltd, lng], radius / 6371],
//         },
//       },
//     });

//     return res.json(captains);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error fetching captains in the radius" });
//   }
// };
