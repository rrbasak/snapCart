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
const DeliveryPartnersSkeleton = () => {
  const { styles } = useStyle();

  const columns = [
    {
      title: "Sl No.",
      key: "index",
      fixed: "left",
      render: () => <Skeleton.Button active size="small" />,
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: () => <Skeleton.Button active size="small" />,
    },
    {
      title: "OWNER NAME",
      dataIndex: "ownerName",
      key: "ownerName",
      render: () => <Skeleton.Button active size="small" />,
    },
    {
      title: "VEHICLE",
      key: "vehicle",
      render: () => <Skeleton.Button active size="small" />,
    },
    {
      title: "REGISTRATION",
      dataIndex: "registrationNumber",
      key: "registrationNumber",
      render: () => <Skeleton.Button active size="small" />,
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
      render: () => <Skeleton.Button active size="small" />,
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
      render: () => <Skeleton.Button active size="small" />,
    },
    {
      title: "STATUS",
      key: "status",
      fixed: "right",
      render: () => <Skeleton.Button active size="small" />,
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

export default DeliveryPartnersSkeleton;
