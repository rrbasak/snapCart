// import * as React from "react";
// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";

// const steps = [
//   "Select campaign settings",
//   "Create an ad group",
//   "Create an ad",
// ];

// export default function HorizontalLinearStepper() {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [skipped, setSkipped] = React.useState(new Set());

//   const isStepOptional = (step) => {
//     return step === 1;
//   };

//   const isStepSkipped = (step) => {
//     return skipped.has(step);
//   };

//   const handleNext = () => {
//     let newSkipped = skipped;
//     if (isStepSkipped(activeStep)) {
//       newSkipped = new Set(newSkipped.values());
//       newSkipped.delete(activeStep);
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped(newSkipped);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSkip = () => {
//     if (!isStepOptional(activeStep)) {
//       // You probably want to guard against something like this,
//       // it should never occur unless someone's actively trying to break something.
//       throw new Error("You can't skip a step that isn't optional.");
//     }

//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     setSkipped((prevSkipped) => {
//       const newSkipped = new Set(prevSkipped.values());
//       newSkipped.add(activeStep);
//       return newSkipped;
//     });
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Stepper activeStep={activeStep}>
//         {steps.map((label, index) => {
//           const stepProps = {};
//           const labelProps = {};
//         //   if (isStepOptional(index)) {
//         //     labelProps.optional = (
//         //       <Typography variant="caption">Optional</Typography>
//         //     );
//         //   }
//         //   if (isStepSkipped(index)) {
//         //     stepProps.completed = false;
//         //   }
//           return (
//             <Step key={label} {...stepProps}>
//               <StepLabel {...labelProps}></StepLabel>
//             </Step>
//           );
//         })}
//       </Stepper>
//       {/* {activeStep === steps.length ? (
//         <React.Fragment>
//           <Typography sx={{ mt: 2, mb: 1 }}>
//             All steps completed - you&apos;re finished
//           </Typography>
//           <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
//             <Box sx={{ flex: "1 1 auto" }} />
//             <Button onClick={handleReset}>Reset</Button>
//           </Box>
//         </React.Fragment>
//       ) : (
//         <React.Fragment>
//           <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
//           <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
//             <Button
//               color="inherit"
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               sx={{ mr: 1 }}
//             >
//               Back
//             </Button>
//             <Box sx={{ flex: "1 1 auto" }} />
//             {isStepOptional(activeStep) && (
//               <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
//                 Skip
//               </Button>
//             )}

//             <Button onClick={handleNext}>
//               {activeStep === steps.length - 1 ? "Finish" : "Next"}
//             </Button>
//           </Box>
//         </React.Fragment>
//       )} */}
//     </Box>
//   );
// }

// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import { useEffect, useState } from "react";
// import styles from "../styles/HorizontalLinearStepper.module.css";
// const steps = [
//   "Processing",
//   "Shipped",
//   "Delivered",
// ];

// // const getStepColor = (status, index) => {
// //   switch (status) {
// //     case "Processing":
// //       return index === 0 ? "primary" : "inherit";
// //     case "Shipped":
// //       return index === 1 ? "primary" : "inherit";
// //     case "deliverd":
// //       return index === 2 ? "primary" : "inherit";
// //     default:
// //       return "inherit";
// //   }
// // };
// export default function HorizontalLinearStepper({ status }) {
//   ////console.log("status", status);
//   const [activeStep, setActiveStep] = useState(0);

// useEffect(() => {
//   switch (status) {
//     case "Processing":
//       setActiveStep(1);
//       break;
//     case "Shipped":
//       setActiveStep(2);
//       break;
//     case "deliverd":
//       setActiveStep(3);
//       break;
//     default:
//       setActiveStep(0);
//   }
// }, [status]);

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Stepper activeStep={activeStep} >
//         {steps.map((label, index) => {
//           const stepProps = {};
//           const labelProps = {};
//           return (
//             <Step key={label} {...stepProps}>
//               <StepLabel >{label}</StepLabel>
//             </Step>
//           );
//         })}
//       </Stepper>
//     </Box>
//   );
// }

// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import { useEffect, useState } from "react";
// import styles from "../styles/HorizontalLinearStepper.module.css";

// const steps = ["Processing", "Shipped", "Delivered"];

// export default function HorizontalLinearStepper({ status }) {
//   const [activeStep, setActiveStep] = useState(0);
//   ////console.log("status",status)
//   useEffect(() => {
//     switch (status) {
//       case "Processing":
//         setActiveStep(0);
//         break;
//       case "Shipped":
//         setActiveStep(1);
//         break;
//       case "Delivered":
//         setActiveStep(2);
//         break;
//       default:
//         setActiveStep(0);
//     }
//   }, [status]);

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Stepper activeStep={activeStep} className={styles.stepper}>
//         {steps.map((label, index) => (
//           <Step key={label} className={styles.step}>
//             <StepLabel
//               StepIconProps={{
//                 className: `${styles.stepIcon} ${
//                   index <= activeStep ? styles.stepIconCompleted : ""
//                 }`,
//               }}
//             >
//               <div className={styles.stepLabelContainer}>{label}</div>
//             </StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//     </Box>
//   );
// }

// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import { useEffect, useState } from "react";
// import styles from "../styles/HorizontalLinearStepper.module.css";

// const steps = [
//   { label: "Processing", description: "Your order is being processed." },
//   { label: "Shipped", description: "Your order has been shipped." },
//   { label: "Delivered", description: "Your order has been delivered." },
// ];

// export default function HorizontalLinearStepper({ status }) {
//   const [activeStep, setActiveStep] = useState(0);

//   useEffect(() => {
//     switch (status) {
//       case "Processing":
//         setActiveStep(1);
//         break;
//       case "Shipped":
//         setActiveStep(2);
//         break;
//       case "Delivered":
//         setActiveStep(3);
//         break;
//       default:
//         setActiveStep(0);
//     }
//   }, [status]);

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Stepper
//         activeStep={activeStep}
//         orientation="vertical"
//         className={styles.stepper}
//       >
//         {steps.map((step, index) => (
//           <Step key={step.label} className={styles.step}>
//             <StepLabel
//               StepIconProps={{
//                 className: `${styles.stepIcon} ${
//                   index <= activeStep ? styles.stepIconCompleted : ""
//                 }`,
//               }}
//             >
//               <div className={styles.stepContent}>
//                 <div className={styles.stepLabel}>{step.label}</div>
//                 <div className={styles.stepDescription}>{step.description}</div>
//               </div>
//             </StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//     </Box>
//   );
// }

// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import { useEffect, useState } from "react";
// import styles from "../styles/HorizontalLinearStepper.module.css";

// const steps = [
//   { label: "Order Confirmed", description: "Your item has been placed." },
//   { label: "Processed", description: "Your item has been processed." },
//   { label: "Shipped", description: "Your item has been received in the hub nearest to you." },
//   { label: "Out For Delivery", description: "Your item is out for delivery." },
//   { label: "Delivered", description: "Your item has been delivered." },
// ];

// export default function HorizontalLinearStepper({ status }) {
//   const [activeStep, setActiveStep] = useState(0);

//   useEffect(() => {
//     switch (status) {
//       case "Processing":
//         setActiveStep(1); // Change to 0 to show the first step
//         break;
//       case "Shipped":
//         setActiveStep(2); // Change to 1 for the second step
//         break;
//       case "Delivered":
//         setActiveStep(3); // Change to 2 for the last step
//         break;
//       default:
//         setActiveStep(0);
//     }
//   }, [status]);

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Stepper
//         activeStep={activeStep}
//         orientation="vertical"
//         className={styles.stepper}
//       >
//         {steps.map((step, index) => (
//           <Step key={step.label} className={styles.step}>
//             <StepLabel
//               StepIconProps={{
//                 className: `${styles.stepIcon} ${
//                   index < activeStep
//                     ? styles.stepIconCompleted
//                     : index === activeStep
//                     ? styles.stepIconPending
//                     : ""
//                 }`,
//               }}
//             >
//               <div className={styles.stepContent}>
//                 <div className={styles.stepLabel}>{step.label}</div>
//                 <div className={styles.stepDescription}>{step.description}</div>
//               </div>
//             </StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//     </Box>
//   );
// }

// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import { useEffect, useState } from "react";
// import styles from "../styles/HorizontalLinearStepper.module.css";

// const steps = [
//   { label: "Order Confirmed", description: "Your item has been placed." },
//   { label: "Processed", description: "Your item is being processed." },
//   { label: "Shipped",description: "Your item has been received in the hub nearest to you."},
//   { label: "Out For Delivery", description: "Your item will out for delivery." },
//   { label: "Delivered", description: "Your item has been delivered." },
// ];

// export default function HorizontalLinearStepper({ status }) {
//   const [activeStep, setActiveStep] = useState(0);

//   useEffect(() => {
//     switch (status) {
//       case "Order Confirmed":
//         setActiveStep(1); // Active step for "Order Confirmed"
//         break;
//       case "Processed":
//         setActiveStep(2); // Active step for "Processed"
//         break;
//       case "Shipped":
//         setActiveStep(3); // Active step for "Shipped"
//         break;
//       case "Out For Delivery":
//         setActiveStep(4); // Active step for "Out For Delivery"
//         break;
//       case "Delivered":
//         setActiveStep(5); // Active step for "Delivered"
//         break;
//       default:
//         setActiveStep(1); // Default to "Order Confirmed"
//     }
//   }, [status]);

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Stepper
//         activeStep={activeStep}
//         orientation="vertical"
//         className={styles.stepper}
//       >
//         {steps.map((step, index) => (
//           <Step key={step.label} className={styles.step}>
//             <StepLabel
//               StepIconProps={{
//                 className: `${styles.stepIcon} ${
//                   index < activeStep
//                     ? styles.stepIconCompleted
//                     : index === activeStep
//                     ? styles.stepIconPending
//                     : ""
//                 }`,
//               }}
//             >
//               <div className={styles.stepContent}>
//                 <div className={styles.stepLabel}>
//                   {index < activeStep
//                     ? step.label
//                     : index === activeStep
//                     ? step.label
//                     : step.label}
//                 </div>
//                 {/* Show description based on the status and step index */}
//                 {index <= activeStep && (
//                   <div className={styles.stepDescription}>
//                     {index < activeStep
//                       ? step.label === "Shipped"
//                         ? "Your item has been shipped."
//                         : step.label === "Out For Delivery"
//                         ? "Your item has been out for delivery."
//                         : step.label === "Delivered"
//                         ? "Your item has been delivered."
//                         : step.description.replace("is being", "has been")
//                       : index === activeStep
//                       ? step.label === "Shipped"
//                         ? "Your item is being shipped."
//                         : step.label === "Out For Delivery"
//                         ? "Your item will out for delivery."
//                         : step.label === "Delivered"
//                         ? "Your item is being delivered."
//                         : step.description
//                       : step.label === "Shipped"
//                       ? "Your item will be shipped."
//                       : step.label === "Out For Delivery"
//                       ? "Your item will be out for delivery."
//                       : step.label === "Delivered"
//                       ? "Your item will be delivered."
//                       : step.description.replace(
//                           "Your item is",
//                           "Your item will be"
//                         )}
//                   </div>
//                 )}
//               </div>
//             </StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//     </Box>
//   );
// }

// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import { useEffect, useState } from "react";
// import styles from "../styles/HorizontalLinearStepper.module.css";

// const steps = [
//   { label: "Order Confirmed", description: "Your item has been placed." },
//   { label: "Processed", description: "Your item is being processed." },
//   {
//     label: "Shipped",
//     description: "Your item has been received in the hub nearest to you.",
//   },
//   {
//     label: "Out For Delivery",
//     description: "Your item will be out for delivery.",
//   },
//   { label: "Delivered", description: "Your item has been delivered." },
// ];

// export default function HorizontalLinearStepper({ status }) {
//   const [activeStep, setActiveStep] = useState(0);
//   const [isCanceled, setIsCanceled] = useState(false);

//   useEffect(() => {
//     if (status === "Canceled") {
//       setIsCanceled(true);
//       return;
//     }

//     setIsCanceled(false); // Reset cancellation status if not canceled

//     switch (status) {
//       case "Order Confirmed":
//         setActiveStep(1);
//         break;
//       case "Processed":
//         setActiveStep(2);
//         break;
//       case "Shipped":
//         setActiveStep(3);
//         break;
//       case "Out For Delivery":
//         setActiveStep(4);
//         break;
//       case "Delivered":
//         setActiveStep(5);
//         break;
//       default:
//         setActiveStep(0); // Default to "Order Confirmed"
//     }
//   }, [status]);

//   // If canceled, return a message and do not show the stepper
//   if (isCanceled) {
//     return (
//       <Box
//         sx={{
//           width: "100%",
//           color: "red",
//           textAlign: "center",
//           margin: "20px 0",
//         }}
//       >
//         Your order has been canceled.
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Stepper
//         activeStep={activeStep}
//         orientation="vertical"
//         className={styles.stepper}
//       >
//         {steps.map((step, index) => (
//           <Step key={step.label} className={styles.step}>
//             <StepLabel
//               StepIconProps={{
//                 className: `${styles.stepIcon} ${
//                   index < activeStep
//                     ? styles.stepIconCompleted
//                     : index === activeStep
//                     ? styles.stepIconPending
//                     : ""
//                 }`,
//               }}
//             >
//               <div className={styles.stepContent}>
//                 <div className={styles.stepLabel}>{step.label}</div>
//                 {/* Show description based on the status and step index */}
//                 {index <= activeStep && (
//                   <div className={styles.stepDescription}>
//                     {index < activeStep
//                       ? step.label === "Shipped"
//                         ? "Your item has been shipped."
//                         : step.label === "Out For Delivery"
//                         ? "Your item has been out for delivery."
//                         : step.label === "Delivered"
//                         ? "Your item has been delivered."
//                         : step.description.replace("is being", "has been")
//                       : index === activeStep
//                       ? step.label === "Shipped"
//                         ? "Your item is being shipped."
//                         : step.label === "Out For Delivery"
//                         ? "Your item is being out for delivery."
//                         : step.label === "Delivered"
//                         ? "Your item is being delivered."
//                         : step.description
//                       : step.label === "Shipped"
//                       ? "Your item will be shipped."
//                       : step.label === "Out For Delivery"
//                       ? "Your item will be out for delivery."
//                       : step.label === "Delivered"
//                       ? "Your item will be delivered."
//                       : step.description.replace(
//                           "Your item is",
//                           "Your item will be"
//                         )}
//                   </div>
//                 )}
//               </div>
//             </StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//     </Box>
//   );
// }

// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import { useEffect, useState } from "react";
// import styles from "../styles/HorizontalLinearStepper.module.css"; // Ensure your CSS styles are properly set up
// import { Button, Modal } from "@mui/material"; // Import Modal and Button

// const steps = [
//   { label: "Order Confirmed", description: "Your item has been placed." },
//   { label: "Processed", description: "Your item has been processed." },
//   {
//     label: "Shipped",
//     description: "Your item has been received in the hub nearest to you.",
//   },
//   {
//     label: "Out For Delivery",
//     description: "Your item has been out for delivery.",
//   },
//   { label: "Delivered", description: "Your item has been delivered." },
// ];

// export default function HorizontalLinearStepper({ status, orderDate, updateDate }) {
//   const [activeStep, setActiveStep] = useState(0);
//   const [isCanceled, setIsCanceled] = useState(false);
//   const [openModal, setOpenModal] = useState(false); // State for modal

//   useEffect(() => {
//     if (status === "Canceled") {
//       setIsCanceled(true);
//       return;
//     }

//     setIsCanceled(false); // Reset cancellation status if not canceled

//     switch (status) {
//       case "Order Confirmed":
//         setActiveStep(1);
//         break;
//       case "Processed":
//         setActiveStep(2);
//         break;
//       case "Shipped":
//         setActiveStep(3);
//         break;
//       case "Out For Delivery":
//         setActiveStep(4);
//         break;
//       case "Delivered":
//         setActiveStep(5);
//         break;
//       default:
//         setActiveStep(0); // Default to "Order Confirmed"
//     }
//   }, [status]);

//   // If canceled, return a message and do not show the stepper
//   if (isCanceled) {
//     return (
//       <Box
//         sx={{
//           width: "100%",
//           color: "red",
//           textAlign: "center",
//           margin: "20px 0",
//         }}
//       >
//         We apologize for the inconvenience. Your order has been canceled by
//         SnapCart due to unavailability of stock or other reasons.
//       </Box>
//     );
//   }

//   // Handler to open modal
//   const handleOpenModal = () => setOpenModal(true);
//   const handleCloseModal = () => setOpenModal(false);

//   // If delivered, show only specific steps
//   if (status === "Delivered") {
//     return (
//       <Box sx={{ width: "100%" }}>
//         <Stepper
//           activeStep={0}
//           orientation="vertical"
//           className={styles.stepper}
//         >
//           <Step>
//             <StepLabel
//               StepIconProps={{
//                 className: `${styles.stepIcon} ${styles.stepIconCompleted}`, // Apply completed icon styling
//               }}
//             >
//               <div className={styles.stepContent}>
//                 <div className={styles.stepLabel}>Order Confirmed</div>
//                 <div className={styles.stepDescription}>
//                   Your item has been placed.
//                 </div>
//               </div>
//             </StepLabel>
//           </Step>
//           <Step>
//             <StepLabel
//               StepIconProps={{
//                 className: `${styles.stepIcon} ${styles.stepIconCompleted}`, // Apply completed icon styling
//               }}
//             >
//               <div className={styles.stepContent}>
//                 <div className={styles.stepLabel}>Delivered</div>
//                 <div className={styles.stepDescription}>
//                   Your item has been delivered.
//                 </div>
//               </div>
//             </StepLabel>
//           </Step>
//         </Stepper>
//         <Button variant="outlined" onClick={handleOpenModal}>
//           See All Updates
//         </Button>

//         {/* Modal for displaying all steps */}
//         <Modal open={openModal} onClose={handleCloseModal}>
//           <Box
//             sx={{
//               bgcolor: "white",
//               padding: 4,
//               borderRadius: 2,
//               width: 400,
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)", // Center the modal
//             }}
//           >
//             <h2>Order Updates</h2>
//             <Stepper
//               activeStep={activeStep}
//               orientation="vertical"
//               className={styles.stepper}
//             >
//               {steps.map((step, index) => (
//                 <Step key={step.label} className={styles.step}>
//                   <StepLabel
//                     StepIconProps={{
//                       className: `${styles.stepIcon} ${
//                         index < activeStep
//                           ? styles.stepIconCompleted // Green for completed steps
//                           : index === activeStep
//                           ? styles.stepIconPending // Style for the current step
//                           : ""
//                       }`,
//                     }}
//                   >
//                     <div className={styles.stepContent}>
//                       <div className={styles.stepLabel}>{step.label}</div>
//                       <div className={styles.stepDescription}>
//                         {/* All messages should have 'has been' phrasing */}
//                         {index < activeStep
//                           ? `Your item has been ${step.description
//                               .toLowerCase()
//                               .replace("your item has been", "")}`
//                           : index === activeStep
//                           ? `Your item is ${step.description
//                               .toLowerCase()
//                               .replace("your item has been", "")}`
//                           : `Your item will be ${step.description
//                               .toLowerCase()
//                               .replace("your item has been", "")}`}
//                       </div>
//                     </div>
//                   </StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//           </Box>
//         </Modal>
//       </Box>
//     );
//   }

