import React from "react";
import { DatePicker, Space } from "antd";
const onChange = (date, dateString) => {
  ////console.log(date, dateString);
};
export const Datepicker = () => (
  <Space direction="vertical">
    <DatePicker onChange={onChange} />
  </Space>
);
export default Datepicker;
