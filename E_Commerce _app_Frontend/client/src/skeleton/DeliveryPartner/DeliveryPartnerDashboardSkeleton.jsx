import React from "react";
import { Card, Tooltip } from "antd";
import { Row, Col } from "antd";
import { Skeleton } from "@mui/material";

const DeliveryPartnerDashboardSkeleton = () => {
  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <Skeleton width={100} height={20} />
                      <Skeleton width={80} height={30} />
                    </Col>
                    <Col xs={6}>
                      <Skeleton variant="rectangular" width={40} height={40} />
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          {/* <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <Skeleton variant="rectangular" width="100%" height={250} />
                <Skeleton variant="rectangular" width="100%" height={173} />
              </div>
            </Card>
          </Col> */}
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Skeleton variant="rectangular" width="100%" height={423} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DeliveryPartnerDashboardSkeleton;
