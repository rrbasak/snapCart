// import React from "react";
// import Layout from "../components/layout/Layout";
// import useCategory from "../hooks/useCategory";
// import { Link } from "react-router-dom";


// export default function Categories() {
//   const categories = useCategory();
//   return (
//     <Layout title={"All Categories"}>
//       <div className="container">
//         <div className="row">
//           {categories.map((c) => (
//             <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
//               <Link to={`/category/${c.slug}`} className="btn btn-primary">
//                 {c.name}
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// }




// import React from "react";
// import Layout from "../components/layout/Layout";
// import useCategory from "../hooks/useCategory";
// import { Link } from "react-router-dom";
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

// export default function Categories() {
//   const categories = useCategory();
//   return (
//     <Layout title={"All Categories"}>
//       <div style={{ marginTop: "20px" }}>
//         <MDBContainer>
//           <MDBRow className="mb-4">
//             {categories.map((c) => (
//               <MDBCol md="4" className="mb-4" key={c._id}>
//                 <MDBCard style={{ borderRadius: "15px" }}>
//                   <MDBCardBody>
//                     <MDBCardText>

//                       <Link
//                         to={`/category/${c.slug}`}
//                         className="btn btn-primary"
//                       >
//                         {c.name}
//                       </Link>
//                     </MDBCardText>
//                   </MDBCardBody>
//                 </MDBCard>
//               </MDBCol>
//             ))}
//           </MDBRow>
//         </MDBContainer>
//       </div>
//     </Layout>
//   );
// }




// import React from "react";
// import Layout from "../components/layout/Layout";
// import useCategory from "../hooks/useCategory";
// import { Link } from "react-router-dom";
// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardText,
//   MDBCardBody,
//   MDBCardImage,
// } from "mdb-react-ui-kit";

// export default function Categories() {
//   const categories = useCategory();
//   return (
//     <Layout title={"All Categories"}>
//       <div style={{ marginTop: "20px" }}>
//         <MDBContainer>
//           <MDBRow className="mb-4">
//             {categories.map((c) => (
//               <MDBCol md="4" className="mb-4" key={c._id}>
//                 <MDBCard style={{ borderRadius: "15px" }}>
//                   <MDBCardImage
//                     src={`api/v1/category/category-photo/${c._id}`}
//                     position="top"
//                     alt={`${c.name} image`}
//                     loading="lazy" // This attribute enables lazy loading
//                     style={{
//                       borderTopLeftRadius: "15px",
//                       borderTopRightRadius: "15px",
//                     }}
//                   />
//                   <MDBCardBody>
//                     <MDBCardText>
//                       <Link
//                         to={`/category/${c.slug}`}
//                         className="btn btn-primary"
//                       >
//                         {c.name}
//                       </Link>
//                     </MDBCardText>
//                   </MDBCardBody>
//                 </MDBCard>
//               </MDBCol>
//             ))}
//           </MDBRow>
//         </MDBContainer>
//       </div>
//     </Layout>
//   );
// }



// import React from "react";
// import Layout from "../components/layout/Layout";
// import useCategory from "../hooks/useCategory";
// import { Link } from "react-router-dom";
// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardText,
//   MDBCardBody,
//   MDBCardImage,
// } from "mdb-react-ui-kit";

// export default function Categories() {
//   const categories = useCategory();
//   return (
//     <Layout title={"All Categories"}>
//       <div style={{ marginTop: "20px" }}>
//         <MDBContainer>
//           <MDBRow className="mb-4">
//             {categories.map((c) => (
//               <MDBCol
//                 md="4"
//                 className="mb-4 d-flex justify-content-center"
//                 key={c._id}
//               >
//                 <MDBCard
//                   style={{
//                     borderRadius: "15px",
//                     width: "400px",
//                     height: "400px",
//                   }}
//                 >
//                   {/* <MDBCardImage
//                     src={`api/v1/category/category-photo/${c._id}`}
//                     position="top"
//                     alt={`${c.name} image`}
//                     loading="lazy"
//                     style={{
//                       borderTopLeftRadius: "15px",
//                       borderTopRightRadius: "15px",
//                       width: "100%",
//                       height: "60%",
//                       objectFit: "cover",
//                     }}
//                   /> */}
//                   <MDBCardBody className="d-flex align-items-center justify-content-center">
//                     <MDBCardText>
//                       <Link
//                         to={`/category/${c.slug}`}
//                         className="btn btn-primary"
//                       >
//                         {c.name}
//                       </Link>
//                     </MDBCardText>
//                   </MDBCardBody>
//                 </MDBCard>
//               </MDBCol>
//             ))}
//           </MDBRow>
//         </MDBContainer>
//       </div>
//     </Layout>
//   );
// }


