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
const OrdersTableSkeleton = () => {
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
      title: "DATE",
      dataIndex: "date",
      key: "date",
      render: () => <Skeleton.Input active size="small" />,
    },
    {
      title: "PAYMENT",
      dataIndex: "payment",
      key: "payment",
      render: () => <Skeleton.Button active size="small" />,
    },
    {
      title: "STATUS UPDATE DATE",
      dataIndex: "updateDate",
      key: "updateDate",
      render: () => <Skeleton.Input active size="small" />,
    },
    {
      title: "PRODUCTS",
      dataIndex: "products",
      key: "products",
      render: () => <Skeleton.Avatar active size="small" />,
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
      render: () => <Skeleton.Input active size="small" />,
    },
    {
      title: "ORDER STATUS",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: () => <Skeleton.Button active size="small" />,
    },
    {
      title: "PARTNER",
      dataIndex: "partner",
      key: "partner",
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

export default OrdersTableSkeleton;
