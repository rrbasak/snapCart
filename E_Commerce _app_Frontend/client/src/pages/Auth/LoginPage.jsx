import React, { useState } from "react";
import stylesInput from "../../../src/styles/Input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../../context/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthenticate } from "../../features/auth/authSlice";

export default function LoginPage({ activeTabHandler }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setRecaptchaError("");

    let valid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    }

    if (!recaptchaValue) {
      setRecaptchaError("Recaptcha is required");
      valid = false;
    }

    if (!valid) return;

    setStartLoading(true);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
        email,
        password,
        recaptchaValue,
      });
      console.log(res);
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          accessToken: res.data.accessToken,
        });
        dispatch(setAuthenticate(res.data));
        localStorage.setItem("auth", JSON.stringify(res.data));

        navigate(location.state || "/");
      } else {
        toast(res.data.message, {
          icon: "⚠️",
          style: {
            background: "#fff9c4",
            color: "#000",
          },
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        toast("Too many login attempts, please try again later.", {
          icon: "⚠️",
          style: {
            background: "#fff9c4",
            color: "#000",
          },
        });
      } else {
        console.error("error", error);
        toast.error("Something went wrong");
      }
    } finally {
      setStartLoading(false);
    }
  };
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const recaptchaHandler = (value) => {
    setRecaptchaValue(value);
  };
  return (
    <form onSubmit={handleLogin}>
      <div>
        <div className="text-center mb-3">
          <p>Sign in with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i
              // onClick={() => login()}
              className="fab fa-google"
            ></i>
          </button>
        </div>

        {/* Email Field */}
        <div className={stylesInput.inputContainer}>
          <label className={stylesInput.formLabel}>
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <div
            className={stylesInput.inputWrapper}
            style={{ position: "relative" }}
          >
            <span className={stylesInput.lockIconInside}>
              <FontAwesomeIcon icon={faEnvelope} className={stylesInput.icon} />
            </span>
            <input
              type="email"
              id="loginName"
              className={stylesInput.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. tchalla@wakanda.gov"
              autoFocus
            />
          </div>

          {emailError && (
            <p
              className={stylesInput.formLabel}
              style={{ color: "red", fontSize: "12px" }}
            >
              {emailError}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className={stylesInput.inputContainer}>
          <label className={stylesInput.formLabel}>
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <div
            className={stylesInput.inputWrapper}
            style={{ position: "relative" }}
          >
            <span className={stylesInput.lockIconInside}>
              <FontAwesomeIcon icon={faLock} className={stylesInput.icon} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="loginPassword"
              className={stylesInput.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
            />
            <span
              className={stylesInput.eyeIconInside}
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>
          {passwordError && (
            <p
              className={stylesInput.formLabel}
              style={{ color: "red", fontSize: "12px" }}
            >
              {passwordError}
            </p>
          )}
        </div>
        {/* recaptcha */}
        <div className={stylesInput.inputContainer}>
          <div
            className={`g-recaptcha ${stylesInput.gRecaptchaContainer}`}
            data-theme="light"
            data-sitekey="XXXXXXXXXXXXX"
          >
            <ReCAPTCHA
              sitekey="6LcclwQqAAAAABe5-jb24MgWm3TeK73zeeD2PsNT"
              onChange={recaptchaHandler}
              className="recaptcha-fixed"
            />
          </div>
          {recaptchaError && (
            <p
              className={stylesInput.formLabel}
              style={{ color: "red", fontSize: "12px" }}
            >
              {recaptchaError}
            </p>
          )}
        </div>

        {/* Submit Button */}
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
              <span>Signing In...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
          <FontAwesomeIcon icon={faRightToBracket} />
        </button>

        <div className="text-center">
          <div>
            <Link onClick={() => activeTabHandler("forgotpassword")}>
              Forgot your password?
            </Link>
          </div>
          <p>
            Don't have an account?{" "}
            <Link
              // to="/"
              state={{ role: "buyer" }}
              onClick={() => activeTabHandler("register")}
            >
              Sign up and get started!
            </Link>
          </p>
          <p>
            <Link
              // to="/"
              state={{ role: "deliveryPartner" }}
              onClick={() => activeTabHandler("register")}
            >
              *Sign up as a Delivery Partner and earn!
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}
