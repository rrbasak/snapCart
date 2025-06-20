import React from "react";
import { Card } from "antd";
import { Row, Col } from "antd";
import { Skeleton } from "@mui/material";

const ProfileSkeleton = () => {
  return (
    <Row gutter={[16, 16]}>
      {/* Profile Image */}
      <Col span={6}>
        <Card bordered={false} style={{ textAlign: "center" }}>
          <Skeleton variant="circular" width={120} height={120} />
        </Card>
      </Col>

      {/* Personal Information */}
      <Col span={18}>
        <Card bordered={false}>
          <Skeleton width={200} height={20} />
          <Skeleton width={300} height={15} />
        </Card>
      </Col>

      {/* Name and Created Date */}
      <Col span={12}>
        <Card bordered={false}>
          <Skeleton width={150} height={20} />
          <Skeleton width={250} height={15} />
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={false}>
          <Skeleton width={100} height={20} />
          <Skeleton width={200} height={15} />
        </Card>
      </Col>

      {/* Sidebar options */}
      <Col span={24}>
        <Card bordered={false}>
          <Skeleton width={300} height={50} />
          <Skeleton width={300} height={50} />
          <Skeleton width={300} height={50} />
          <Skeleton width={300} height={50} />
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileSkeleton;
