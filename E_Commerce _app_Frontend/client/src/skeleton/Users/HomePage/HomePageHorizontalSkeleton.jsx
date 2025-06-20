import React from "react";
import { Card, Tooltip } from "antd";
import { Row, Col } from "antd";
import { Skeleton } from "@mui/material";

const HomePageHorizontalSkeleton = () => {
  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={10} xl={24} className="mb-24">
            <Card bordered={false}>
              <Skeleton
                variant="rectangular"
                width="1230px"
                height="150px"
                style={{ margin: "-15px -20px" }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomePageHorizontalSkeleton;


