import React, { useState } from "react";

import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHome, faLock } from "@fortawesome/free-solid-svg-icons";

//css files
import stylesInput from "../../../src/styles/Input.module.css";
import "../../styles/AuthStyles.css";

const PassWordAddress = ({ lastStep, nextPage, userType }) => {
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  // eslint-disable-next-line no-unused-vars

  const submitHandler = async (e) => {
    e.preventDefault();
    if (userType === "deliveryPartner") {
      //console.log("deliveryPartner");
      nextPage(password, address);
    } else {
      //console.log("buyer");
      lastStep(password, address);
    }
  };
  return (
    <div
      className="tab-pane fade show active"
      id="pills-login"
      role="tabpanel"
      aria-labelledby="tab-login"
    >
      <form onSubmit={submitHandler}>
        {/* password */}
        <div className={stylesInput.inputContainer}>
          <label className={stylesInput.formLabel} htmlFor="loginName">
            Password
          </label>
          <span className={stylesInput.iconInside}>
            <FontAwesomeIcon icon={faLock} className={stylesInput.icon} />
          </span>
          <input
            type="password"
            id="password"
            className={stylesInput.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        {/* address */}
        <div className={stylesInput.inputContainer}>
          <label className={stylesInput.formLabel} htmlFor="address">
            Address
          </label>
          <span className={stylesInput.iconInside}>
            <FontAwesomeIcon icon={faHome} className={stylesInput.icon} />
          </span>
          <input
            type="text"
            id="address"
            className={stylesInput.inputField}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Pal Alto 10th, Hacker Way"
          />
        </div>
        <div className={stylesInput.inputContainer}>
          <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
            style={{ width: "100%" }}
          >
            {userType === "buyer" ? "you are ready to go" : "next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PassWordAddress;
