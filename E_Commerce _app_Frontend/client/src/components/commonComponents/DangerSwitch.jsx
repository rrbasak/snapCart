// import React from "react";
// import { ConfigProvider, Switch } from "antd";
// import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
// import styles from "../../styles/DangerSwitch.module.css"; 
// const DangerSwitch = () => (
//   <ConfigProvider>
//     <Switch
//     //   className={true ? styles["switch-checked"] : styles["switch-unchecked"]}
//       checkedChildren={<CheckOutlined className={styles["icon-checked"]} />}
//       unCheckedChildren={<CloseOutlined className={styles["icon-unchecked"]} />}
//     />
//   </ConfigProvider>
// );


// export default DangerSwitch;



// import React, { useState, useEffect, memo } from "react";
// import { ConfigProvider, Switch } from "antd";
// import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
// import axios from "axios";
// import styles from "../../styles/DangerSwitch.module.css";

// const DangerSwitch = memo(({ deliveryId }) => {
//   const [isOnline, setIsOnline] = useState(false);

//   useEffect(() => {
//     axios
//       .get(`/api/v1/auth/get-partner-status/${deliveryId}`)
//       .then((res) => {
//         setIsOnline(res.data.status === "Online");
//       })
//       .catch((err) => console.error("Error fetching status:", err));
//   }, [deliveryId]);

//   const toggleStatus = async () => {
//     try {
//       const response = await axios.put(
//         `/api/v1/delivery/update-partner-status/${deliveryId}`
//       );
//       setIsOnline(response.data.status === "Online");
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   return (
//     <ConfigProvider>
//       <Switch
//         checked={isOnline}
//         onChange={toggleStatus}
//         checkedChildren={<CheckOutlined className={styles["icon-checked"]} />}
//         unCheckedChildren={
//           <CloseOutlined className={styles["icon-unchecked"]} />
//         }
//       />
//     </ConfigProvider>
//   );
// });

// export default DangerSwitch;


import React, { memo } from "react";
import { ConfigProvider, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import styles from "../../styles/DangerSwitch.module.css";

const DangerSwitch = memo(({ isOnline, toggleStatus }) => {
  return (
    <ConfigProvider>
      <Switch
        checked={isOnline}
        onChange={toggleStatus}
        checkedChildren={<CheckOutlined className={styles["icon-checked"]} />}
        unCheckedChildren={
          <CloseOutlined className={styles["icon-unchecked"]} />
        }
      />
    </ConfigProvider>
  );
});

export default DangerSwitch;
