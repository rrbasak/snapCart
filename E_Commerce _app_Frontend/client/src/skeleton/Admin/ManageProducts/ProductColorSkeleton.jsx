import React from "react";
import { Table, Skeleton, Row, Col } from "antd";
import AdminLayout from "../../../components/layout/AdminLayout";
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
const ProductSizeSkeleton = () => {
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
      title: "PRODUCT COLOR",
      dataIndex: "productcolor",
      key: "productcolor",
      render: () => <Skeleton.Button active size="small" />,
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      render: () => <Skeleton.Input active size="small" />,
    },
  ];

  const data = Array.from({ length: 5 }).map((_, index) => ({ key: index }));

  return (
    <AdminLayout title={"Dashboard - Create Product Color"}>
      <div className="col-md-12">
        <Row gutter={[24, 0]}>
          <Col xs={24} xl={24}>
            <Table
              //   className={styles.customTable}
              bordered
              columns={columns}
              dataSource={data}
            />
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
};

export default ProductSizeSkeleton;
