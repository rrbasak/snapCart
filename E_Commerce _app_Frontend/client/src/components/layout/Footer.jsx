/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/Footer.module.css";
import { useDispatch } from "react-redux";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import XIcon from "@mui/icons-material/X";

export default function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth, setAuth] = useAuth();


  //functions
    const handleLAccount = () => {
      navigate(`/dashboard/${auth?.user?.role === 1 ? "admin" : "profile"}`,{state:{activeTab:"personalAndAddress"}});
    };
    const handleLOrders = () => {
      navigate("/dashboard/profile", { state: { activeTab: "orders" } });
    };
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      accessToken: "",
    });
    localStorage.removeItem("auth");
    // toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href="" className="me-4 text-reset">
            <XIcon fontSize="small"/>
          </a>
          {/* <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="twitter" />
          </a> */}
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="google" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="instagram" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="linkedin" />
          </a>
          {/* <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="github" />
          </a> */}
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                {/* <MDBIcon icon="gem" className="me-3" /> */}
                <AdbIcon className="me-3" />
                SnapCart
              </h6>
              <p>Elevate Your Shopping Experience with Just a Click!</p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <Link to="#!" className={styles.footerLink}>
                  Shoe
                </Link>
              </p>
              <p>
                <Link to="#!" className={styles.footerLink}>
                  Shirt
                </Link>
              </p>
              <p>
                <Link to="#!" className={styles.footerLink}>
                  Pants
                </Link>
              </p>
              <p>
                <Link to="#!" className={styles.footerLink}>
                  Cap
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Let Us Help You</h6>
              <p>
                <a
                  href="#"
                  className={styles.footerLink}
                  onClick={handleLAccount}
                >
                  Your Account
                </a>
              </p>
              <p>
                <a
                  href="#"
                  className={styles.footerLink}
                  onClick={handleLOrders}
                >
                  Orders
                </a>
              </p>
              <p>
                <Link to="#!" className={styles.footerLink}>
                  Help
                </Link>
              </p>
              <p>
                <a
                  href="#"
                  className={styles.footerLink}
                  onClick={handleLogOut}
                >
                  Sign Out
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@snapcart.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2024 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          snapcart.com
        </a>
      </div>
    </MDBFooter>
  );
}