//   // Render full stepper for other statuses
//   return (
//     <Box sx={{ width: "100%" }}>
//       <Stepper
//         activeStep={activeStep}
//         orientation="vertical"
//         className={styles.stepper}
//       >
//         {steps.map((step, index) => (
//           <Step key={step.label} className={styles.step}>
//             <StepLabel
//               StepIconProps={{
//                 className: `${styles.stepIcon} ${
//                   index < activeStep
//                     ? styles.stepIconCompleted // Apply completed icon styling
//                     : index === activeStep
//                     ? styles.stepIconPending
//                     : ""
//                 }`,
//               }}
//             >
//               <div className={styles.stepContent}>
//                 <div className={styles.stepLabel}>{step.label}</div>
//                 {/* Show description based on the status and step index */}
//                 {index <= activeStep && (
//                   <div className={styles.stepDescription}>
//                     {/* Use 'has been' for all messages */}
//                     {index < activeStep
//                       ? `Your item has been ${step.description
//                           .toLowerCase()
//                           .replace("your item has been", "")}`
//                       : index === activeStep
//                       ? `Your item is ${step.description
//                           .toLowerCase()
//                           .replace("your item has been", "")}`
//                       : `Your item will be ${step.description
//                           .toLowerCase()
//                           .replace("your item has been", "")}`}
//                   </div>
//                 )}
//               </div>
//             </StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//     </Box>
//   );
// }

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useEffect, useState } from "react";
import styles from "../styles/HorizontalLinearStepper.module.css";
import { Button, Modal } from "@mui/material";
import dayjs from "dayjs";

