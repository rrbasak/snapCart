import React from "react";
import { Table, Skeleton, Row, Col } from "antd";
import DeliveryPartnerLayout from "../../components/layout/DeliveryPartnerLayout";
import { createStyles } from "antd-style";
const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});
const AssignedDeliveriesSkeleton = () => {
  const { styles } = useStyle();
  const columns = [
    {
      title: "Sl No.",
      dataIndex: "slNo",
      key: "slNo",
      fixed: "left",
      render: () => <Skeleton.Input active size="small" />,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: () => <Skeleton.Button active size="small" />,
    },
    {
      title: "BUYER",
      dataIndex: "buyer",
      key: "buyer",
      render: () => <Skeleton.Input active size="small" />,
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
      render: () => <Skeleton.Input active size="small" />,
    },
    {
      title: "PHONE NO.",
      dataIndex: "phoneno",
      key: "phoneno",
      render: () => <Skeleton.Input active size="small" />,
    },
    {
      title: "PRODUCTS",
      dataIndex: "products",
      key: "products",
      render: () => <Skeleton.Avatar active size="small" />,
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      render: () => <Skeleton.Input active size="small" />,
    },
  ];

  const data = Array.from({ length: 5 }).map((_, index) => ({ key: index }));

  return (
    <DeliveryPartnerLayout title={"Dashboard - Orders"}>
      <div className="col-md-12">
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={24}>

            <Table
              className={styles.customTable}
              bordered
              columns={columns}
              dataSource={data}

            />

          </Col>
        </Row>
      </div>
    </DeliveryPartnerLayout>
  );
};

export default AssignedDeliveriesSkeleton;
