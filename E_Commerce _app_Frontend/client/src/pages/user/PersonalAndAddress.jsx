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

  // Form function
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.put("/api/v1/auth/profile", {
  //       name,
  //       email,
  //       phone,
  //       address,
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
    if (modalField === "name") {
      setName(modalValue);
      //console.log(modalValue);
    } else if (modalField === "dob") {
      setDob(modalValue);
    } else if (modalField === "gender") {
      setGender(modalValue);
    }

    // API call to update the profile
    //console.log("name e toh", name);
    //console.log("name modal e toh", modalValue);
    try {
      //console.log("name e toh", modalValue);
      const { data } = await axios.put("/api/v1/auth/profile", {
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
                        Manage your personal information, including name and
                        date of birth
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
                  {name}
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

          {/* <MDBCol md="6">
            <MDBCard
              className="mb-4 mb-md-0"
              style={{ borderRadius: "15px", height: "116px" }}
            >
              <MDBCardBody>
                <MDBCardText
                  className="mb-4 d-flex justify-content-between"
                  style={{ fontWeight: "bold" }}
                >
                  <span className="font-italic me-1">Date of Birth</span>{" "}
                  <img
                    src={DOB}
                    alt="User Icon"
                    style={{ width: "24px", height: "24px" }}
                  />
                </MDBCardText>
                <MDBCardText className="mb-4" style={{ fontWeight: "lighter" }}>
                  {" "}
                  {dob}
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
                  onClick={() => showModal("dob", dob)}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol> */}

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
                  {formatTimestamp(createdAt)}
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        {/* 2 */}
        <MDBRow className="mb-4">
          {/* <MDBCol md="6">
            <MDBCard
              className="mb-4 mb-md-0"
              style={{ borderRadius: "15px", height: "116px" }}
            >
              <MDBCardBody>
                <MDBCardText
                  className="mb-4 d-flex justify-content-between"
                  style={{ fontWeight: "bold" }}
                >
                  <span className="font-italic me-1">Gender</span>{" "}

                  <img
                    src={Gender}
                    alt="User Icon"
                    style={{ width: "24px", height: "24px" }}
                  />
                </MDBCardText>
                <MDBCardText className="mb-4" style={{ fontWeight: "lighter" }}>
                  {" "}
                  {gender}
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
                  onClick={() => showModal("gender", gender)}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol> */}

          {/* <MDBCol md="6">
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
                  {" "}
                  ________
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol> */}
        </MDBRow>
      </MDBCardBody>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardText,
//   MDBCardBody,
//   MDBIcon,
// } from "mdb-react-ui-kit";
// import { useAuth } from "../../context/auth";

// export default function PersonalAndAddress() {
//   const [auth, setAuth] = useAuth();
//   // State
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [dob, setDob] = useState("");
//   const [country, setCountry] = useState("");
//   const [language, setLanguage] = useState("");

//   // Get user data
//   useEffect(() => {
//     const { email, name, phone, address, dob, country, language } = auth?.user;
//     setName(name);
//     setPhone(phone);
//     setEmail(email);
//     setAddress(address);
//     setDob(dob);
//     setCountry(country);
//     setLanguage(language);
//   }, [auth?.user]);

//   // Form function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.put("/api/v1/auth/profile", {
//         name,
//         email,
//         phone,
//         address,
//         dob,
//         country,
//         language,
//       });
//       if (data?.error) {
//         toast.error(data?.error);
//       } else {
//         setAuth({ ...auth, user: data?.updatedUser });
//         let ls = localStorage.getItem("auth");
//         ls = JSON.parse(ls);
//         ls.user = data.updatedUser;
//         localStorage.setItem("auth", JSON.stringify(ls));
//         toast.success("Profile Updated Successfully");
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <MDBContainer>
//       <MDBRow className="justify-content-center">
//         <MDBCol md="8">
//           <MDBCard className="mb-4">
//             <MDBCardBody>
//               <MDBRow>
//                 <MDBCol sm="4">
//                   <MDBCardText>Name</MDBCardText>
//                 </MDBCol>
//                 <MDBCol sm="8">
//                   <MDBCardText className="text-muted">{name}</MDBCardText>
//                 </MDBCol>
//               </MDBRow>
//               <hr />
//               <MDBRow>
//                 <MDBCol sm="4">
//                   <MDBCardText>Date of Birth</MDBCardText>
//                 </MDBCol>
//                 <MDBCol sm="8">
//                   <MDBCardText className="text-muted">{dob}</MDBCardText>
//                 </MDBCol>
//               </MDBRow>
//               <hr />
//               <MDBRow>
//                 <MDBCol sm="4">
//                   <MDBCardText>Country Region</MDBCardText>
//                 </MDBCol>
//                 <MDBCol sm="8">
//                   <MDBCardText className="text-muted">{country}</MDBCardText>
//                 </MDBCol>
//               </MDBRow>
//               <hr />
//               <MDBRow>
//                 <MDBCol sm="4">
//                   <MDBCardText>Language</MDBCardText>
//                 </MDBCol>
//                 <MDBCol sm="8">
//                   <MDBCardText className="text-muted">{language}</MDBCardText>
//                 </MDBCol>
//               </MDBRow>
//               <hr />
//               <MDBRow>
//                 <MDBCol sm="4">
//                   <MDBCardText>Contactable at</MDBCardText>
//                 </MDBCol>
//                 <MDBCol sm="8">
//                   <MDBCardText className="text-muted">{email}</MDBCardText>
//                 </MDBCol>
//               </MDBRow>
//               <hr />
//               <MDBRow>
//                 <MDBCol sm="4">
//                   <MDBCardText>Phone</MDBCardText>
//                 </MDBCol>
//                 <MDBCol sm="8">
//                   <MDBCardText className="text-muted">{phone}</MDBCardText>
//                 </MDBCol>
//               </MDBRow>
//               <hr />
//               <MDBRow>
//                 <MDBCol sm="4">
//                   <MDBCardText>Address</MDBCardText>
//                 </MDBCol>
//                 <MDBCol sm="8">
//                   <MDBCardText className="text-muted">{address}</MDBCardText>
//                 </MDBCol>
//               </MDBRow>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// }

// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardText,
//   MDBCardBody,
//   MDBCardImage,
//   MDBBreadcrumb,
//   MDBBreadcrumbItem,
//   MDBListGroup,
//   MDBListGroupItem,
//   MDBIcon,
//   MDBProgressBar,
//   MDBProgress,
//   MDBBtn,
// } from "mdb-react-ui-kit";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../../context/auth";
// import UserInfoIcon from "../../SrcImages/userInfo.svg";
// import Gender from "../../SrcImages/gender.svg";
// import DOB from "../../SrcImages/dob.svg";
// import CreatedIcon from "../../SrcImages/created.svg";

// export default function PersonalAndAddress() {
//   const [auth, setAuth] = useAuth();
//   // State
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");

//   // Get user data
//   useEffect(() => {
//     const { email, name, phone, address } = auth?.user;
//     setName(name);
//     setPhone(phone);
//     setEmail(email);
//     setAddress(address);
//   }, [auth?.user]);

//   // Form function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.put("/api/v1/auth/profile", {
//         name,
//         email,
//         phone,
//         address,
//       });
//       if (data?.error) {
//         toast.error(data?.error);
//       } else {
//         setAuth({ ...auth, user: data?.updatedUser });
//         let ls = localStorage.getItem("auth");
//         ls = JSON.parse(ls);
//         ls.user = data.updatedUser;
//         localStorage.setItem("auth", JSON.stringify(ls));
//         toast.success("Profile Updated Successfully");
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div>
//       <MDBCardBody>
//         <MDBRow className="mb-4">
//           <MDBCol lg="12">
//             <MDBCard className="mb-4" style={{ borderRadius: "15px" }}>
//               <MDBCardBody>
//                 <MDBRow>
//                   <MDBCol sm="12">
//                     <MDBCardText
//                       className="text-muted"
//                       style={{ fontWeight: "bold" }}
//                     >
//                       Personal Information
//                     </MDBCardText>
//                     <MDBCardText>
//                       <span style={{ fontWeight: "lighter" }}>
//                         Manage your personal information, including name and
//                         date of birth
//                       </span>
//                     </MDBCardText>
//                   </MDBCol>
//                 </MDBRow>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//         </MDBRow>

//         {/* 1 */}
//         <MDBRow className="mb-4">
//           <MDBCol md="6">
//             <MDBCard
//               className="mb-4 mb-md-0"
//               style={{ borderRadius: "15px", height: "140px" }}
//             >
//               <MDBCardBody>
//                 <MDBCardText
//                   className="mb-2 d-flex justify-content-between"
//                   style={{ fontWeight: "bold" }}
//                 >
//                   <span className="font-italic me-1">Name</span>{" "}
//                   <img
//                     src={UserInfoIcon}
//                     alt="User Icon"
//                     style={{ width: "24px", height: "24px" }}
//                   />
//                 </MDBCardText>
//                 <MDBCardText className="mb-4" style={{ fontWeight: "lighter" }}>
//                   {name}
//                 </MDBCardText>
//                 <MDBBtn
//                   size="sm"
//                   style={{
//                     border: "2px solid",
//                     borderRadius: "12px",
//                   }}
//                 >
//                   Edit
//                 </MDBBtn>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>

//           <MDBCol md="6">
//             <MDBCard
//               className="mb-4 mb-md-0"
//               style={{ borderRadius: "15px", height: "140px" }}
//             >
//               <MDBCardBody>
//                 <MDBCardText
//                   className="mb-2 d-flex justify-content-between"
//                   style={{ fontWeight: "bold" }}
//                 >
//                   <span className="font-italic me-1">Date of Birth</span>{" "}
//                   <img
//                     src={DOB}
//                     alt="DOB Icon"
//                     style={{ width: "24px", height: "24px" }}
//                   />
//                 </MDBCardText>
//                 <MDBCardText className="mb-4" style={{ fontWeight: "lighter" }}>
//                   {" "}
//                   ________
//                 </MDBCardText>
//                 <MDBBtn
//                   size="sm"
//                   style={{
//                     border: "2px solid",
//                     borderRadius: "12px",
//                   }}
//                 >
//                   Edit
//                 </MDBBtn>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//         </MDBRow>

//         {/* 2 */}
//         <MDBRow className="mb-4">
//           <MDBCol md="6">
//             <MDBCard
//               className="mb-4 mb-md-0"
//               style={{ borderRadius: "15px", height: "140px" }}
//             >
//               <MDBCardBody>
//                 <MDBCardText
//                   className="mb-2 d-flex justify-content-between"
//                   style={{ fontWeight: "bold" }}
//                 >
//                   <span className="font-italic me-1">Gender</span>{" "}
//                   <img
//                     src={Gender}
//                     alt="Gender Icon"
//                     style={{ width: "24px", height: "24px" }}
//                   />
//                 </MDBCardText>
//                 <MDBCardText className="mb-4" style={{ fontWeight: "lighter" }}>
//                   {" "}
//                   ________
//                 </MDBCardText>
//                 <MDBBtn
//                   size="sm"
//                   style={{
//                     border: "2px solid",
//                     borderRadius: "12px",
//                   }}
//                 >
//                   Edit
//                 </MDBBtn>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>

//           <MDBCol md="6">
//             <MDBCard
//               className="mb-4 mb-md-0"
//               style={{ borderRadius: "15px", height: "140px" }}
//             >
//               <MDBCardBody>
//                 <MDBCardText
//                   className="mb-2 d-flex justify-content-between"
//                   style={{ fontWeight: "bold" }}
//                 >
//                   <span className="font-italic me-1">Created</span>{" "}
//                   <img
//                     src={CreatedIcon}
//                     alt="Created Icon"
//                     style={{ width: "24px", height: "24px" }}
//                   />
//                 </MDBCardText>
//                 <MDBCardText className="mb-4" style={{ fontWeight: "lighter" }}>
//                   {" "}
//                   ________
//                 </MDBCardText>
//                 <MDBBtn
//                   size="sm"
//                   style={{
//                     border: "2px solid",
//                     borderRadius: "12px",
//                   }}
//                 >
//                   Edit
//                 </MDBBtn>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//         </MDBRow>
//       </MDBCardBody>
//     </div>
//   );
// }
