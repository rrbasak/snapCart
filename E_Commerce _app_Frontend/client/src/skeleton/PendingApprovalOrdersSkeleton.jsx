import React from "react";
import { Table, Skeleton, Row, Col } from "antd";
import AdminLayout from "../components/layout/AdminLayout";
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
const PendingApprovalOrdersSkeleton = () => {
  const { styles } = useStyle();

  const columns = [
    {
      title: "Sl No.",
      key: "index",
      fixed: "left",
      render: () => <Skeleton.Input active size="small" />,
    },
    {
      title: "BUYER NAME",
      dataIndex: "name",
      key: "name",
      render: () => <Skeleton.Input active size="small" />,
    },
    {
      title: "BUYER EMAIL",
      dataIndex: "email",
      key: "email",
      render: () => <Skeleton.Input active size="small" />,
    },
    {
      title: "PARTNER NAME",
      dataIndex: "partnerName",
      key: "partnerName",
      render: () => <Skeleton.Input active size="small" />,
    },
    {
      title: "PARTNER PHONE",
      dataIndex: "partnerPhone",
      key: "partnerPhone",
      render: () => <Skeleton.Input active size="small" />,
    },
    {
      title: "PRODUCTS",
      key: "products",
      render: () => <Skeleton.Input active size="small" />,
    },
    {
      title: "DELIVERY STATUS",
      dataIndex: "deliverystatus",
      key: "deliverystatus",
      render: () => <Skeleton.Input active size="small" />,
    },
    {
      title: "ACTION",
      key: "action",
      fixed: "right",
      render: () => <Skeleton.Input active size="small" />,
    },
  ];

  const data = Array.from({ length: 5 }).map((_, index) => ({ key: index }));

  return (
    <AdminLayout title={"Dashboard - Orders"}>
      <div className="col-md-12">
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={24}>
            {/* <div className="table-responsive"> */}
            <Table
              className={styles.customTable}
              bordered
              columns={columns}
              dataSource={data}
              // pagination={{ pageSize: 5 }}
              // scroll={{ x: "max-content" }}
            />
            {/* </div> */}
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
};

export default PendingApprovalOrdersSkeleton;
