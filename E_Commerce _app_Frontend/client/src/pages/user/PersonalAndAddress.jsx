/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon,
  MDBProgressBar,
  MDBProgress,
  MDBBtn,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import UserInfoIcon from "../../SrcImages/userInfo.svg";
import Gender from "../../SrcImages/gender.svg";
import DOB from "../../SrcImages/dob.svg";
import CreatedIcon from "../../SrcImages/created.svg";
import EditIcon from "../../SrcImages/editIcon.svg";
import { OpenModal } from "../../components/Modals/OpenModal";
import formatTimestamp from "../../frontendUtil/dateUtil.js";
import { Skeleton } from "@mui/material";

export default function PersonalAndAddress() {
  const [auth, setAuth] = useAuth();
  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [modalName, setModalName] = useState("");
  const [modalField, setModalField] = useState("");
  const [modalValue, setModalValue] = useState("");

  // Get user data
  useEffect(() => {
    const { email, name, phone, address, createdAt } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
    setCreatedAt(createdAt);
  }, [auth?.user]);

  
  const showModal = (field, value) => {
    setModalField(field);
    setModalValue(value);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (modalField === "name") {
      setName(modalValue);
      //console.log(modalValue);
    } else if (modalField === "dob") {
      setDob(modalValue);
    } else if (modalField === "gender") {
      setGender(modalValue);
    }


    try {
      //console.log("name e toh", modalValue);
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, {
        name: modalValue,
        // email,
        // phone,
        // address,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // useEffect(()=>{
  //   //console.log("hehe",name);
  // },[name])
  return (
    <div>
      <OpenModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        modalValue={modalValue}
        setModalValue={setModalValue}
        modalField={modalField}
      />
      <MDBCardBody>
        <MDBRow className="mb-4">
          <MDBCol lg="12">
            <MDBCard className="mb-4" style={{ borderRadius: "15px" }}>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="12">
                    <MDBCardText
                      className="text-muted"
                      style={{ fontWeight: "bold" }}
                    >
                      Personal Information
                    </MDBCardText>
                    <MDBCardText>
                      <span style={{ fontWeight: "lighter" }}>
                        Manage your personal information
                      </span>
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        {/* 1 */}
        <MDBRow className="mb-4">
          <MDBCol md="6">
            <MDBCard
              className="mb-4 mb-md-0"
              style={{
                borderRadius: "15px",
                height: "116px",
                position: "relative",
              }}
            >
              <MDBCardBody>
                <MDBCardText
                  className="mb-2 d-flex justify-content-between align-items-center"
                  style={{ fontWeight: "bold" }}
                >
                  <span className="font-italic me-1">Name</span>
                  <img
                    src={UserInfoIcon}
                    alt="User Icon"
                    style={{ width: "24px", height: "24px" }}
                  />
                </MDBCardText>
                <MDBCardText className="mb-4" style={{ fontWeight: "lighter" }}>
                  {name || (
                    <Skeleton
                      variant="rectangle"
                      width={50}
                      height={10}
                      style={{ margin: "13px 96px" }}
                    />
                  )}
                </MDBCardText>
                <img
                  src={EditIcon}
                  alt="Edit Icon"
                  style={{
                    width: "24px",
                    height: "24px",
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => showModal("name", name)}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          

          <MDBCol md="6">
            <MDBCard
              className="mb-4 mb-md-0"
              style={{ borderRadius: "15px", height: "116px" }}
            >
              <MDBCardBody>
                <MDBCardText
                  className="mb-4 d-flex justify-content-between"
                  style={{ fontWeight: "bold" }}
                >
                  <span className="font-italic me-1">Created</span>{" "}
                  <img
                    src={CreatedIcon}
                    alt="User Icon"
                    style={{ width: "24px", height: "24px" }}
                  />
                </MDBCardText>
                <MDBCardText className="mb-4" style={{ fontWeight: "lighter" }}>
                  {formatTimestamp(createdAt) || (
                    <Skeleton
                      variant="rectangle"
                      width={50}
                      height={10}
                      style={{ margin: "13px 96px" }}
                    />
                  )}
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        {/* 2 */}
        <MDBRow className="mb-4">
          
        </MDBRow>
      </MDBCardBody>
    </div>
  );
}

