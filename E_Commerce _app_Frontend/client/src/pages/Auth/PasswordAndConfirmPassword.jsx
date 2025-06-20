import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faLock,
  faEye,
  faEyeSlash,
  faInfoCircle,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import stylesInput from "../../../src/styles/Input.module.css";
import "../../styles/AuthStyles.css";
import { CircularProgress } from "@mui/material";

const PasswordndConfirmPassword = ({ lastStep }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    level: "",
    width: "0%",
    color: "transparent",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordHints, setPasswordHints] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const checkPasswordStrength = (pwd) => {
    if (!pwd) {
      setPasswordStrength({ level: "", width: "0%", color: "transparent" });
      setErrorMessage("");
      setPasswordHints({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
      });
      return;
    }

    let strength = { level: "Weak", width: "25%", color: "red" };
    let hints = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /\d/.test(pwd),
      special: /[!@#$%^&*]/.test(pwd),
    };

    let errorMsg = "Password must be at least 8 characters long.";

    if (hints.length && hints.number && hints.special) {
      strength = { level: "Medium", width: "50%", color: "orange" };
      errorMsg = "Include an uppercase letter for a stronger password.";
    }
    if (
      hints.length &&
      hints.number &&
      hints.special &&
      hints.uppercase &&
      hints.lowercase
    ) {
      strength = { level: "Strong", width: "100%", color: "green" };
      errorMsg = "";
    }

    setPasswordStrength(strength);
    setErrorMessage(errorMsg);
    setPasswordHints(hints);
  };

  const handlePasswordChange = (e) => {
    const newPwd = e.target.value;
    setPassword(newPwd);
    checkPasswordStrength(newPwd);
    setConfirmPassword("");
    setPasswordsMatch(true);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(confirmPassword !== "" && password === e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!passwordsMatch) return;
    setStartLoading(true);
    try {
      await lastStep(password, confirmPassword);
      
    } catch (error) {
      console.error("Error changing password:", error);
    }finally{
      setStartLoading(false);
    }
  };

  return (
    <div className="tab-pane fade show active" id="pills-login">
      <form onSubmit={submitHandler}>
        {/* Password */}
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
              id="password"
              className={stylesInput.inputField}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
              style={{ paddingRight: "40px" }}
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

          {/* Password Strength Indicator */}
          <div
            style={{
              width: "100%",
              height: "5px",
              background: "#ddd",
              marginTop: "5px",
              borderRadius: "3px",
            }}
          >
            <div
              style={{
                width: passwordStrength.width,
                height: "5px",
                background: passwordStrength.color,
                borderRadius: "3px",
                transition: "width 0.3s ease-in-out",
              }}
            />
          </div>

          {/* Strength Text + Tooltip */}
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
          >
            <small
              style={{
                color: passwordStrength.color,
                fontWeight: "bold",
                visibility: password ? "visible" : "hidden",
              }}
            >
              {passwordStrength.level}
            </small>
          </div>

          {/* Real-time Password Hints */}
          <ul
            style={{ listStyleType: "none", padding: 0, margin: "10px 0 0 0" }}
          >
            {Object.entries(passwordHints).map(([key, value]) => (
              <li
                key={key}
                style={{
                  fontSize: "14px",
                  color: value ? "green" : "red",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={value ? faCheckCircle : faTimesCircle}
                  style={{ marginRight: "5px" }}
                />
                {key === "length" && "At least 8 characters"}
                {key === "uppercase" && "At least 1 uppercase letter"}
                {key === "lowercase" && "At least 1 lowercase letter"}
                {key === "number" && "At least 1 number"}
                {key === "special" && "At least 1 special character (!@#$%^&*)"}
              </li>
            ))}
          </ul>

          {/* Real-time Error Message */}
          {errorMessage && (
            <small
              style={{
                color: "red",
                fontWeight: "bold",
                marginTop: "3px",
                display: "block",
              }}
            >
              {errorMessage}
            </small>
          )}
        </div>

        {/* Confirm Password */}
        <div className={stylesInput.inputContainer}>
          <label className={stylesInput.formLabel}>
            Confirm Password <span style={{ color: "red" }}>*</span>
          </label>
          <div
            className={stylesInput.inputWrapper}
            style={{ position: "relative" }}
          >
            <span className={stylesInput.lockIconInside}>
              <FontAwesomeIcon icon={faLock} className={stylesInput.icon} />
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className={stylesInput.inputField}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Re-enter new password"
              style={{ paddingRight: "40px" }}
              disabled={!Object.values(passwordHints).every(Boolean)}
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
            />
            <span
              className={stylesInput.eyeIconInside}
              onClick={toggleConfirmPasswordVisibility}
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEye : faEyeSlash}
              />
            </span>
          </div>
          {!passwordsMatch && confirmPassword && (
            <small style={{ color: "red" }}>Passwords do not match.</small>
          )}
        </div>

        {/* Submit Button */}
        <div className={stylesInput.inputContainer}>
          {/* <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
            style={{ width: "100%" }}
            disabled={
              !Object.values(passwordHints).every(Boolean) ||
              !passwordsMatch ||
              confirmPassword === ""
            }
          >
            Change
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
              opacity:
                !Object.values(passwordHints).every(Boolean) ||
                !passwordsMatch ||
                confirmPassword === "" ||
                startLoading
                  ? 0.7
                  : 1,
              cursor:
                !Object.values(passwordHints).every(Boolean) ||
                !passwordsMatch ||
                confirmPassword === "" ||
                startLoading
                  ? "not-allowed"
                  : "pointer",
            }}
            disabled={
              !Object.values(passwordHints).every(Boolean) ||
              !passwordsMatch ||
              confirmPassword === "" ||
              startLoading
            }
          >
            {startLoading ? (
              <>
                <CircularProgress size="20px" style={{ color: "white" }} />
                <span>Changing...</span>
              </>
            ) : (
              <span>Change</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordndConfirmPassword;
