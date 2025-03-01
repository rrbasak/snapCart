import React from "react";
import { Card, Skeleton, Button } from "antd";
import AdminLayout from "../components/layout/AdminLayout";
import styles from "../styles/AdminPrimeDay.module.css";

const ManagePrimeDaySkeleton = () => {
  return (
    <AdminLayout title={"Dashboard - Manage Prime Day"}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">
              <Skeleton.Input active size="large" style={{ width: "729px" }} />
              <div
                className={styles.buttonContainer}
                style={{ marginTop: "20px", display: "flex", gap: "729px" }}
              >
                <Skeleton.Button
                  active
                  size="large"
                  shape="round"
                  style={{ width: "57.51px" }}
                />
                <Skeleton.Button
                  active
                  size="large"
                  shape="round"
                  style={{ width: "57.51px" }}
                />
              </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManagePrimeDaySkeleton;
