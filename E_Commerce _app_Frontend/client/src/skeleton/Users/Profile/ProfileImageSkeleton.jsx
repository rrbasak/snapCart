


import React from "react";
import { Row, Col } from "antd";
import { Skeleton } from "@mui/material";

const ProfileSkeleton = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <div style={{ textAlign: "center" }}>
          <Skeleton variant="circular" width={120} height={120} style={{margin:"13px 96px"}}/>
        </div>
      </Col>
    </Row>
  );
};

export default ProfileSkeleton;
