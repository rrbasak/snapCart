import React, { useEffect, useState } from "react";

const LocationFetcher = ({ onLocationFetched }) => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const loc = { lat: latitude, lng: longitude };
            setLocation(loc);
            setError("");
            if (onLocationFetched) {
              onLocationFetched(loc);
            }
          },
          () => {
            setError("Failed to fetch location. Please allow location access.");
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    fetchLocation();
  }, [onLocationFetched]);

  return <>{error && <p style={{ color: "red" }}>{error}</p>}</>;
};

export default LocationFetcher;
