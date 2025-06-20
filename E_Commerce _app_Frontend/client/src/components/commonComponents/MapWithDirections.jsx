import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import { TwoWheeler } from "@mui/icons-material";
import polyline from "@mapbox/polyline";

const MapWithDirections = ({
  userLocation,
  deliveryPartnerLocation,
  setMapRef,
  UserLabel,
  deliveryPartnerLabel,
}) => {
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null); 
  const [snappedPolyline, setSnappedPolyline] = useState(null);

  const fetchDirections = async (origin, destination) => {
    console.log("origin",origin);
    console.log("destination", destination);
    try {
      // const response = await fetch(
      //   `https://maps.gomaps.pro/maps/api/directions/json?destination=${destination.lat},${destination.lng}&origin=${origin.lat},${origin.lng}&key=${process.env.REACT_APP_GO_MAPS_SEC_API_KEYS}`
      // );

      const response = await fetch(
        `${process.env.REACT_APP_API}/api/v1/map/get-direction?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`
      );
      const data = await response.json();
      console.log("data", data);
      if (data && data[0]) {
        const steps = data[0].legs[0].steps.map((step) => {
          return polyline.decode(step.geometry);
        });

        const decodedPolyline = [].concat(...steps).map((point) => ({
          lat: point[0],
          lng: point[1],
        }));

        setDirections(decodedPolyline);
      } else {
        console.error("No routes found");
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  useEffect(() => {
    if (userLocation && deliveryPartnerLocation) {
      fetchDirections(deliveryPartnerLocation, userLocation);
    }
  }, [userLocation, deliveryPartnerLocation]);

  const snapToRoads = async (steps) => {
    const path = steps.flatMap((step) => [
      { lat: step.start_location.lat, lng: step.start_location.lng },
      { lat: step.end_location.lat, lng: step.end_location.lng },
    ]);

    const pathStrings = path
      .map((point) => `${point.lat},${point.lng}`)
      .join("|");

    // Make a request to the Google Maps Roads API to snap the path to the road
    try {
      const response = await fetch(
        `https://roads.googleapis.com/v1/snapToRoads?path=${pathStrings}&key=${process.env.REACT_APP_GO_MAPS_SEC_API_KEYS}`
      );
      const data = await response.json();
      if (data.snappedPoints) {
        const snappedPath = data.snappedPoints.map((point) => ({
          lat: point.location.latitude,
          lng: point.location.longitude,
        }));
        setSnappedPolyline(snappedPath);
      } else {
        console.error("Snap-to-Road API failed to return snapped points");
      }
    } catch (error) {
      console.error("Error snapping polyline to roads:", error);
    }
  };
  const handleMapLoad = (map) => {
    setMap(map);
    setMapRef(map);
  };
  console.log("userLocation", userLocation);
  console.log(deliveryPartnerLocation, "deliveryPartnerLocation");
  console.log(directions, "directions");
  const deliveryPartnerLocation2 = { lat: 22.51829, lng: 88.362951 };

  return (
    <div>
      {userLocation && deliveryPartnerLocation && directions && (
        <GoogleMap
          center={userLocation}
          zoom={20}
          mapContainerStyle={{ width: "100%", height: "400px" }}
          //   mapTypeId="satellite"
          onLoad={handleMapLoad}
        >
          <Marker position={userLocation} label={UserLabel} />
          <Marker
            position={deliveryPartnerLocation}
            label={deliveryPartnerLabel}
          />

          <Polyline
            path={directions}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 4,
            }}
          />
        </GoogleMap>
      )}
    </div>
  );
};

export default MapWithDirections;
