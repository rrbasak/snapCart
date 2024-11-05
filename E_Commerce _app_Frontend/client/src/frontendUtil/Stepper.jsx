

import React from "react";
import { Steps } from "antd";
import styles from "../styles/Stepper.module.css";

const description = "This is a description.";

const App = () => (
  <div className={styles.fadeIn}>
    <Steps
      direction="vertical"
      size="small"
      current={2}
      items={[
        {
          title: "Finished",
          description,
          className: styles.stepFinish, // Apply custom class to finished step
        },
        {
          title: "In Progress",
          description,
          className: styles.stepActive, // Apply custom class to active step
        },
        {
          title: "Waiting",
          description,
        },
      ]}
    />
  </div>
);

export default App;