// import React from "react";
// import Layout from "../components/layout/Layout";
// import useCategory from "../hooks/useCategory";
// import { Link } from "react-router-dom";
// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardText,
//   MDBCardBody,
//   MDBCardImage,
// } from "mdb-react-ui-kit";

// export default function Categories() {
//   const categories = useCategory();
//   return (
//     <Layout title={"All Categories"}>
//       <div style={{ marginTop: "20px" }}>
//         <MDBContainer>
//           <MDBRow className="mb-4">
//             {categories.map((c) => (
//               <MDBCol
//                 md="4"
//                 className="mb-4 d-flex justify-content-center"
//                 key={c._id}
//               >
//                 <MDBCard
//                   style={{
//                     borderRadius: "15px",
//                     width: "400px",
//                     height: "400px",
//                   }}
//                 >
//                   {/* <MDBCardImage
//                     src={`api/v1/category/category-photo/${c._id}`}
//                     position="top"
//                     alt={`${c.name} image`}
//                     loading="lazy"
//                     style={{
//                       borderTopLeftRadius: "15px",
//                       borderTopRightRadius: "15px",
//                       width: "100%",
//                       height: "60%",
//                       objectFit: "cover",
//                     }}
//                   /> */}
//                   <MDBCardImage
//                     src="/images/m2.png"
//                     position="top"
//                     alt={`${c.name} image`}
//                     style={{
//                       borderTopLeftRadius: "15px",
//                       borderTopRightRadius: "15px",
//                     }}
//                   />
//                   <MDBCardBody className="d-flex align-items-center justify-content-center">
//                     <MDBCardText>
//                       <Link
//                         to={`/category/${c.slug}`}
//                         className="btn btn-primary"
//                       >
//                         {c.name}
//                       </Link>
//                     </MDBCardText>
//                   </MDBCardBody>
//                 </MDBCard>
//               </MDBCol>
//             ))}
//           </MDBRow>
//         </MDBContainer>
//       </div>
//     </Layout>
//   );
// }



// import React from "react";
// import Layout from "../components/layout/Layout";
// import useCategory from "../hooks/useCategory";
// import { Link } from "react-router-dom";
// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBCardText,
// } from "mdb-react-ui-kit";
// import styles from "../styles/Categories.module.css"
// export default function Categories() {
//   const categories = useCategory();
//   return (
//     <Layout title={"All Categories"}>
//       <div style={{ marginTop: "20px" }}>
//         <MDBContainer>
//           <MDBRow className="mb-4">
//             {categories.map((c) => (
//               <MDBCol
//                 md="4"
//                 className="mb-4 d-flex justify-content-center"
//                 key={c._id}
//               >
//                 <Link
//                   to={`/category/${c.slug}`}
//                   style={{ textDecoration: "none" }} // Optional: To remove underline
//                 >
//                   <MDBCard
//                     style={{
//                       borderRadius: "15px",
//                       width: "300px",
//                       height: "300px",
//                     }}
//                   >
//                     <MDBCardImage
//                       src="/images/m2.png"
//                       position="top"
//                       alt={`${c.name} image`}
//                       style={{
//                         borderTopLeftRadius: "15px",
//                         borderTopRightRadius: "15px",
//                         height: "85%",
//                         objectFit: "cover",
//                       }}
//                     />
//                     <MDBCardBody className="d-flex align-items-center justify-content-center">
//                       <MDBCardText>{c.name}</MDBCardText>
//                     </MDBCardBody>
//                   </MDBCard>
//                 </Link>
//               </MDBCol>
//             ))}
//           </MDBRow>
//         </MDBContainer>
//       </div>
//     </Layout>
//   );
// }