const steps = [
  { label: "Order Confirmed", description: "Your item has been placed." },
  { label: "Processed", description: "Your item has been processed." },
  {
    label: "Shipped",
    description: "Your item has been received in the hub nearest to you.",
  },
  {
    label: "Out For Delivery",
    description: "Your item has been out for delivery.",
  },
  { label: "Delivered", description: "Your item has been delivered." },
];

export default function HorizontalLinearStepper({
  status,
  orderDate,
  updateDate,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [isCanceled, setIsCanceled] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (status === "Canceled") {
      setIsCanceled(true);
      return;
    }

    setIsCanceled(false);

    switch (status) {
      case "Order Confirmed":
        setActiveStep(1);
        break;
      case "Processed":
        setActiveStep(2);
        break;
      case "Shipped":
        setActiveStep(3);
        break;
      case "Out For Delivery":
        setActiveStep(4);
        break;
      case "Delivered":
        setActiveStep(5);
        break;
      default:
        setActiveStep(0);
    }
  }, [status]);

  if (isCanceled) {
    return (
      <Box
        sx={{
          width: "100%",
          color: "red",
          textAlign: "center",
          margin: "20px 0",
        }}
      >
        We apologize for the inconvenience. Your order has been canceled by
        SnapCart due to unavailability of stock or other reasons.
      </Box>
    );
  }

  // Handler to open modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Format dates
  const formattedOrderDate = dayjs(orderDate).format("MMM D");
  const formattedUpdateDate = dayjs(updateDate).format("MMM D");
  const modalOrderDate = dayjs(orderDate).format("ddd, D [th] MMM 'YY");
  const modalUpdateDate = dayjs(updateDate).format("ddd, D [th] MMM 'YY");
  const formatUpdateDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return new Date(date).toLocaleString("en-US", options).replace(",", " -");
  };
  if (status === "Delivered") {
    return (
      <Box sx={{ width: "100%" }}>
        <Stepper
          activeStep={0}
          orientation="vertical"
          className={styles.stepper}
        >
          <Step>
            <StepLabel
              StepIconProps={{
                className: `${styles.stepIcon} ${styles.stepIconCompleted}`,
              }}
            >
              <div className={styles.stepContent}>
                <div className={styles.stepLabel}>
                  Order Confirmed ,<span>{formattedOrderDate}</span>
                </div>
                <div className={styles.stepDescription}>
                  Your item has been placed.
                </div>
              </div>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel
              StepIconProps={{
                className: `${styles.stepIcon} ${styles.stepIconCompleted}`,
              }}
            >
              <div className={styles.stepContent}>
                <div className={styles.stepLabel}>
                  Delivered ,<span>{formattedUpdateDate}</span>
                </div>
                <div className={styles.stepDescription}>
                  Your item has been delivered.
                </div>
              </div>
            </StepLabel>
          </Step>
        </Stepper>
        <Button variant="outlined" onClick={handleOpenModal}>
          See All Updates
        </Button>

        {/* Modal for displaying all steps */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              bgcolor: "white",
              padding: 4,
              borderRadius: 2,
              width: 400,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              height: 676,
            }}
          >
            <h2>Order Updates</h2>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              className={styles.stepper}
            >
              {steps.map((step, index) => (
                <Step key={step.label} className={styles.step}>
                  <StepLabel
                    StepIconProps={{
                      className: `${styles.stepIcon} ${
                        index < activeStep
                          ? styles.stepIconCompleted
                          : index === activeStep
                          ? styles.stepIconPending
                          : ""
                      }`,
                    }}
                  >
                    <div className={styles.stepContent}>
                      <div className={styles.stepLabel}>
                        {step.label} {modalOrderDate}
                      </div>
                      <div className={styles.stepDescription}>
                        {index < activeStep
                          ? `Your item has been ${step.description
                              .toLowerCase()
                              .replace("your item has been", "")}`
                          : index === activeStep
                          ? `Your item is ${step.description
                              .toLowerCase()
                              .replace("your item has been", "")}`
                          : `Your item will be ${step.description
                              .toLowerCase()
                              .replace("your item has been", "")}`}
                        <div>{formatUpdateDate(updateDate)}</div>{" "}
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Modal>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        className={styles.stepper}
      >
        {steps.map((step, index) => (
          <Step key={step.label} className={styles.step}>
            <StepLabel
              StepIconProps={{
                className: `${styles.stepIcon} ${
                  index < activeStep
                    ? styles.stepIconCompleted
                    : index === activeStep
                    ? styles.stepIconPending
                    : ""
                }`,
              }}
            >
              <div className={styles.stepContent}>
                <div className={styles.stepLabel}>{step.label}</div>

                {index <= activeStep && (
                  <div className={styles.stepDescription}>
                    {index < activeStep
                      ? `Your item has been ${step.description
                          .toLowerCase()
                          .replace("your item has been", "")}`
                      : index === activeStep
                      ? `Your item is being${step.description
                          .toLowerCase()
                          .replace("your item has been", "")}`
                      : `Your item will be ${step.description
                          .toLowerCase()
                          .replace("your item has been", "")}`}
                  </div>
                )}
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
