// import React from "react";
// import { Modal } from "antd";
// import {
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBCardText,
//   MDBRow,
//   MDBBtn,
//   MDBIcon,
// } from "mdb-react-ui-kit";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import XIcon from "@mui/icons-material/X";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import styles from "../../styles/ShareModal.module.css"

// export const ShareModal = ({
//   isModalOpen,
//   handleOk,
//   handleCancel,
//   modalValue,
//   index,
// }) => {
//   const order = modalValue[index];
//   // Generate product names string
//   const productNames = order?.products?.map((p) => p.name).join(", ");
//   return (
//     <div>
//       <Modal
//         title="Why not tell your friend about your purchase?"
//         visible={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <MDBCardBody>
//           <MDBRow>
//             <MDBCol md="6">
//               {order?.products?.map((p, j) => (
//                 <MDBCard
//                   key={j}
//                   className="mb-4"
//                   style={{ borderRadius: "15px", cursor: "pointer" }}
//                 >
//                   <MDBCardBody className="d-flex align-items-center">
//                     <div className="me-3">
//                       <MDBCardImage
//                         src={`/api/v1/product/product-photo/${p._id}`}
//                         alt={p.name}
//                         className="rounded-circle"
//                         style={{ width: "100px" }}
//                         fluid
//                       />
//                     </div>
//                     <div>
//                       <p
//                         className="mb-1"
//                         style={{ fontWeight: "bold", display: "inline" }}
//                       >
//                         Name: {p.name}
//                       </p>
//                       <p
//                         className="text-muted mb-1"
//                         style={{ fontWeight: "lighter", display: "inline" }}
//                       >
//                         {" "}
//                         | Category:{" "}
//                         {p.description ? p.description.substring(0, 30) : ""}
//                       </p>
//                       <p
//                         className="text-muted mb-0"
//                         style={{ fontWeight: "bold" }}
//                       >
//                         Price: $ {p.price}
//                       </p>
//                     </div>
//                   </MDBCardBody>
//                 </MDBCard>
//               ))}
//             </MDBCol>
//             <MDBCol md="6">
//               <MDBCardText>
//                 I just bought {productNames} from this amazing store! The
//                 quality is top-notch and the prices are unbeatable. Highly
//                 recommend checking them out!
//               </MDBCardText>
//               <MDBRow className="mb-4 mt-4">
//                 <MDBCol>
//                   <h5>Share on:</h5>
//                 </MDBCol>
//               </MDBRow>
//               <MDBRow className="d-flex justify-content-center mt-4">
//                 <MDBCol md="4" className="d-flex justify-content-center">
//                   <button color="primary">
//                     {/* <MDBIcon fab icon="facebook-f" /> */}
//                     <FacebookIcon fontSize="large"></FacebookIcon>
//                   </button>
//                 </MDBCol>
//                 <MDBCol md="4" className="d-flex justify-content-center">
//                   <button color="info">
//                     {/* <MDBIcon fab icon="twitter" /> */}
//                     <XIcon></XIcon>
//                   </button>
//                 </MDBCol>
//                 <MDBCol md="4" className="d-flex justify-content-center">
//                   <button color="danger">
//                     {/* <MDBIcon icon="envelope" /> */}
//                     <InstagramIcon fontSize="large"></InstagramIcon>
//                   </button>
//                 </MDBCol>
//               </MDBRow>
//             </MDBCol>
//           </MDBRow>
//         </MDBCardBody>
//       </Modal>
//     </div>
//   );
// };

// import React from "react";
// import { Modal } from "antd";
// import {
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBCardText,
//   MDBRow,
// } from "mdb-react-ui-kit";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import XIcon from "@mui/icons-material/X";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import styles from "../../styles/ShareModal.module.css";

