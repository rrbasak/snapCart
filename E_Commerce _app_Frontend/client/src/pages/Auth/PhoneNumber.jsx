import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import PhoneInput from "react-phone-number-input";

//css files
import stylesInput from "../../../src/styles/Input.module.css";

const PhoneNumber = ({ otppage, email }) => {
  const [mobileno, setMobileNo] = useState("");

  const phoneNoHandller = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/get-otp`,
        {
          mobile: mobileno,
          email: email,
        }
      );
      ////console.log(res);
      if (res && res.data.success) {
        toast.success(res.data.message);
        //////console.log(res.data.otp);
        // otppage(mobileno, res.data.otp);
        otppage(mobileno, email);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error:", error);
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
          <label className={stylesInput.formLabel} htmlFor="phonenovalidation">
            Mobile No.
          </label>
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
        </div>

        <div className={stylesInput.inputContainer}>
          <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
            style={{ width: "100%" }}
          >
            Verify Phone no.
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhoneNumber;
