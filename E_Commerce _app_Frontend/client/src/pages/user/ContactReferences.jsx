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
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";

import EmailIcon from "../../SrcImages/emailIcon.svg";
import AddressIcon from "../../SrcImages/addressIcon.svg";
import StateIcon from "../../SrcImages/stateIcon.svg";
import CountryIcon from "../../SrcImages/countryIcon.svg";
import MobileIcon from "../../SrcImages/mobileIcon.svg";
import CityIcon from "../../SrcImages/cityIcon.svg";
import EditIcon from "../../SrcImages/editIcon.svg";
import { OpenModal } from "../../components/Modals/OpenModal";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EditLocationOutlinedIcon from "@mui/icons-material/EditLocationOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import Tooltip from "@mui/material/Tooltip";

export default function ContactReferences() {
  const [auth, setAuth] = useAuth();
  // State
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalField, setModalField] = useState("");
  const [modalValue, setModalValue] = useState("");

  // Get user data
  useEffect(() => {
    const { email, phone, address, city, state, country } = auth?.user;
    setEmail(email);
    setPhone(phone);
    setAddress(address);
    setCity(city);
    setState(state);
    setCountry(country);
  }, [auth?.user]);

  // Form function
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.put("/api/v1/auth/contactref", {
  //       address,
  //       city,
  //       state,
  //       country,
  //     });
  //     if (data?.error) {
  //       toast.error(data?.error);
  //     } else {
  //       setAuth({ ...auth, user: data?.updatedUser });
  //       let ls = localStorage.getItem("auth");
  //       ls = JSON.parse(ls);
  //       ls.user = data.updatedUser;
  //       localStorage.setItem("auth", JSON.stringify(ls));
  //       toast.success("Profile Updated Successfully");
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //   }
  // };

  const showModal = (field, value) => {
    setModalField(field);
    setModalValue(value);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (modalField === "address") {
      setAddress(modalValue);
    } else if (modalField === "city") {
      setCity(modalValue);
    } else if (modalField === "state") {
      setState(modalValue);
    } else if (modalField === "country") {
      setCountry(modalValue);
    }

    let payload = {};

    if (modalField === "address") {
      payload.address = modalValue;
    } else if (modalField === "city") {
      payload.city = modalValue;
    } else if (modalField === "state") {
      payload.state = modalValue;
    } else if (modalField === "country") {
      payload.country = modalValue;
    }

    // API call to update the contact references
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/contactref`, payload);
      if (data?.error) {
        toast.error(data?.error);
      } else {
        // Update local state and localStorage
        let updatedUser = { ...auth.user, ...data.updatedUser };

        // Add city, state, and country fields if they don't exist
        if (!auth.user.city && data.updatedUser.city) {
          updatedUser.city = data.updatedUser.city;
        }
        if (!auth.user.state && data.updatedUser.state) {
          updatedUser.state = data.updatedUser.state;
        }
        if (!auth.user.country && data.updatedUser.country) {
          updatedUser.country = data.updatedUser.country;
        }

        setAuth({ ...auth, user: updatedUser });

        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = updatedUser; // Merge updated fields with existing user data
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
        {/* headers */}
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
                      Contact references
                    </MDBCardText>
                    <MDBCardText>
                      <span style={{ fontWeight: "lighter" }}>
                        Manage your personal information, including phone
                        numbers and address where you can be contacted
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
              style={{ borderRadius: "15px", height: "116px" }}
            >
              <MDBCardBody>
                <MDBCardText
                  className="mb-4 d-flex justify-content-between"
                  style={{ fontWeight: "bold" }}
                >
                  <span className=" font-italic me-1">Email</span>{" "}
                  {/* <MDBIcon fas icon="globe fa-lg text-warning" /> */}
                  {/* <img
                    src={EmailIcon}
                    alt="User Icon"
                    style={{ width: "24px", height: "24px" }}
                  /> */}
                  <EmailOutlinedIcon />
                </MDBCardText>
                <Tooltip title="verified" arrow>
                  <VerifiedOutlinedIcon
                    style={{
                      width: "24px",
                      height: "24px",
                      position: "absolute",
                      bottom: "25px",
                      right: "17px",
                      color: "green",
                    }}
                  />
                </Tooltip>

                <MDBCardText className="mb-4" style={{ fontWeight: "lighter" }}>
                  {email}
                </MDBCardText>
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
                  <span className=" font-italic me-1">Phone</span>{" "}
                  {/* <MDBIcon fas icon="globe fa-lg text-warning" /> */}
                  {/* <img
                    src={MobileIcon}
                    alt="User Icon"
                    style={{ width: "24px", height: "24px" }}
                  /> */}
                  <PhoneIphoneOutlinedIcon />
                </MDBCardText>
                <Tooltip title="verified" arrow>
                  <VerifiedOutlinedIcon
                    style={{
                      width: "24px",
                      height: "24px",
                      position: "absolute",
                      bottom: "25px",
                      right: "17px",
                      color: "green",
                    }}
                  />
                </Tooltip>
                <MDBCardText className="mb-4" style={{ fontWeight: "lighter" }}>
                  {" "}
                  {phone}
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        {/* 2 */}
        <MDBRow className="mb-4">
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
                  <span className=" font-italic me-1">Address</span>{" "}
                  {/* <MDBIcon fas icon="globe fa-lg text-warning" /> */}
                  {/* <img
                    src={AddressIcon}
                    alt="User Icon"
                    style={{ width: "24px", height: "24px" }}
                  /> */}
                  <EditLocationOutlinedIcon />
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
                  onClick={() => showModal("address", address)}
                />
                <MDBCardText className="mb-4" style={{ fontWeight: "lighter" }}>
                  {" "}
                  {address}
                </MDBCardText>
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
                  <span className=" font-italic me-1">City</span>{" "}
                  {/* <MDBIcon fas icon="globe fa-lg text-warning" /> */}
                  <img
                    src={CityIcon}
                    alt="User Icon"
                    style={{ width: "24px", height: "24px" }}
                  />
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
                  onClick={() => showModal("city", city)}
                />
                <MDBCardText className="mb-4" style={{ fontWeight: "lighter" }}>
                  {city}
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        {/* 3 */}

        <MDBRow className="mb-4">
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
                  <span className=" font-italic me-1">State</span>{" "}
                  {/* <MDBIcon fas icon="globe fa-lg text-warning" /> */}
                  {/* <img
                    src={StateIcon}
                    alt="User Icon"
                    style={{ width: "24px", height: "24px" }}
                  /> */}
                  <EditLocationOutlinedIcon />
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
                  onClick={() => showModal("state", state)}
                />
                <MDBCardText className="mb-4" style={{ fontWeight: "lighter" }}>
                  {state}
                </MDBCardText>
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
                  <span className=" font-italic me-1">Country</span>{" "}
                  {/* <MDBIcon fas icon="globe fa-lg text-warning" /> */}
                  {/* <img
                    src={CountryIcon}
                    alt="User Icon"
                    style={{ width: "24px", height: "24px" }}
                  /> */}
                  <LanguageOutlinedIcon />
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
                  onClick={() => showModal("country", country)}
                />
                <MDBCardText className="mb-4" style={{ fontWeight: "lighter" }}>
                  {country}
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </div>
  );
}
