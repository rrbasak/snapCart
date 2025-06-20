import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { CircularProgress } from "@mui/material";

//css files
import stylesInput from "../../../src/styles/Input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ForgotPasssword = ({ remember, otppage }) => {
  const [email, setEmail] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [startLoading, setStartLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  // eslint-disable-next-line no-unused-vars

  // form function

  // const handleLogin = () => {};

  const emailHandller = async (e) => {
    e.preventDefault();
    // try {
    //   const res = await axios.post("/api/v1/auth/forgot-password", {
    //     email: email,
    //   });
    //   ////console.log(res);
    //   if (res && res.data.success) {
    //     toast.success(res.data.message);
    //     ////console.log(res.data.otp);
    //     otppage(email, res.data.otp);
    //   } else {
    //     toast.error(res.data.message, {
    //       icon: "⚠️",
    //       style: {
    //         background: "#fff9c4",
    //         color: "#000",
    //       },
    //     });
    //   }
    // } catch (error) {
    //   toast.error("Something went wrong");
    //   console.error("Error:", error);
    // }
    //console.log(email)
    if (!email) {
      setEmailError("Email is required");
      return;
    } else {
      setEmailError("");
    }
    setStartLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
        email: email,
      });
      //console.log("res", res);
      if (res && res.data.success) {
        toast.success(res.data.message);
        // otppage(email, res.data.otp);
        otppage(email, res.data.userId);
      } else {
        toast.error(res.data.message, {
          icon: "⚠️",
          style: {
            background: "#fff9c4",
            color: "#000",
          },
        });
      }
    } catch (error) {
      // Catch 429 too many requests error
      //console.log("hiii", error.response);
      if (error.response && error.response.status === 429) {
        // Show the custom message from the backend in a toast
        toast.error(
          error.response.data.message ||
            "Too many requests. Please try again later.",
          {
            icon: "⚠️",
            style: {
              background: "#fff9c4",
              color: "#000",
            },
          }
        );
      } else {
        // Handle any other errors
        console.error("Something went wrong Error:", error.message);
        toast.error("Something went wrong", {
          icon: "⚠️",
          style: {
            background: "#fff9c4",
            color: "#000",
          },
        });
      }
    } finally {
      setStartLoading(false);
    }
  };
  return (
    <div
      className="tab-pane fade show active"
      id="pills-login"
      role="tabpanel"
      aria-labelledby="tab-login"
    >
      <form onSubmit={emailHandller}>
        <div className="text-center mb-3">
          <p>
            Forgot your password? Enter your e-mail address below,and we'll send
            an OTP to your email to verify it.OTP is valid for 2min only.
          </p>
        </div>
        {/* Email */}
        <div className={stylesInput.inputContainer}>
          <label className={stylesInput.formLabel} htmlFor="email">
            Email
          </label>
          <span className={stylesInput.iconInside}>
            <FontAwesomeIcon icon={faEnvelope} className={stylesInput.icon} />
          </span>
          <input
            type="email"
            id="email"
            className={stylesInput.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. tchalla@wakanda.gov"
            autoFocus
          />
          {emailError && <p className={stylesInput.errorText}>{emailError}</p>}
        </div>

        <div className={stylesInput.inputContainer}>
          {/* <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
            style={{ width: "100%" }}
          >
            Sent OTP
          </button> */}
          <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              opacity: startLoading ? 0.7 : 1,
              cursor: startLoading ? "not-allowed" : "pointer",
            }}
            disabled={startLoading}
          >
            {startLoading ? (
              <>
                <CircularProgress size="20px" style={{ color: "white" }} />
                <span>Sending OTP...</span>
              </>
            ) : (
              <span>Sent OTP</span>
            )}
          </button>
        </div>

        <div className="text-center">
          <p>
            remember?{" "}
            <Link
              // to="/login"
              onClick={() => remember()}
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasssword;