// import React from "react";
// import Layout from "../components/layout/Layout";
// import useCategory from "../hooks/useCategory";
// import { Link } from "react-router-dom";
// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBCardText,
// } from "mdb-react-ui-kit";
// import styles from "../styles/Categories.module.css";

// export default function Categories() {
//   const categories = useCategory();
//   return (
//     <Layout title={"All Categories"}>
//       <div style={{ marginTop: "20px" }}>
//         Shop by Category
//         <MDBContainer>
//           <MDBRow className="mb-4">
//             {categories.map((c) => (
//               <MDBCol
//                 md="4"
//                 className="mb-4 d-flex justify-content-center"
//                 key={c._id}
//               >
//                 <Link to={`/category/${c.slug}`} className={styles.cardText}>
//                   <MDBCard className={styles.card}>
//                     <MDBCardImage
//                       src="/images/m2.png"
//                       position="top"
//                       alt={`${c.name} image`}
//                       className={styles.cardImage}
//                     />
//                     <MDBCardBody className={styles.cardBody}>
//                       <MDBCardText>{c.name}</MDBCardText>
//                     </MDBCardBody>
//                   </MDBCard>
//                 </Link>
//               </MDBCol>
//             ))}
//           </MDBRow>
//         </MDBContainer>
//       </div>
//     </Layout>
//   );
// }



// import React from "react";
// import Layout from "../components/layout/Layout";
// import useCategory from "../hooks/useCategory";
// import { Link } from "react-router-dom";
// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBCardText,
// } from "mdb-react-ui-kit";
// import styles from "../styles/Categories.module.css";

// export default function Categories() {
//   const categories = useCategory();
//   return (
//     <Layout title={"All Categories"}>
//       <div style={{ marginTop: "20px" }}>
//         <MDBContainer>
//           <MDBRow className={`mb-4 ${styles.cardContainer}`}>
//             {categories.map((c) => (
//               <MDBCol
//                 md="4"
//                 className={`mb-4 d-flex justify-content-center ${styles.cardCol}`}
//                 key={c._id}
//               >
//                 <Link to={`/category/${c.slug}`} className={styles.cardText}>
//                   <MDBCard className={styles.card}>
//                     <MDBCardImage
//                       src="/images/m2.png"
//                       position="top"
//                       alt={`${c.name} image`}
//                       className={styles.cardImage}
//                     />
//                     <MDBCardBody className={styles.cardBody}>
//                       <MDBCardText>{c.name}</MDBCardText>
//                     </MDBCardBody>
//                   </MDBCard>
//                 </Link>
//               </MDBCol>
//             ))}
//           </MDBRow>
//         </MDBContainer>
//       </div>
//     </Layout>
//   );
// }


import React from "react";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
} from "mdb-react-ui-kit";
import styles from "../styles/Categories.module.css";

export default function Categories() {
  const categories = useCategory();
  const navigate = useNavigate();
  return (
    <Layout title={"All Categories"}>
      <div style={{ marginTop: "20px" }}>
        <MDBContainer>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Shop by Category</h2>
          </div>
          <MDBRow className={`mb-4 ${styles.cardContainer}`}>
            {categories.map((c) => (
              <MDBCol
                md="4"
                className={`mb-4 d-flex justify-content-center ${styles.cardCol}`}
                key={c._id}
              >
                {/* <Link to={`/category/${c.slug}`} className={styles.cardText}> */}
                <Link className={styles.cardText}>
                  <MDBCard
                    className={styles.card}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/category/${c.slug}`, {
                        state: { cid: c._id },
                      });
                    }}
                  >
                    <MDBCardImage
                      // src="/images/m2.png"
                      src={
                        c.photo
                          ? `${process.env.REACT_APP_API}/api/v1/category/category-photo/${c?._id}`
                          : "/images/m2.png"
                      }
                      position="top"
                      alt={`${c.name} image`}
                      className={styles.cardImage}
                    />
                    <MDBCardBody className={styles.cardBody}>
                      <MDBCardText>{c.name}</MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </Link>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBContainer>
      </div>
    </Layout>
  );
}
