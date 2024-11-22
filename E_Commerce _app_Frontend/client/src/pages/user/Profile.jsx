/* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import Layout from "../../components/layout/Layout";
// import UserMenu from "../../components/layout/UserMenu";
// import { useAuth } from "../../context/auth";
// import toast from "react-hot-toast";
// import axios from "axios";
// export default function Profile() {
//   //context
//   const [auth, setAuth] = useAuth();
//   //state
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   //get user data
//   useEffect(() => {
//     const { email, name, phone, address } = auth?.user;
//     setName(name);
//     setPhone(phone);
//     setEmail(email);
//     setAddress(address);
//   }, [auth?.user]);

//   // form function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.put("/api/v1/auth/profile", {
//         name,
//         email,
//         password,
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
//       ////console.log(error);
//       toast.error("Something went wrong");
//     }
//   };
//   return (
//     <Layout title={"Your Profile"}>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-1">
//             <UserMenu />
//           </div>
//           <div className="col-md-9">
//             <div>
//             {/* <div className="form-container "> */}
//               <form onSubmit={handleSubmit}>
//                 <h4 className="title">USER PROFILE</h4>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     placeholder="Enter Your Name"
//                     autoFocus
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     placeholder="Enter Your Email "
//                     disabled
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="form-control"
//                     id="exampleInputPassword1"
//                     placeholder="Enter Your Password"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     placeholder="Enter Your Phone"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     className="form-control"
//                     id="exampleInputEmail1"
//                     placeholder="Enter Your Address"
//                   />
//                 </div>

//                 <button type="submit" className="btn btn-primary">
//                   UPDATE
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// import React, { useEffect, useState } from "react";
// import Layout from "../../components/layout/Layout";
// import UserMenu from "../../components/layout/UserMenu";
// import { useAuth } from "../../context/auth";
// import toast from "react-hot-toast";
// import axios from "axios";

// export default function Profile() {
//   // Context
//   const [auth, setAuth] = useAuth();

//   // State
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
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
//         password,
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
//     <Layout title={"Your Profile"}>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-1">
//             <UserMenu />
//           </div>
//           <div className="col-md-11">
//             <div className="row">
//               <div className="col-md-6 d-flex align-items-center justify-content-center">
//                 <div className="profile-picture-box text-center">
//                   <img
//                     src="path_to_profile_picture" // Replace with actual path or state for profile picture
//                     alt="Profile"
//                     className="img-fluid rounded-circle"
//                   />
//                   <div className="mt-3">
//                     <input type="file" className="form-control" />
//                     <button className="btn btn-secondary mt-2">
//                       Upload Picture
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <form onSubmit={handleSubmit}>
//                   <h4 className="title">USER PROFILE</h4>
//                   <div className="mb-3">
//                     <input
//                       type="text"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       className="form-control"
//                       placeholder="Enter Your Name"
//                       autoFocus
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="form-control"
//                       placeholder="Enter Your Email "
//                       disabled
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="form-control"
//                       placeholder="Enter Your Password"
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       type="text"
//                       value={phone}
//                       onChange={(e) => setPhone(e.target.value)}
//                       className="form-control"
//                       placeholder="Enter Your Phone"
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <input
//                       type="text"
//                       value={address}
//                       onChange={(e) => setAddress(e.target.value)}
//                       className="form-control"
//                       placeholder="Enter Your Address"
//                     />
//                   </div>
//                   <button type="submit" className="btn btn-primary">
//                     UPDATE
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// import React, { useEffect, useState } from "react";
// import Layout from "../../components/layout/Layout";
// import UserMenu from "../../components/layout/UserMenu";
// import { useAuth } from "../../context/auth";
// import toast from "react-hot-toast";
// import axios from "axios";
// import styles from "../../styles/Profile.module.css";

// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardText,
//   MDBCardBody,
//   MDBCardImage,
//   MDBBtn,
//   MDBBreadcrumb,
//   MDBBreadcrumbItem,
//   MDBProgress,
//   MDBProgressBar,
//   MDBIcon,
//   MDBListGroup,
//   MDBListGroupItem,
// } from "mdb-react-ui-kit";
// import { NavLink } from "react-router-dom";

// export default function Profile() {
//   // Context
//   const [auth, setAuth] = useAuth();

