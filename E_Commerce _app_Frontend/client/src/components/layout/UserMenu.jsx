// import React from 'react'
// import { NavLink } from 'react-router-dom';
// import { QuestionCircleOutlined, SyncOutlined } from "@ant-design/icons";
// import { FloatButton } from "antd";
// import styles from "../../styles/FloatButtons.module.css";

// export default function UserMenu() {
//   return (
//     <div>
//       <div className="text-center">
//         <div className="list-group">
//           <h4>Dashboard</h4>
//           <NavLink
//             to="/dashboard/user/profile"
//             className="list-group-item list-group-item-action"
//           >
//             Profile
//           </NavLink>
//           <NavLink
//             to="/dashboard/user/orders"
//             className="list-group-item list-group-item-action"
//           >
//             Orders
//           </NavLink>
//           {/* <FloatButton.Group shape="circle" className={styles.floatButtonGroup}>
//             <FloatButton icon={<QuestionCircleOutlined />} />
//             <FloatButton />
//             <FloatButton.BackTop visibilityHeight={0} />
//           </FloatButton.Group> */}
//         </div>
//       </div>
//     </div>
//   );
// }




import React from "react";
import { NavLink } from "react-router-dom";
import { QuestionCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import styles from "../../styles/FloatButtons.module.css";

export default function UserMenu() {
  return (
    <div>
      <div className="text-center">
        <div className="list-group">
          <h4>Dashboard</h4>
          <NavLink
            to="/dashboard/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
          {/* <FloatButton.Group shape="circle" className={styles.floatButtonGroup}>
            <FloatButton icon={<QuestionCircleOutlined />} />
            <FloatButton />
            <FloatButton.BackTop visibilityHeight={0} />
          </FloatButton.Group> */}
        </div>
      </div>
    </div>
  );
}
