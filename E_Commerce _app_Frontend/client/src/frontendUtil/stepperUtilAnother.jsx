import { Stepper } from "react-form-stepper";
import React from 'react'

export default function StepperUtilAnother() {
  return (
    <div>
      <Stepper
        steps={[{ label: "Step 1" }, { label: "Step 2" }, { label: "Step 3" }]}
        activeStep={2}
      />
    </div>
  );
}