//   const [activeTab, setActiveTab] = useState("profile");
//   // State
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
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
//         password,
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
//     <Layout title={"Your Profile"}>
//       <section style={{ backgroundColor: "#eee" }}>
//         <MDBContainer className="py-5">
//           <MDBRow>
//             <MDBCol>
//               <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
//                 <MDBBreadcrumbItem>
//                   <a href="#">Home</a>
//                 </MDBBreadcrumbItem>
//                 <MDBBreadcrumbItem>
//                   <a href="#">User</a>
//                 </MDBBreadcrumbItem>
//                 <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
//               </MDBBreadcrumb>
//             </MDBCol>
//           </MDBRow>

//           <MDBRow>
//             <MDBCol lg="4">
//               <MDBCard className="mb-4">
//                 <MDBCardBody className="text-center">
//                   <MDBCardImage
//                     src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
//                     alt="avatar"
//                     className="rounded-circle"
//                     style={{ width: "150px" }}
//                     fluid
//                   />
//                   <p className="text-muted mb-1">Full Stack Developer</p>
//                   <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
//                   {/* <div className="d-flex justify-content-center mb-2">
//                     <MDBBtn>Follow</MDBBtn>
//                     <MDBBtn outline className="ms-1">
//                       Message
//                     </MDBBtn>
//                   </div> */}
//                 </MDBCardBody>
//               </MDBCard>

//               <MDBCard className="mb-4 mb-lg-0">
//                 <MDBCardBody className="p-0">
//                   <MDBListGroup flush className="rounded-3">
//                     <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
//                       <MDBIcon fas icon="globe fa-lg text-warning" />
//                       <MDBCardText>
//                         <NavLink
//                           to="/dashboard/user/orders"
//                           className="list-group-item list-group-item-action"
//                           style={{border:'0px'}}
//                         >
//                           Orders
//                         </NavLink>
//                       </MDBCardText>
//                     </MDBListGroupItem>
//                     {/* <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
//                       <MDBIcon
//                         fab
//                         icon="github fa-lg"
//                         style={{ color: "#333333" }}
//                       />
//                       <MDBCardText>mdbootstrap</MDBCardText>
//                     </MDBListGroupItem> */}
//                     {/* <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
//                       <MDBIcon
//                         fab
//                         icon="twitter fa-lg"
//                         style={{ color: "#55acee" }}
//                       />
//                       <MDBCardText>@mdbootstrap</MDBCardText>
//                     </MDBListGroupItem> */}
//                     {/* <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
//                       <MDBIcon
//                         fab
//                         icon="instagram fa-lg"
//                         style={{ color: "#ac2bac" }}
//                       />
//                       <MDBCardText>mdbootstrap</MDBCardText>
//                     </MDBListGroupItem> */}
//                     {/* <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
//                       <MDBIcon
//                         fab
//                         icon="facebook fa-lg"
//                         style={{ color: "#3b5998" }}
//                       />
//                       <MDBCardText>mdbootstrap</MDBCardText>
//                     </MDBListGroupItem> */}
//                   </MDBListGroup>
//                 </MDBCardBody>
//               </MDBCard>
//             </MDBCol>
//             <MDBCol lg="8">
//               <MDBCard className="mb-4">
//                 <MDBCardBody>
//                   <MDBRow>
//                     <MDBCol sm="3">
//                       <MDBCardText>Full Name</MDBCardText>
//                     </MDBCol>
//                     <MDBCol sm="9">
//                       <MDBCardText className="text-muted">
//                         {name}
//                       </MDBCardText>
//                     </MDBCol>
//                   </MDBRow>
//                   <hr />
//                   <MDBRow>
//                     <MDBCol sm="3">
//                       <MDBCardText>Email</MDBCardText>
//                     </MDBCol>
//                     <MDBCol sm="9">
//                       <MDBCardText className="text-muted">
//                         {email}
//                       </MDBCardText>
//                     </MDBCol>
//                   </MDBRow>
//                   <hr />
//                   <MDBRow>
//                     <MDBCol sm="3">
//                       <MDBCardText>Mobile</MDBCardText>
//                     </MDBCol>
//                     <MDBCol sm="9">
//                       <MDBCardText className="text-muted">
//                         {phone}
//                       </MDBCardText>
//                     </MDBCol>
//                   </MDBRow>
//                   <hr />
//                   <MDBRow>
//                     <MDBCol sm="3">
//                       <MDBCardText>Address</MDBCardText>
//                     </MDBCol>
//                     <MDBCol sm="9">
//                       <MDBCardText className="text-muted">
//                         {address}
//                       </MDBCardText>
//                     </MDBCol>
//                   </MDBRow>
//                 </MDBCardBody>
//               </MDBCard>