// export const ShareModal = ({
//   isModalOpen,
//   handleOk,
//   handleCancel,
//   modalValue,
//   index,
// }) => {
//   //console.log(modalValue);
//   const order = modalValue[index];
//   // Generate product names string
//   //console.log("order", order);
//   const productNames = order?.products?.map((p) => p.product?.name).join(", ");
//   return (
//     <div>
//       <Modal
//         title="Why not tell your friend about your purchase?"
//         visible={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <MDBCardBody>
//           <MDBRow>
//             <MDBCol md="6">
//               {order?.products?.map((p, j) => (
//                 <MDBCard
//                   key={j}
//                   className="mb-4"
//                   style={{ borderRadius: "15px", cursor: "pointer" }}
//                 >
//                   <MDBCardBody className="d-flex align-items-center">
//                     <div className="me-3">
//                       <MDBCardImage
//                         src={`/api/v1/product/product-photo/${p._id}`}
//                         alt={p.name}
//                         className="rounded-circle"
//                         style={{ width: "100px" }}
//                         fluid
//                       />
//                     </div>
//                     <div>
//                       <p
//                         className="mb-1"
//                         style={{ fontWeight: "bold", display: "inline" }}
//                       >
//                         Name: {p.product?.name}
//                       </p>
//                       <p
//                         className="text-muted mb-1"
//                         style={{ fontWeight: "lighter", display: "inline" }}
//                       >
//                         {" "}
//                         | Category:{" "}
//                         {p.description ? p.description.substring(0, 30) : ""}
//                       </p>
//                       <p
//                         className="text-muted mb-0"
//                         style={{ fontWeight: "bold" }}
//                       >
//                         Price: $ {p.price}
//                       </p>
//                     </div>
//                   </MDBCardBody>
//                 </MDBCard>
//               ))}
//             </MDBCol>
//             <MDBCol md="6">
//               <MDBCardText>
//                 I just bought {productNames} from this amazing store! The
//                 quality is top-notch and the prices are unbeatable. Highly
//                 recommend checking them out!
//               </MDBCardText>
//               <MDBRow className="mb-4 mt-4">
//                 <MDBCol>
//                   <h5>Share on:</h5>
//                 </MDBCol>
//               </MDBRow>
//               <MDBRow className={`${styles.shareButtonsRow}`}>
//                 <MDBCol className={`${styles.shareButtonCol}`}>
//                   <button className={styles.shareButton}>
//                     <FacebookIcon fontSize="large" />
//                   </button>
//                 </MDBCol>
//                 <MDBCol className={`${styles.shareButtonCol}`}>
//                   <button className={styles.shareButton}>
//                     <XIcon />
//                   </button>
//                 </MDBCol>
//                 <MDBCol className={`${styles.shareButtonCol}`}>
//                   <button className={styles.shareButton}>
//                     <InstagramIcon fontSize="large" />
//                   </button>
//                 </MDBCol>
//               </MDBRow>
//             </MDBCol>
//           </MDBRow>
//         </MDBCardBody>
//       </Modal>
//     </div>
//   );
// };
import React from "react";
import { Modal } from "antd";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBRow,
} from "mdb-react-ui-kit";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import styles from "../../styles/ShareModal.module.css";

export const ShareModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  modalValue,
  index,
}) => {
  //console.log(modalValue);
  const order = modalValue[index];
  // Generate product names string
  //console.log("order", order);
  const productNames = order?.products?.map((p) => p.product?.name).join(", ");
  return (
    <div>
      <Modal
        title="Why not tell your friend about your purchase?"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <MDBCardBody>
          <MDBRow>
            <MDBCol md="6">
              {order?.products?.map((p, j) => (
                <MDBCard
                  key={j}
                  className="mb-4"
                  style={{ borderRadius: "15px", cursor: "pointer" }}
                >
                  <MDBCardBody className="d-flex align-items-center">
                    <div className="me-3">
                      <MDBCardImage
                        src={`/api/v1/product/product-photo/${p.product?._id}`}
                        alt={p.name}
                        className="rounded-circle"
                        style={{ width: "100px" }}
                        fluid
                      />
                    </div>
                    <div>
                      <p
                        className="mb-1"
                        style={{ fontWeight: "bold", display: "inline" }}
                      >
                        Name: {p.product?.name}
                      </p>

                      <p
                        className="text-muted mb-0"
                        style={{ fontWeight: "bold" }}
                      >
                        Price: ₹{p.product?.price}
                      </p>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              ))}
            </MDBCol>
            <MDBCol md="6">
              <MDBCardText>
                I just bought {productNames} from this amazing store! The
                quality is top-notch and the prices are unbeatable. Highly
                recommend checking them out!
              </MDBCardText>
              <MDBRow className="mb-4 mt-4">
                <MDBCol>
                  <h5>Share on:</h5>
                </MDBCol>
              </MDBRow>
              <MDBRow className={`${styles.shareButtonsRow}`}>
                <MDBCol className={`${styles.shareButtonCol}`}>
                  <button className={styles.shareButton}>
                    <FacebookIcon fontSize="large" />
                  </button>
                </MDBCol>
                <MDBCol className={`${styles.shareButtonCol}`}>
                  <button className={styles.shareButton}>
                    <XIcon />
                  </button>
                </MDBCol>
                <MDBCol className={`${styles.shareButtonCol}`}>
                  <button className={styles.shareButton}>
                    <InstagramIcon fontSize="large" />
                  </button>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </Modal>
    </div>
  );
};
