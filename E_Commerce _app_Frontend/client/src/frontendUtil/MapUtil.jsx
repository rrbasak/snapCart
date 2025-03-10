// import {
//   Box,
//   Button,
//   ButtonGroup,
//   Flex,
//   HStack,
//   IconButton,
//   Input,
//   SkeletonText,
//   Text,
// } from "@chakra-ui/react";
// import { FaLocationArrow, FaTimes } from "react-icons/fa";

// import {
//   useJsApiLoader,
//   GoogleMap,
//   Marker,
//   Autocomplete,
//   DirectionsRenderer,
// } from "@react-google-maps/api";
// import { useRef, useState } from "react";

// const center = { lat: 48.8584, lng: 2.2945 };

// function App() {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: "AlzaSyiM8OYCyIjsYjuky803NNye7gppnFGdYxO",
//     libraries: ["places"],
//   });

//   const [map, setMap] = useState(null);
//   const [directionsResponse, setDirectionsResponse] = useState(null);
//   const [distance, setDistance] = useState("");
//   const [duration, setDuration] = useState("");

//   const originRef = useRef();
//   const destiantionRef = useRef();

//   if (!isLoaded) {
//     return <SkeletonText />;
//   }

//   async function calculateRoute() {
//     if (originRef.current.value === "" || destiantionRef.current.value === "") {
//       return;
//     }
//     const directionsService = new google.maps.DirectionsService();
//     const results = await directionsService.route({
//       origin: originRef.current.value,
//       destination: destiantionRef.current.value,
//       travelMode: google.maps.TravelMode.DRIVING,
//     });
//     setDirectionsResponse(results);
//     setDistance(results.routes[0].legs[0].distance.text);
//     setDuration(results.routes[0].legs[0].duration.text);
//   }

//   function clearRoute() {
//     setDirectionsResponse(null);
//     setDistance("");
//     setDuration("");
//     originRef.current.value = "";
//     destiantionRef.current.value = "";
//   }

//   return (
//     <Flex
//       position="relative"
//       flexDirection="column"
//       alignItems="center"
//       h="100vh"
//       w="100vw"
//     >
//       <Box position="absolute" left={0} top={0} h="100%" w="100%">
//         <GoogleMap
//           center={center}
//           zoom={15}
//           mapContainerStyle={{ width: "100%", height: "100%" }}
//           options={{
//             zoomControl: false,
//             streetViewControl: false,
//             mapTypeControl: false,
//             fullscreenControl: false,
//           }}
//           onLoad={(mapInstance) => setMap(mapInstance)} // Ensure map is set correctly
//         >
//           <Marker position={center} />
//           {directionsResponse && (
//             <DirectionsRenderer directions={directionsResponse} />
//           )}
//         </GoogleMap>
//       </Box>
//       <Box
//         p={4}
//         borderRadius="lg"
//         m={4}
//         bgColor="white"
//         shadow="base"
//         minW="container.md"
//         zIndex="1"
//       >
//         <HStack spacing={2} justifyContent="space-between">
//           <Box flexGrow={1}>
//             <Autocomplete>
//               <Input type="text" placeholder="Origin" ref={originRef} />
//             </Autocomplete>
//           </Box>
//           <Box flexGrow={1}>
//             <Autocomplete>
//               <Input
//                 type="text"
//                 placeholder="Destination"
//                 ref={destiantionRef}
//               />
//             </Autocomplete>
//           </Box>

//           <ButtonGroup>
//             <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
//               Calculate Route
//             </Button>
//             <IconButton
//               aria-label="clear route"
//               icon={<FaTimes />}
//               onClick={clearRoute}
//             />
//           </ButtonGroup>
//         </HStack>
//         <HStack spacing={4} mt={4} justifyContent="space-between">
//           <Text>Distance: {distance} </Text>
//           <Text>Duration: {duration} </Text>
//           <IconButton
//             aria-label="center back"
//             icon={<FaLocationArrow />}
//             isRound
//             onClick={() => {
//               if (map) {
//                 map.panTo(center);
//                 map.setZoom(15); // Ensure map is not null before calling
//               }
//             }}
//           />
//         </HStack>
//       </Box>
//     </Flex>
//   );
// }

// export default App;