//               {/* <MDBRow>
//                 <MDBCol md="6">
//                   <MDBCard className="mb-4 mb-md-0">
//                     <MDBCardBody>
//                       <MDBCardText className="mb-4">
//                         <span className="text-primary font-italic me-1">
//                           assigment
//                         </span>{" "}
//                         Project Status
//                       </MDBCardText>
//                       <MDBCardText
//                         className="mb-1"
//                         style={{ fontSize: ".77rem" }}
//                       >
//                         Web Design
//                       </MDBCardText>
//                       <MDBProgress className="rounded">
//                         <MDBProgressBar
//                           width={80}
//                           valuemin={0}
//                           valuemax={100}
//                         />
//                       </MDBProgress>

//                       <MDBCardText
//                         className="mt-4 mb-1"
//                         style={{ fontSize: ".77rem" }}
//                       >
//                         Website Markup
//                       </MDBCardText>
//                       <MDBProgress className="rounded">
//                         <MDBProgressBar
//                           width={72}
//                           valuemin={0}
//                           valuemax={100}
//                         />
//                       </MDBProgress>

//                       <MDBCardText
//                         className="mt-4 mb-1"
//                         style={{ fontSize: ".77rem" }}
//                       >
//                         One Page
//                       </MDBCardText>
//                       <MDBProgress className="rounded">
//                         <MDBProgressBar
//                           width={89}
//                           valuemin={0}
//                           valuemax={100}
//                         />
//                       </MDBProgress>

//                       <MDBCardText
//                         className="mt-4 mb-1"
//                         style={{ fontSize: ".77rem" }}
//                       >
//                         Mobile Template
//                       </MDBCardText>
//                       <MDBProgress className="rounded">
//                         <MDBProgressBar
//                           width={55}
//                           valuemin={0}
//                           valuemax={100}
//                         />
//                       </MDBProgress>

//                       <MDBCardText
//                         className="mt-4 mb-1"
//                         style={{ fontSize: ".77rem" }}
//                       >
//                         Backend API
//                       </MDBCardText>
//                       <MDBProgress className="rounded">
//                         <MDBProgressBar
//                           width={66}
//                           valuemin={0}
//                           valuemax={100}
//                         />
//                       </MDBProgress>
//                     </MDBCardBody>
//                   </MDBCard>
//                 </MDBCol>

//                 <MDBCol md="6">
//                   <MDBCard className="mb-4 mb-md-0">
//                     <MDBCardBody>
//                       <MDBCardText className="mb-4">
//                         <span className="text-primary font-italic me-1">
//                           assigment
//                         </span>{" "}
//                         Project Status
//                       </MDBCardText>
//                       <MDBCardText
//                         className="mb-1"
//                         style={{ fontSize: ".77rem" }}
//                       >
//                         Web Design
//                       </MDBCardText>
//                       <MDBProgress className="rounded">
//                         <MDBProgressBar
//                           width={80}
//                           valuemin={0}
//                           valuemax={100}
//                         />
//                       </MDBProgress>

//                       <MDBCardText
//                         className="mt-4 mb-1"
//                         style={{ fontSize: ".77rem" }}
//                       >
//                         Website Markup
//                       </MDBCardText>
//                       <MDBProgress className="rounded">
//                         <MDBProgressBar
//                           width={72}
//                           valuemin={0}
//                           valuemax={100}
//                         />
//                       </MDBProgress>

//                       <MDBCardText
//                         className="mt-4 mb-1"
//                         style={{ fontSize: ".77rem" }}
//                       >
//                         One Page
//                       </MDBCardText>
//                       <MDBProgress className="rounded">
//                         <MDBProgressBar
//                           width={89}
//                           valuemin={0}
//                           valuemax={100}
//                         />
//                       </MDBProgress>

