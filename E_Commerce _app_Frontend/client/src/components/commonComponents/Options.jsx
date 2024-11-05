// import React, { useState } from "react";
// import styles from "../../styles/Options.module.css";

// const Options = ({ options }) => {
//   const [selectedRam, setSelectedRam] = useState(options[0]);

//   const handleRamClick = (ram) => {
//     setSelectedRam(ram);
//   };

//   return (
//     <div className={styles.ramContainer}>
//       {/* <p className={styles.ramLabel}>RAM:</p> */}
//       <div className={styles.ramOptions}>
//         {options.map((ram) => (
//           <button
//             key={ram}
//             className={`${styles.ramOption} ${
//               selectedRam === ram ? styles.selected : ""
//             }`}
//             onClick={() => handleRamClick(ram)}
//           >
//             {ram} GB
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default Options;

// import React, { useState } from "react";
// import styles from "../../styles/Options.module.css";

// const Options = ({ options }) => {
//   const [selectedOption, setSelectedOption] = useState(options[0]);

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//   };

//   return (
//     <div className={styles.optionsContainer}>
//       {/* Options Buttons */}
//       <div className={styles.options}>
//         {options.map((option, index) => (
//           <button
//             key={index}
//             className={`${styles.option} ${
//               selectedOption === option ? styles.selected : ""
//             }`}
//             onClick={() => handleOptionClick(option)}
//           >
//             {`${option.ram} GB RAM / ${option.storage} Storage`}
//           </button>
//         ))}
//       </div>

//       {/* Display the selected price */}
//       {/* <div className={styles.price}>
//         <p>Price: ₹{selectedOption.price}</p>
//       </div> */}
//     </div>
//   );
// };

// export default Options;

// import React, { useState } from "react";
// import styles from "../../styles/Options.module.css";

// const Options = ({ options, handleSelect }) => {
//   const [selectedOption, setSelectedOption] = useState(options[0]);

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     handleSelect(option);
//   };

//   return (
//     <div className={styles.optionsContainer}>
//       {/* Options Buttons */}
//       <div className={styles.options}>
//         {options.map((option, index) => (
//           <button
//             key={index}
//             className={`${styles.option} ${
//               selectedOption === option ? styles.selected : ""
//             }`}
//             onClick={() => handleOptionClick(option)}
//           >
//             {`${option.ram} GB RAM + ${option.storage} Storage`}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Options;

// import React, { useState, useEffect } from "react";
// import styles from "../../styles/Options.module.css";

// const Options = ({ options, handleSelect }) => {
//   const [selectedOption, setSelectedOption] = useState(null);

//   useEffect(() => {
//     if (options.length > 0 && selectedOption === null) {
//       setSelectedOption(options[0]);
//       handleSelect(options[0]);
//     }
//   }, [options]);

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     handleSelect(option);
//   };

//   const isSelected = (option) => {
//     return (
//       option.ram === selectedOption?.ram &&
//       option.storage === selectedOption?.storage
//     );
//   };

//   return (
//     <div className={styles.optionsContainer}>
//       <div className={styles.options}>
//         {options.map((option, index) => (
//           <button
//             key={index}
//             className={`${styles.option} ${
//               isSelected(option) ? styles.selected : ""
//             }`}
//             onClick={() => handleOptionClick(option)}
//           >
//             {`${option.ram} GB RAM + ${option.storage} Storage`}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Options;

// import React, { useState, useEffect } from "react";
// import styles from "../../styles/Options.module.css";

// const Options = ({ options, handleSelect }) => {
//   const [selectedOption, setSelectedOption] = useState(null);

//   useEffect(() => {
//     if (options.length > 0 && selectedOption === null) {
//       setSelectedOption(options[0]);
//       handleSelect(options[0]);
//     }
//   }, [options]);

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     handleSelect(option);
//   };

//   const isSelected = (option) => {
//     return (
//       option.ram === selectedOption?.ram &&
//       option.storage === selectedOption?.storage &&
//       option.size === selectedOption?.size
//     );
//   };

//   // Helper function to check if a field is non-empty
//   const hasValidValue = (value) => {
//     return value && value[0] !== ""; // Check for non-empty array and no empty strings
//   };

//   return (
//     <div className={styles.optionsContainer}>
//       <div className={styles.options}>
//         {options.map((option, index) => (
//           <div key={index}>
//             {hasValidValue(option.ram) && hasValidValue(option.storage) ? (
//               <button
//                 className={`${styles.option} ${
//                   isSelected(option) ? styles.selected : ""
//                 }`}
//                 onClick={() => handleOptionClick(option)}
//               >
//                 {`${option.ram} GB RAM + ${option.storage} Storage`}
//               </button>
//             ) : hasValidValue(option.size) ? (
//               <div className={styles.sizeOptions}>
//                 {option.size.map((size, sizeIndex) => (
//                   <button
//                     key={sizeIndex}
//                     className={`${styles.option} ${
//                       isSelected(option) ? styles.selected : ""
//                     }`}
//                     onClick={() =>
//                       handleOptionClick({ ...option, selectedSize: size })
//                     }
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <p>Option not available</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Options;




import React, { useState, useEffect } from "react";
import styles from "../../styles/Options.module.css";

const Options = ({ options, handleSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (options.length > 0 && selectedOption === null) {
      const defaultOption = { ...options[0] };
      if (hasValidValue(options[0].ram) && hasValidValue(options[0].storage)) {
        // Preselect RAM and Storage if available
        defaultOption.selectedSize = null;
      } else if (hasValidValue(options[0].size)) {
        // Preselect first size if available
        defaultOption.selectedSize = options[0].size[0];
      }
      setSelectedOption(defaultOption);
      handleSelect(defaultOption); // Send default selected option to parent
    }
  }, [options]);

  const handleOptionClick = (option, size) => {
    const updatedOption = { ...option, selectedSize: size };
    setSelectedOption(updatedOption);
    handleSelect(updatedOption); // Send selected option to parent
  };

  const isSelected = (option, size) => {
    return (
      option.ram === selectedOption?.ram &&
      option.storage === selectedOption?.storage &&
      (size
        ? size === selectedOption?.selectedSize
        : selectedOption?.selectedSize === null)
    );
  };

  // Helper function to check if a field is non-empty
  const hasValidValue = (value) => {
    return value && value.length > 0 && value[0] !== ""; // Check for non-empty array and no empty strings
  };

  return (
    <div className={styles.optionsContainer}>
      <div className={styles.options}>
        {options.map((option, index) => (
          <div key={index} className={styles.optionWrapper}>
            {hasValidValue(option.ram) && hasValidValue(option.storage) ? (
              <button
                className={`${styles.option} ${
                  isSelected(option, null) ? styles.selected : ""
                }`}
                onClick={() => handleOptionClick(option, null)}
              >
                {`${option.ram} GB RAM + ${option.storage} Storage`}
              </button>
            ) : hasValidValue(option.size) ? (
              <div className={styles.sizeOptions}>
                {option.size.map((size, sizeIndex) => (
                  <button
                    key={sizeIndex}
                    className={`${styles.option} ${
                      isSelected(option, size) ? styles.selected : ""
                    }`}
                    onClick={() => handleOptionClick(option, size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            ) : (
              <p>Option not available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Options;
