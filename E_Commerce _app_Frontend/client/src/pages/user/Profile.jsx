import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
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
} from "mdb-react-ui-kit";
import { NavLink, useLocation } from "react-router-dom";
import Orders from "./Orders";
import PersonalAndAddress from "./PersonalAndAddress";
import ContactReferences from "./ContactReferences";
import GiftCards from "./GiftCards";
import { IoPersonCircleOutline } from "react-icons/io5";
import Info from "../../SrcImages/info.svg";
import Contact from "../../SrcImages/contact.svg";
import MyOrders from "../../SrcImages/orders.svg";
import Giftcards from "../../SrcImages/giftcards.svg";
import OrdersAnother from "./OrdersAnother";
import { useNavigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import ProfileSkeleton from "../../skeleton/Users/Profile/ProfileImageSkeleton";
import ImageUpload from "../../components/commonComponents/ImageUpload";

export default function Profile() {
  // Context
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // State
  const location = useLocation();
  console.log("activeTab", location.state?.activeTab);
  const queryParams = new URLSearchParams(location.search);
  const defaultTab =
    location.state?.activeTab || queryParams.get("tab") || "personalAndAddress";

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profilePhoto, setProfilePhoto] = useState();

  //photo state
  const [photo, setPhoto] = useState("");

  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageChange = (fileList) => {
    setUploadedImage(fileList.length > 0 ? fileList[0] : null);
  };

  //loader
  const [profileDataLoader, setProfileDataLoader] = useState(false);

  // Get user data
  // useEffect(() => {
  //   const { email, name, phone, address, photo } = auth?.user;
  //   setName(name);
  //   setPhone(phone);
  //   setEmail(email);
  //   setAddress(address);
  //   if (photo && photo.data && photo.contentType) {
  //     const base64String = btoa(
  //       String.fromCharCode(...new Uint8Array(photo.data.data))
  //     );
  //     setProfilePhoto(`data:${photo.contentType};base64,${base64String}`);
  //   }
  // }, [auth?.user]);

  const userDetailsfunc = async () => {
    try {
      setProfileDataLoader(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/get-user/${auth?.user?._id}`
      );

      if (data.success) {
        const { email, name, phone, address, photo } = data?.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);

        if (photo && photo.data && photo.contentType) {
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(photo.data.data))
          );
          setProfilePhoto(`data:${photo.contentType};base64,${base64String}`);
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setProfileDataLoader(false);
    }
  };

  useEffect(() => {
    if (auth?.user?._id) {
      userDetailsfunc();
    }
  }, []);
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state?.activeTab]);
  //console.log("Profile Photo URL:", profilePhoto);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    //console.log("files", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
        // setPhoto(file);
        // handleCreate(file);
        uploadPhoto(file);
      };
      reader.readAsDataURL(file);
    }
  };

  //create product function
  // const handleCreate = async () => {
  //   try {
  //     const productData = new FormData();
  //     productData.append("photo", photo);

  //     const { data } = await axios.put("/api/v1/auth/upload-pic", productData);
  //     if (data?.success) {
  //       toast.success(data?.message);
  //     } else {
  //       toast.error(data?.message);
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //   }
  // };

  // // one
  // const handleCreate = async (photo) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("photo", photo);
  //     //console.log("formData", formData);
  //     const { data } = await axios.put("/api/v1/auth/upload-pic", formData);
  //     //console.log("data here", data);
  //     if (data?.success) {
  //       const updatedUser = data?.updatedUser;
  //       //console.log("updatedUser here", updatedUser);
  //       const updatedAuth = { ...auth, user: updatedUser };
  //       //console.log("updatedAuth here", updatedAuth); // Preserve all properties of auth
  //       setAuth(updatedAuth);
  //       //console.log("localstorage here", localStorage.getItem("auth"));
  //       localStorage.setItem("auth", JSON.stringify(updatedAuth)); // Store the updated auth in localStorage
  //       toast.success(data?.message);
  //     } else {
  //       toast.error(data?.message);
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //   }
  // };

  const uploadPhoto = async (file) => {
    try {
      const formData = new FormData();
      formData.append("photo", file);

      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/upload-pic`, formData);
      if (data?.success) {
        // const updatedUser = data?.updatedUser;
        // const updatedAuth = { ...auth, user: updatedUser };
        // setAuth(updatedAuth);
        // localStorage.setItem("auth", JSON.stringify(updatedAuth));
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong during the photo upload.");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <section style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5">
          {/* <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                <MDBBreadcrumbItem>
                  <a href="#">Home</a>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem>
                  <a href="#">User</a>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
              </MDBBreadcrumb>
            </MDBCol>
          </MDBRow> */}

          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4" style={{ borderRadius: "22px" }}>
                <MDBCardBody
                  className="text-center d-flex flex-column align-items-center justify-content-center"
                  style={{ borderRadius: "15px", minHeight: "200px" }}
                >
                  {profileDataLoader ? (
                    <div
                    // style={{
                    //   width: "150px",
                    //   height: "150px",
                    //   textAlign: "center",
                    // }}
                    >
                      <ProfileSkeleton />
                    </div>
                  ) : (
                    <>
                      <ImageUpload
                        profilePhoto={profilePhoto}
                        setProfilePhoto={setProfilePhoto}
                        setAuth={setAuth}
                        auth={auth}
                      />
                    </>
                  )}
                </MDBCardBody>
              </MDBCard>

              <MDBCard
                className="mb-4 mb-lg-0"
                style={{ border: "1px", borderRadius: "15px" }}
              >
                <MDBCardBody
                  className="p-0"
                  style={{ backgroundColor: "#eee" }}
                >
                  <MDBListGroup flush className="rounded-3">
                    {/* 1 */}
                    <MDBListGroupItem
                      className="d-flex justify-content-between align-items-center p-3"
                      style={{
                        borderRadius: "15px",
                        marginBottom: "7px",
                        flexDirection: "row-reverse",
                        cursor: "pointer",
                      }}
                      onClick={() => setActiveTab("personalAndAddress")}
                    >
                      {/* <img
                        src={Info}
                        alt="User Icon"
                        style={{ width: "24px", height: "24px" }}
                      /> */}
                      <InfoOutlinedIcon />
                      <MDBCardText>
                        <span
                          className="list-group-item list-group-item-action"
                          style={{
                            border: "0px",
                            backgroundColor: "white",
                            fontWeight: "bold",
                          }}
                        >
                          Personal and Address Details
                        </span>
                      </MDBCardText>
                    </MDBListGroupItem>
                    {/* 2 */}
                    <MDBListGroupItem
                      className="d-flex justify-content-between align-items-center p-3"
                      style={{
                        borderRadius: "15px",
                        marginBottom: "7px",
                        flexDirection: "row-reverse",
                        cursor: "pointer",
                      }}
                      onClick={() => setActiveTab("contactReferences")}
                    >
                      <img
                        src={Contact}
                        alt="User Icon"
                        style={{ width: "24px", height: "24px" }}
                      />
                      <MDBCardText>
                        <span
                          className="list-group-item list-group-item-action"
                          style={{
                            border: "0px",
                            backgroundColor: "white",
                            fontWeight: "bold",
                          }}
                        >
                          Contact references
                        </span>
                      </MDBCardText>
                    </MDBListGroupItem>
                    {/* 3 */}
                    <MDBListGroupItem
                      className="d-flex justify-content-between align-items-center p-3"
                      style={{
                        borderRadius: "15px",
                        marginBottom: "7px",
                        flexDirection: "row-reverse",
                        cursor: "pointer",
                      }}
                      onClick={() => setActiveTab("orders")}
                    >
                      <img
                        src={MyOrders}
                        alt="User Icon"
                        style={{ width: "24px", height: "24px" }}
                      />
                      <MDBCardText>
                        <span
                          className="list-group-item list-group-item-action"
                          style={{
                            border: "0px",
                            backgroundColor: "white",
                            fontWeight: "bold",
                          }}
                        >
                          My orders
                        </span>
                      </MDBCardText>
                    </MDBListGroupItem>
                    {/* 4 */}
                    <MDBListGroupItem
                      className="d-flex justify-content-between align-items-center p-3"
                      style={{
                        borderRadius: "15px",
                        marginBottom: "7px",
                        flexDirection: "row-reverse",
                        cursor: "pointer",
                      }}
                      onClick={() => setActiveTab("giftCards")}
                    >
                      {/* <img
                        src={Giftcards}
                        alt="User Icon"
                        style={{ width: "24px", height: "24px" }}
                      /> */}
                      <CardGiftcardOutlinedIcon />
                      <MDBCardText>
                        <span
                          className="list-group-item list-group-item-action"
                          style={{
                            border: "0px",
                            backgroundColor: "white",
                            fontWeight: "bold",
                          }}
                        >
                          Gift cards
                        </span>
                      </MDBCardText>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              {activeTab === "personalAndAddress" && <PersonalAndAddress />}
              {activeTab === "contactReferences" && <ContactReferences />}
              {activeTab === "orders" && <OrdersAnother />}
              {activeTab === "giftCards" && <GiftCards />}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </Layout>
  );
}