//                       <MDBCardText
//                         className="mt-4 mb-1"
//                         style={{ fontSize: ".77rem" }}
//                       >
//                         Mobile Template
//                       </MDBCardText>
//                       <MDBProgress className="rounded">
//                         <MDBProgressBar
//                           width={55}
//                           valuemin={0}
//                           valuemax={100}
//                         />
//                       </MDBProgress>

//                       <MDBCardText
//                         className="mt-4 mb-1"
//                         style={{ fontSize: ".77rem" }}
//                       >
//                         Backend API
//                       </MDBCardText>
//                       <MDBProgress className="rounded">
//                         <MDBProgressBar
//                           width={66}
//                           valuemin={0}
//                           valuemax={100}
//                         />
//                       </MDBProgress>
//                     </MDBCardBody>
//                   </MDBCard>
//                 </MDBCol>
//               </MDBRow> */}
//             </MDBCol>

//           </MDBRow>
//         </MDBContainer>
//       </section>
//     </Layout>
//   );
// }

// import React, { useEffect, useState } from "react";
// import Layout from "../../components/layout/Layout";
// import { useAuth } from "../../context/auth";
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
// } from "mdb-react-ui-kit";
// import { NavLink } from "react-router-dom";
// import Orders from "./Orders";
// import PersonalAndAddress from "./PersonalAndAddress";
// import ContactReferences from "./ContactReferences";
// import GiftCards from "./GiftCards";
// import { IoPersonCircleOutline } from "react-icons/io5";
// import Info from "../../SrcImages/info.svg";
// import Contact from "../../SrcImages/contact.svg";
// import MyOrders from "../../SrcImages/orders.svg";
// import Giftcards from "../../SrcImages/giftcards.svg";
// import OrdersAnother from "./OrdersAnother";

// export default function Profile() {
//   // Context
//   const [auth, setAuth] = useAuth();

