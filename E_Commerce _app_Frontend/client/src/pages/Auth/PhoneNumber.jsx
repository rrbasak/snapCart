import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
//css files
import stylesInput from "../../../src/styles/Input.module.css";
import { CircularProgress } from "@mui/material";

const PhoneNumber = ({ otppage, email }) => {
  const [mobileno, setMobileNo] = useState("");
  const [startLoading, setStartLoading] = useState(false);
  const [error, setError] = useState("");

  const phoneNoHandller = async (e) => {
    e.preventDefault();
    setError("");
    setStartLoading(true);

    //  if (!mobileno) {
    //    setError("Please enter a valid phone number.");
    //    setStartLoading(false);
    //    return;
    //  }

    //  const phoneNumber = parsePhoneNumberFromString(mobileno, "IN");

    //  if (
    //    !phoneNumber ||
    //    !phoneNumber.isValid() ||
    //    phoneNumber.nationalNumber.length !== 10
    //  ) {
    //    setError("Please enter a valid 10-digit phone number.");
    //    setStartLoading(false);
    //    return;
    //  }

    if (!mobileno) {
      setError("Please enter a valid phone number.");
      setStartLoading(false);
      return;
    }

    const phoneNumber = parsePhoneNumberFromString(mobileno);

    if (!phoneNumber || !phoneNumber.isValid()) {
      setError("Please enter a valid phone number.");
      setStartLoading(false);
      return;
    }

    // const country = phoneNumber.country;
    // const nationalNumber = phoneNumber.nationalNumber;

    if (!phoneNumber.isValid()) {
      setError(
        "Please enter a valid phone number as per your country's format."
      );
      setStartLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/get-sms-otp`, {
        mobile: mobileno,
        email: email,
      });

      if (res && res.data.success) {
        toast.success(res.data.message);
        otppage(mobileno, email);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error:", error);
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
      <form onSubmit={phoneNoHandller}>
        <div className={stylesInput.inputContainer}>
          <label className={stylesInput.formLabel}>Mobile No.</label>
          <PhoneInput
            defaultCountry="IN"
            international
            countryCallingCodeEditable={false}
            className={stylesInput.inputField}
            style={{ border: "0", padding: "12px", borderRadius: "2px" }}
            id="registerPassword"
            placeholder="Enter phone number"
            value={mobileno}
            onChange={setMobileNo}
          />
          {error && <p className={stylesInput.errorText}>{error}</p>}
        </div>

        <div className={stylesInput.inputContainer}>
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
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify Phone No.</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhoneNumber;
