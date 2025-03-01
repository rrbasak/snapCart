// import React from "react";
// import Layout from "../../components/layout/Layout";
// import { useAuth } from "../../context/auth";
// import AdminMenu from "../../components/layout/AdminMenu";

// import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./AdminDashboard/pages/Home";
// import Tables from "./AdminDashboard/pages/Tables";
// import Billing from "./AdminDashboard/pages/Billing";
// import Rtl from "./AdminDashboard/pages/Rtl";
// import Profile from "./AdminDashboard/pages/Profile";
// import SignUp from "./AdminDashboard/pages/SignUp";
// import SignIn from "./AdminDashboard/pages/SignIn";
// import Main from "./AdminDashboard/components/layout/Main";
// import "antd/dist/reset.css";
// import "./AdminDashboard/assets/styles/main.css";
// import "./AdminDashboard/assets/styles/responsive.css";


// const AdminDashboard = () => {
//   const [auth] = useAuth();
//   return (
//     <Layout>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <div className="card w-75 p-3">
//               <h3> Admin Name : {auth?.user?.name}</h3>
//               <h3> Admin Email : {auth?.user?.email}</h3>
//               <h3> Admin Contact : {auth?.user?.phone}</h3>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AdminDashboard;






import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Main from "./AdminDashboard/components/layout/Main";
import "antd/dist/reset.css";
import "./AdminDashboard/assets/styles/main.css";
import "./AdminDashboard/assets/styles/responsive.css";

const AdminDashboard = ({ children }) => {
  return (
    <Layout>
      <Main>
        {children || <Outlet />}
      </Main>
    </Layout>
  );
};

export default AdminDashboard;
