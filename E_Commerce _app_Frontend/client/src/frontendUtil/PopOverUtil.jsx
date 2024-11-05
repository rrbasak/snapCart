import React, { useMemo, useState } from "react";
import { Button, ConfigProvider, Popover, Segmented } from "antd";
const text = <span>Title</span>;
const buttonWidth = 80;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const PopOverUtil = () => {
  const [arrow, setArrow] = useState("Show");
  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);
  return (
    <ConfigProvider
      button={{
        style: {
          width: buttonWidth,
          margin: 4,
        },
      }}
    >
      <Segmented
        options={["Show", "Hide", "Center"]}
        onChange={(val) => setArrow(val)}
        style={{
          marginBottom: 24,
        }}
      />
      <div className="demo">
        <div
          style={{
            marginInlineStart: buttonWidth,
            clear: "both",
            whiteSpace: "nowrap",
          }}
        >
          <Popover
            placement="bottom"
            title={text}
            content={content}
            arrow={mergedArrow}
          >
            <Button>Bottom</Button>
          </Popover>
        </div>
      </div>
    </ConfigProvider>
  );
};
export default PopOverUtil;
