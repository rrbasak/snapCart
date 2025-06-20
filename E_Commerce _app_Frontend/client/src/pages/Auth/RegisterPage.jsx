import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import stylesInput from "../../../src/styles/Input.module.css";
import { CircularProgress } from "@mui/material";

const RegisterPage = ({ handleRegister, registration, }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [startLoading, setStartLoading] = useState(false);


  const validateForm = () => {
    let isValid = true;

    if (!firstName.trim()) {
      setFirstNameError("First name is required");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName.trim()) {
      setLastNameError("Last name is required");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setStartLoading(true);
      await handleRegister(firstName, lastName, email);
      setStartLoading(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-center mb-3">
        <p>Sign up with:</p>
        <button type="button" className="btn btn-link btn-floating mx-1">
          <i onClick={() => registration()} className="fab fa-google"></i>
        </button>
      </div>
      <p className="text-center">or:</p>

      <div className="row">
        {/* First Name Field */}
        <div className="col-md-6 mb-4">
          <label className={stylesInput.formLabel} htmlFor="firstname">
            First name <span style={{ color: "red" }}>*</span>
          </label>
          <div
            className={`${stylesInput.inputContainer} d-flex align-items-center`}
          >
            <span className={stylesInput.iconRegInside}>
              <FontAwesomeIcon icon={faUser} className={stylesInput.icon} />
            </span>
            <input
              type="text"
              id="firstname"
              className={stylesInput.inputField}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Alex"
              autoFocus
            />
          </div>
          {firstNameError && (
            <p className={stylesInput.errorText}>{firstNameError}</p>
          )}
        </div>

        {/* Last Name Field */}
        <div className="col-md-6 mb-4">
          <label className={stylesInput.formLabel} htmlFor="lastname">
            Last name <span style={{ color: "red" }}>*</span>
          </label>
          <div
            className={`${stylesInput.inputContainer} d-flex align-items-center`}
          >
            <span className={stylesInput.iconRegInside}>
              <FontAwesomeIcon icon={faUser} className={stylesInput.icon} />
            </span>
            <input
              type="text"
              id="lastname"
              className={stylesInput.inputField}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
            />
          </div>
          {lastNameError && (
            <p className={stylesInput.errorText}>{lastNameError}</p>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div className="form-outline mb-4">
        <label className={stylesInput.formLabel} htmlFor="registerEmail">
          Email <span style={{ color: "red" }}>*</span>
        </label>
        <div
          className={`${stylesInput.inputContainer} d-flex align-items-center`}
        >
          <span className={stylesInput.iconRegInside}>
            <FontAwesomeIcon icon={faEnvelope} className={stylesInput.icon} />
          </span>
          <input
            type="email"
            id="registerEmail"
            className={stylesInput.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. tchalla@wakanda.gov"
          />
        </div>
        {emailError && <p className={stylesInput.errorText}>{emailError}</p>}
      </div>

      <div className="row mb-4">
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
              <span>Going...</span>
            </>
          ) : (
            <span>Go</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default RegisterPage;
