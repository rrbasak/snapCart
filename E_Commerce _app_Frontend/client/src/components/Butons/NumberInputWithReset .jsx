import React, { useState } from "react";
import { Button, InputNumber, Space } from "antd";

const NumberInputWithReset = ({
  initialValue = 99,
  min = 1,
  max = 10,
  onQuantityChange,
  onReset,
}) => {
  const [value, setValue] = useState(initialValue);
  const handleValueChange = (newValue) => {
    setValue(newValue);
    onQuantityChange(newValue);
  };

  const handleResetClick = () => {
    setValue(initialValue); // Reset the input field value
    onReset(initialValue); // Call the reset function from the parent
  };
  const showResetButton = value !== initialValue;
  return (
    <Space>
      <InputNumber
        min={min}
        max={max}
        value={value}
        onChange={handleValueChange}
        onKeyPress={(e) => e.preventDefault()} // Prevent typing in the input
        onPaste={(e) => e.preventDefault()} // Prevent pasting into the input
      />
      {showResetButton && (
        <Button type="primary" onClick={handleResetClick}>
          Reset
        </Button>
      )}
    </Space>
  );
};

export default NumberInputWithReset;