//   const [activeTab, setActiveTab] = useState("personalAndAddress");
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
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const { data } = await axios.put("/api/v1/auth/profile", {
//   //       name,
//   //       email,
//   //       phone,
//   //       address,
//   //     });
//   //     if (data?.error) {
//   //       toast.error(data?.error);
//   //     } else {
//   //       setAuth({ ...auth, user: data?.updatedUser });
//   //       let ls = localStorage.getItem("auth");
//   //       ls = JSON.parse(ls);
//   //       ls.user = data.updatedUser;
//   //       localStorage.setItem("auth", JSON.stringify(ls));
//   //       toast.success("Profile Updated Successfully");
//   //     }
//   //   } catch (error) {
//   //     toast.error("Something went wrong");
//   //   }
//   // };

//   return (
//     <Layout title={"Your Profile"}>
//       <section style={{ backgroundColor: "#eee" }}>
//         <MDBContainer className="py-5">
//           <MDBRow>
//             <MDBCol>
//               <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
//                 <MDBBreadcrumbItem>
//                   <a href="#">Home</a>
//                 </MDBBreadcrumbItem>
//                 <MDBBreadcrumbItem>
//                   <a href="#">User</a>
//                 </MDBBreadcrumbItem>
//                 <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
//               </MDBBreadcrumb>
//             </MDBCol>
//           </MDBRow>

//           <MDBRow>
//             <MDBCol lg="4">
//               <MDBCard className="mb-4" style={{ borderRadius: "22px" }}>
//                 <MDBCardBody
//                   className="text-center"
//                   style={{ borderRadius: "15px" }}
//                 >
//                   <MDBCardImage
//                     src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
//                     alt="avatar"
//                     className="rounded-circle"
//                     style={{ width: "150px" }}
//                     fluid
//                   />
//                   <p className="text-muted mb-1">Full Stack Developer</p>
//                   <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
//                 </MDBCardBody>
//               </MDBCard>

//               <MDBCard
//                 className="mb-4 mb-lg-0"
//                 style={{ border: "1px", borderRadius: "15px" }}
//               >
//                 <MDBCardBody
//                   className="p-0"
//                   style={{ backgroundColor: "#eee" }}
//                 >
//                   <MDBListGroup flush className="rounded-3">
//                     {/* 1 */}
//                     <MDBListGroupItem
//                       className="d-flex justify-content-between align-items-center p-3"
//                       style={{
//                         borderRadius: "15px",
//                         marginBottom: "7px",
//                         flexDirection: "row-reverse",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => setActiveTab("personalAndAddress")}
//                     >
//                       {/* <MDBIcon fas icon="globe fa-lg text-warning" /> */}
//                       {/* <IoPersonCircleOutline /> */}
//                       <img
//                         src={Info}
//                         alt="User Icon"
//                         style={{ width: "24px", height: "24px" }}
//                       />
//                       <MDBCardText>
//                         <span
//                           className="list-group-item list-group-item-action"
//                           style={{
//                             border: "0px",
//                             backgroundColor: "white",
//                             fontWeight: "bold",
//                           }}
//                         >
//                           Personal and Address Details
//                         </span>
//                       </MDBCardText>
//                     </MDBListGroupItem>
//                     {/* 2 */}
//                     <MDBListGroupItem
//                       className="d-flex justify-content-between align-items-center p-3"
//                       style={{
//                         borderRadius: "15px",
//                         marginBottom: "7px",
//                         flexDirection: "row-reverse",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => setActiveTab("contactReferences")}
//                     >
//                       {/* <MDBIcon fas icon="globe fa-lg text-warning" /> */}
//                       <img
//                         src={Contact}
//                         alt="User Icon"
//                         style={{ width: "24px", height: "24px" }}
//                       />
//                       <MDBCardText>
//                         <span
//                           className="list-group-item list-group-item-action"
//                           style={{
//                             border: "0px",
//                             backgroundColor: "white",
//                             fontWeight: "bold",
//                           }}
//                         >
//                           Contact references
//                         </span>
//                       </MDBCardText>
//                     </MDBListGroupItem>
//                     {/* 3 */}
//                     <MDBListGroupItem
//                       className="d-flex justify-content-between align-items-center p-3"
//                       style={{
//                         borderRadius: "15px",
//                         marginBottom: "7px",
//                         flexDirection: "row-reverse",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => setActiveTab("orders")}
//                     >
//                       {/* <MDBIcon fas icon="globe fa-lg text-warning" /> */}
//                       <img
//                         src={MyOrders}
//                         alt="User Icon"
//                         style={{ width: "24px", height: "24px" }}
//                       />
//                       <MDBCardText>
//                         <span
//                           className="list-group-item list-group-item-action"
//                           style={{
//                             border: "0px",
//                             backgroundColor: "white",
//                             fontWeight: "bold",
//                           }}
//                         >
//                           My orders
//                         </span>
//                       </MDBCardText>
//                     </MDBListGroupItem>
//                     {/* 4 */}
//                     <MDBListGroupItem
//                       className="d-flex justify-content-between align-items-center p-3"
//                       style={{
//                         borderRadius: "15px",
//                         marginBottom: "7px",
//                         flexDirection: "row-reverse",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => setActiveTab("giftCards")}
//                     >
//                       {/* <MDBIcon fas icon="globe fa-lg text-warning" /> */}
//                       <img
//                         src={Giftcards}
//                         alt="User Icon"
//                         style={{ width: "24px", height: "24px" }}
//                       />
//                       <MDBCardText>
//                         <span
//                           className="list-group-item list-group-item-action"
//                           style={{
//                             border: "0px",
//                             backgroundColor: "white",
//                             fontWeight: "bold",
//                           }}
//                         >
//                           Gift cards
//                         </span>
//                       </MDBCardText>
//                     </MDBListGroupItem>
//                   </MDBListGroup>
//                 </MDBCardBody>
//               </MDBCard>
//             </MDBCol>
//             <MDBCol lg="8">
//               {activeTab === "personalAndAddress" && <PersonalAndAddress />}
//               {activeTab === "contactReferences" && <ContactReferences />}
//               {activeTab === "orders" && <OrdersAnother />}
//               {activeTab === "giftCards" && <GiftCards />}
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       </section>
//     </Layout>
//   );
// }

// import React, { useEffect, useState } from "react";
// import Layout from "../../components/layout/Layout";
// import { useAuth } from "../../context/auth";
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
// } from "mdb-react-ui-kit";
// import { NavLink } from "react-router-dom";
// import Orders from "./Orders";
// import PersonalAndAddress from "./PersonalAndAddress";
// import ContactReferences from "./ContactReferences";
// import GiftCards from "./GiftCards";
// import { IoPersonCircleOutline } from "react-icons/io5";
// import Info from "../../SrcImages/info.svg";
// import Contact from "../../SrcImages/contact.svg";
// import MyOrders from "../../SrcImages/orders.svg";
// import Giftcards from "../../SrcImages/giftcards.svg";
// import OrdersAnother from "./OrdersAnother";
// import { useNavigate } from "react-router-dom";
// export default function Profile() {
//   // Context
//   const [auth, setAuth] = useAuth();

//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("personalAndAddress");
//   // State
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [profilePhoto, setProfilePhoto] = useState(
//     "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
//   );

//   //photo state
//   const [photo, setPhoto] = useState("");

//   // Get user data
//   useEffect(() => {
//     const { email, name, phone, address } = auth?.user;
//     setName(name);
//     setPhone(phone);
//     setEmail(email);
//     setAddress(address);
//   }, [auth?.user]);

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePhoto(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   //create product function
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const productData = new FormData();

//       productData.append("photo", photo);

//       const { data } = axios.post("/api/v1/auth/uploadpic", productData);
//       if (data?.success) {
//         toast.error(data?.message);
//       } else {
//         toast.success(data?.message);
//       }
//     } catch (error) {
//       toast.error("something went wrong");
//     }
//   };
//   return (
//     <Layout title={"Your Profile"}>
//       <section style={{ backgroundColor: "#eee" }}>
//         <MDBContainer className="py-5">
//           <MDBRow>
//             <MDBCol>
//               <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
//                 <MDBBreadcrumbItem>
//                   <a href="#">Home</a>
//                 </MDBBreadcrumbItem>
//                 <MDBBreadcrumbItem>
//                   <a href="#">User</a>
//                 </MDBBreadcrumbItem>
//                 <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
//               </MDBBreadcrumb>
//             </MDBCol>
//           </MDBRow>

//           <MDBRow>
//             <MDBCol lg="4">
//               <MDBCard className="mb-4" style={{ borderRadius: "22px" }}>
//                 <MDBCardBody
//                   className="text-center"
//                   style={{ borderRadius: "15px" }}
//                 >
//                   <MDBCardImage
//                     src={profilePhoto}
//                     alt="avatar"
//                     className="rounded-circle"
//                     style={{ width: "150px", cursor: "pointer" }}
//                     fluid
//                     onClick={() => document.getElementById("fileInput").click()}
//                   />
//                   <input
//                     type="file"
//                     id="fileInput"
//                     style={{ display: "none" }}
//                     accept="image/*"
//                     onChange={handlePhotoChange}
//                   />
//                   <p className="text-muted mb-1">Full Stack Developer</p>
//                   <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
//                 </MDBCardBody>
//               </MDBCard>

//               <MDBCard
//                 className="mb-4 mb-lg-0"
//                 style={{ border: "1px", borderRadius: "15px" }}
//               >
//                 <MDBCardBody
//                   className="p-0"
//                   style={{ backgroundColor: "#eee" }}
//                 >
//                   <MDBListGroup flush className="rounded-3">
//                     {/* 1 */}
//                     <MDBListGroupItem
//                       className="d-flex justify-content-between align-items-center p-3"
//                       style={{
//                         borderRadius: "15px",
//                         marginBottom: "7px",
//                         flexDirection: "row-reverse",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => setActiveTab("personalAndAddress")}
//                     >
//                       <img
//                         src={Info}
//                         alt="User Icon"
//                         style={{ width: "24px", height: "24px" }}
//                       />
//                       <MDBCardText>
//                         <span
//                           className="list-group-item list-group-item-action"
//                           style={{
//                             border: "0px",
//                             backgroundColor: "white",
//                             fontWeight: "bold",
//                           }}
//                         >
//                           Personal and Address Details
//                         </span>
//                       </MDBCardText>
//                     </MDBListGroupItem>
//                     {/* 2 */}
//                     <MDBListGroupItem
//                       className="d-flex justify-content-between align-items-center p-3"
//                       style={{
//                         borderRadius: "15px",
//                         marginBottom: "7px",
//                         flexDirection: "row-reverse",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => setActiveTab("contactReferences")}
//                     >
//                       <img
//                         src={Contact}
//                         alt="User Icon"
//                         style={{ width: "24px", height: "24px" }}
//                       />
//                       <MDBCardText>
//                         <span
//                           className="list-group-item list-group-item-action"
//                           style={{
//                             border: "0px",
//                             backgroundColor: "white",
//                             fontWeight: "bold",
//                           }}
//                         >
//                           Contact references
//                         </span>
//                       </MDBCardText>
//                     </MDBListGroupItem>
//                     {/* 3 */}
//                     <MDBListGroupItem
//                       className="d-flex justify-content-between align-items-center p-3"
//                       style={{
//                         borderRadius: "15px",
//                         marginBottom: "7px",
//                         flexDirection: "row-reverse",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => setActiveTab("orders")}
//                     >
//                       <img
//                         src={MyOrders}
//                         alt="User Icon"
//                         style={{ width: "24px", height: "24px" }}
//                       />
//                       <MDBCardText>
//                         <span
//                           className="list-group-item list-group-item-action"
//                           style={{
//                             border: "0px",
//                             backgroundColor: "white",
//                             fontWeight: "bold",
//                           }}
//                         >
//                           My orders
//                         </span>
//                       </MDBCardText>
//                     </MDBListGroupItem>
//                     {/* 4 */}
//                     <MDBListGroupItem
//                       className="d-flex justify-content-between align-items-center p-3"
//                       style={{
//                         borderRadius: "15px",
//                         marginBottom: "7px",
//                         flexDirection: "row-reverse",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => setActiveTab("giftCards")}
//                     >
//                       <img
//                         src={Giftcards}
//                         alt="User Icon"
//                         style={{ width: "24px", height: "24px" }}
//                       />
//                       <MDBCardText>
//                         <span
//                           className="list-group-item list-group-item-action"
//                           style={{
//                             border: "0px",
//                             backgroundColor: "white",
//                             fontWeight: "bold",
//                           }}
//                         >
//                           Gift cards
//                         </span>
//                       </MDBCardText>
//                     </MDBListGroupItem>
//                   </MDBListGroup>
//                 </MDBCardBody>
//               </MDBCard>
//             </MDBCol>
//             <MDBCol lg="8">
//               {activeTab === "personalAndAddress" && <PersonalAndAddress />}
//               {activeTab === "contactReferences" && <ContactReferences />}
//               {activeTab === "orders" && <OrdersAnother />}
//               {activeTab === "giftCards" && <GiftCards />}
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       </section>
//     </Layout>
//   );
// }

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

export default function Profile() {
  // Context
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // State
  const location = useLocation();
  //console.log(location.state?.activeTab);
  const queryParams = new URLSearchParams(location.search);
  const defaultTab =
    location.state?.activeTab || queryParams.get("tab") || "personalAndAddress";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
  );

  //photo state
  const [photo, setPhoto] = useState("");

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
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/auth/get-user/${auth?.user?._id}`
    );
    //console.log("User", data);
    if (data.success) {
      const { email, name, phone, address, photo } = data?.user;
      //console.log("User Details:", { email, name, phone, address, photo });
      setName(name);
      setPhone(phone);
      setEmail(email);
      setAddress(address);
      if (photo && photo.data && photo.contentType) {
        //console.log("photo", photo);
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(photo.data.data))
        );
        setProfilePhoto(`data:${photo.contentType};base64,${base64String}`);
      }
    }
  };
  useEffect(() => {
    if (auth?.user?._id) {
      userDetailsfunc();
    }
  }, []);
  useEffect(() => {
    if (location.state?.activeTab) {
      //console.log("hi", location.state?.activeTab);
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

  //     const { data } = await axios.put("/api/v1/auth/uploadpic", productData);
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
  //     const { data } = await axios.put("/api/v1/auth/uploadpic", formData);
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

      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/uploadpic`, formData);
      if (data?.success) {
        const updatedUser = data?.updatedUser;
        const updatedAuth = { ...auth, user: updatedUser };
        setAuth(updatedAuth);
        localStorage.setItem("auth", JSON.stringify(updatedAuth));
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
                  className="text-center"
                  style={{ borderRadius: "15px" }}
                >
                  <MDBCardImage
                    src={profilePhoto}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px", cursor: "pointer" }}
                    fluid
                    onClick={() => document.getElementById("fileInput").click()}
                  />
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                  {/* <p className="text-muted mb-1">Full Stack Developer</p>
                  <p className="text-muted mb-4">Bay Area, San Francisco, CA</p> */}
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
