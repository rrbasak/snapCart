import React, { memo } from "react";
// Badges component definition
const Badges = memo(({ count }) => {
  return (
    <div>
      {count}
    </div>
  );
});

export default Badges;
