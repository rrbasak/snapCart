/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { NavLink, Link } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useAuth0 } from "@auth0/auth0-react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { googleLogout } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import ForgotPasssword from "./ForgotPassword";
import MobileValidationOTP from "../../components/MobileValidationOTP";
import PhoneNumber from "./PhoneNumber";
import PassWordAddress from "./PassWordAddress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faRightFromBracket,
  faRightToBracket,
  faEnvelope,
  faLock,
  faSignature,
  faUser,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import ReCAPTCHA from "react-google-recaptcha";

//css files
import stylesInput from "../../../src/styles/Input.module.css";
import stylesButton from "../../../src/styles/Button.module.css";
import "../../styles/AuthStyles.css";
import { addEmail, checkEmail } from "../../frontendUtil/api.js";
import VehicleDetailsForm from "../DeliveryPartner/VehicleDetailsForm";
import EmailvalidationOTP from "../../components/EmailvalidationOTP";
import PasswordAndConfirmPassword from "./PasswordAndConfirmPassword.jsx";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { CircularProgress } from "@mui/material";
import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx";

const LoginRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileno, setMobileNo] = useState("");
  const [auth, setAuth] = useAuth();
  const [otpEmail, setOTPEmail] = useState();
  const [otp, setOTP] = useState();
  const [userId, setUserId] = useState();
  const [resetPassword, setResetPassword] = useState();
  const [confirmResetPassword, setConfirmResetPassword] = useState();
  const [otpForMobileValidation, setOtpForMobileValidation] = useState();
  const [activeTab, setActiveTab] = useState("login");
  const [recaptchaValue, setRecaptchaValue] = useState();
  const captchaRef = useRef();
  const [pass_word, setPass_word] = useState("");
  const [add_ress, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [startLoading, setStartLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const value = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        ////console.log(value.data);
        const email = value?.data?.email;
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/loginViaGoogle`, {
          email: email,
        });
        if (res && res.data.success) {
          setAuth({
            ...auth,
            user: res.data.user,
            accessToken: res.data.accessToken,
          });
          localStorage.setItem("auth", JSON.stringify(res.data));
          navigate(location.state || "/");
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        ////console.log(error);
      }
    },
  });

  const capitalizeName = (name) => {
    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const registration = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const value = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        ////console.log(value.data);
        const email = value?.data?.email;
        const name = capitalizeName(value?.data?.name);
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/registerViaGoogle`, {
          name: name,
          email: email,
        });
        //console.log(res.data);

        if (res && res?.data && res?.data?.success === true) {
          setAuth({
            ...auth,
            user: res.data.user,
            accessToken: res.data.accessToken,
          });
          localStorage.setItem("auth", JSON.stringify(res.data));
          navigate(location.state || "/");
          toast.success(res.data.message);
        } else {
          //console.log("login er");
          setActiveTab("login");
          toast.success(res.data.message);
        }
      } catch (error) {
        ////console.log(error);
      }
    },
  });
  // const {
  //   user,
  //   loginWithRedirect,
  //   loginWithPopup,
  //   logout,
  //   isAuthenticated,
  //   isLoading,
  // } = useAuth0();
  // {
  //   isAuthenticated && ////console.log(user);
  // }
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const recaptchaHandler = (value) => {
    ////console.log(value);
    setRecaptchaValue(value);
    // captchaRef.current.reset();
  };
  const handleLogin = async (e) => {
    setStartLoading(true);
    e.preventDefault();
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

        localStorage.setItem("auth", JSON.stringify(res.data));
        const redirectTo = location?.state?.from?.pathname || "/";
        const redirectSearch = location?.state?.from?.search || "";
        // console.log("location?.state", location?.state);
        // console.log("redirectTo + redirectSearch", redirectTo + redirectSearch);
        // navigate(redirectTo + redirectSearch || location.state);
        // console.log("location.state", location.state);
        // console.log("auth?.user?.role", auth?.user?.role);
        // if (res.data?.user?.role === 0) {
        //   navigate(location.state || "/");
        // } else if (res.data?.user?.role === 1) {
        //   navigate(location.state || "/dashboard/admin");
        // }

        navigate(location.state || "/");

        // toast.success(res.data.message);
      } else {
        // toast.error(res.data.message);
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
        console.error(error);
        toast.error("Something went wrong");
      }
    } finally {
      setStartLoading(false);
    }
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const [registerFormBody, setRegisterFormBody] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [deliveryPartnerRegisterFormBody, setDeliveryPartnerRegisterFormBody] =
    useState({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      vehicleType: "",
      vehicleModel: "",
      registrationNumber: "",
      vehicleColor: "",
      ownerName: "",
      drivingLicenseNumber: "",
      insuranceProvider: "",
      policyNumber: "",
      expiryDate: "",
      drivingLicenseFile: null,
      vehicleRegistrationFile: null,
      insuranceFile: null,
    });
  const activeTabHandler = (nextPage) => {
    console.log(nextPage);
    setActiveTab(nextPage);
  };

  const handleRegister = async (firstName, lastName, email) => {
    try {
      if (!firstName) {
        toast.error("Please provide first name", {
          icon: "⚠️",
          style: {
            background: "#fff9c4",
            color: "#000",
          },
        });
        return;
      }
      if (!lastName) {
        toast.error("Please provide last name", {
          icon: "⚠️",
          style: {
            background: "#fff9c4",
            color: "#000",
          },
        });
        return;
      }
      if (!email) {
        toast.error("Please provide email", {
          icon: "⚠️",
          style: {
            background: "#fff9c4",
            color: "#000",
          },
        });
        return;
      }
      // const res = await axios.get(`/api/v1/auth/checkMail/${email}`);
      ////console.log(res);
      // const emailExists = await bloomFilter.alreadyExists(email);

      // const emailExists = await checkEmail(email);
      if (true) {
        // await addEmail(email);
        setRegisterFormBody((prevFormBody) => ({
          ...prevFormBody,
          name: capitalize(firstName) + " " + capitalize(lastName),
          email: email,
        }));
        setDeliveryPartnerRegisterFormBody((prevFormBody) => ({
          ...prevFormBody,
          name: capitalize(firstName) + " " + capitalize(lastName),
          email: email,
        }));
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API}/api/v1/auth/get-email-otp`,
            {
              email: email,
            }
          );
          if (res && res.data.success) {
            toast.success(res.data.message);
            setActiveTab("OTP_registerEmailValidation");
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          toast.error("Something went wrong");
          console.error("Error:", error);
        }
      } else {
        toast.error(
          "Unable to proceed. Please check your details and try again."
        );
      }

      // if (res && res.data.success) {
      //   setRegisterFormBody((prevFormBody) => ({
      //     ...prevFormBody,
      //     name: capitalize(firstName) + " " + capitalize(lastName),
      //     email: email,
      //   }));
      //   setActiveTab("mobileValidation");
      // } else {
      //   toast.error(res.data.message);
      // }
    } catch (error) {
      ////console.log(error);
      toast.error("Something went wrong");
    } finally {
      setStartLoading(false);
    }

    // try {
    //   const res = await axios.post(
    //     `${process.env.REACT_APP_API}/api/v1/auth/register`,
    //     {
    //       name: capitalize(firstName) + " " + capitalize(lastName),
    //       email,
    //       password,
    //       phone: mobileno,
    //     }
    //   );
    //   if (res && res.data.success) {
    //     toast.success(res.data.message);
    //     setTimeout(() => {
    //       setActiveTab("login");
    //     }, 3000);
    //   } else {
    //     toast.error(res.data.message);
    //   }
    // } catch (error) {
    //   ////console.log(error);
    //   toast.error("Something went wrong");
    // }
  };
  const rememberHandler = () => {
    ////console.log("rememberHandler");
    setActiveTab("login");
  };
  const otppageHandler = (email, userId) => {
    ////console.log("email", email);
    ////console.log("otp", otp);
    setOTPEmail(email);
    // setOTP(otp);
    setUserId(userId);
    setActiveTab("OTP_emailValidation");
  };

  const resetPage = () => {
    ////console.log("Reset page");
    setActiveTab("resetPage");
  };
  const mobileNumberHandler = () => {
    setActiveTab("mobileValidation");
  };
  const registrationNextPage = () => {
    setActiveTab("registrationNextPage");
  };
  const deliveryPartner = async (password, address) => {
    console.log(password, address);
    setDeliveryPartnerRegisterFormBody((prevFormBody) => ({
      ...prevFormBody,
      password: password,
      address: address,
    }));
    setPass_word(password);
    setAddress(address);
    setActiveTab("deliveryPartner");
  };

  const resetFormHandler = async (e) => {
    e.preventDefault();
    try {
      if (!resetPassword) {
        toast.error("Please provide Password", {
          icon: "⚠️",
          style: {
            background: "#fff9c4",
            color: "#000",
          },
        });
        return;
      }
      if (!confirmResetPassword) {
        toast.error("Please Confirmed password", {
          icon: "⚠️",
          style: {
            background: "#fff9c4",
            color: "#000",
          },
        });
        return;
      }
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/reset-password-otp`,
        {
          otpEmail,
          resetPassword,
          confirmResetPassword,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          setActiveTab("login");
        }, 3000);
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
      ////console.log(error);
      toast.error("Something went wrong2");
    }
  };

  const lastStepHandler = async (password, address) => {
    try {
      setRegisterFormBody((prevFormBody) => ({
        ...prevFormBody,
        password: password,
        address: address,
      }));
      ////console.log(registerFormBody);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          ...registerFormBody,
          password: password,
          address: address,
        }
      );
      if (res && res.data.success) {
        await addEmail(registerFormBody?.email);
        toast.success(res.data.message);
        setTimeout(() => {
          setActiveTab("login");
        }, 3000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      ////console.log(error);
      toast.error("Something went wrong3");
    }
  };

  const forgotpasswordStepHandler = async (
    resetPassword,
    confirmResetPassword
  ) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/reset-password-otp`,
        {
          otpEmail,
          resetPassword,
          confirmResetPassword,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          setActiveTab("login");
        }, 3000);
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
      toast.error("Something went wrong");
    }
  };

  const otppageForMobileValidation = async (mobile, otp) => {
    setRegisterFormBody((prevFormBody) => ({
      ...prevFormBody,
      phone: mobile,
    }));
    setDeliveryPartnerRegisterFormBody((prevFormBody) => ({
      ...prevFormBody,
      phone: mobile,
    }));
    setMobileNo(mobile);
    setOtpForMobileValidation(otp);
    setActiveTab("OTP_mobileValidation");
  };

  //IMPORTANT
  useEffect(() => {
    let isAuth = localStorage.getItem("auth");
    if (isAuth && isAuth?.accessToken !== "undefined") {
      navigate("/");
    }
  }, [navigate]);

  // const lastStepHandlerasDeliverypartner = async (
  //   vehicleType,
  //   vehicleModel,
  //   registrationNumber,
  //   vehicleColor,
  //   ownerName,
  //   drivingLicenseNumber,
  //   insuranceProvider,
  //   policyNumber,
  //   expiryDate,
  //   drivingLicenseFile,
  //   vehicleRegistrationFile,
  //   insuranceFile
  // ) => {
  //   try {
  //     setDeliveryPartnerRegisterFormBody((prevFormBody) => ({
  //       ...prevFormBody,
  //       password:pass_word,
  //       address:add_ress,
  //       vehicleType: vehicleType,
  //       vehicleModel: vehicleModel,
  //       registrationNumber: registrationNumber,
  //       vehicleColor: vehicleColor,
  //       ownerName: ownerName,
  //       drivingLicenseNumber: drivingLicenseNumber,
  //       insuranceProvider: insuranceProvider,
  //       policyNumber: policyNumber,
  //       expiryDate: expiryDate,
  //       drivingLicenseFile: drivingLicenseFile,
  //       vehicleRegistrationFile: vehicleRegistrationFile,
  //       insuranceFile: insuranceFile,
  //     }));

  //     console.log(registerFormBody);
  //     const res = await axios.post("/api/v1/auth/delivery-partner/register", {
  //       ...registerFormBody,
  //       password: pass_word,
  //       address: add_ress,
  //       vehicleType: vehicleType,
  //       vehicleModel: vehicleModel,
  //       registrationNumber: registrationNumber,
  //       vehicleColor: vehicleColor,
  //       ownerName: ownerName,
  //       drivingLicenseNumber: drivingLicenseNumber,
  //       insuranceProvider: insuranceProvider,
  //       policyNumber: policyNumber,
  //       expiryDate: expiryDate,
  //       drivingLicenseFile: drivingLicenseFile,
  //       vehicleRegistrationFile: vehicleRegistrationFile,
  //       insuranceFile: insuranceFile,
  //     });
  //     if (res && res.data.success) {
  //       toast.success(res.data.message);
  //       setTimeout(() => {
  //         setActiveTab("login");
  //       }, 3000);
  //     } else {
  //       toast.error(res.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong here");
  //   }
  // };

  const lastStepHandlerasDeliverypartner = async (values, files) => {
    try {
      const combinedFormData = {
        ...deliveryPartnerRegisterFormBody,
        ...values,
        ...files,
        password: pass_word,
        address: add_ress,
      };

      // Update state with the combined form data
      setDeliveryPartnerRegisterFormBody(combinedFormData);

      const deliveryPartnerData = new FormData();

      // Append all fields to the FormData object
      deliveryPartnerData.append("name", combinedFormData?.name);
      deliveryPartnerData.append("email", combinedFormData?.email);
      deliveryPartnerData.append("phone", combinedFormData?.phone);
      deliveryPartnerData.append("password", combinedFormData?.password);
      deliveryPartnerData.append("address", combinedFormData?.address);
      deliveryPartnerData.append("vehicleType", combinedFormData?.vehicleType);
      deliveryPartnerData.append("vehicleType", combinedFormData?.vehicleType);
      deliveryPartnerData.append(
        "vehicleModel",
        combinedFormData?.vehicleModel
      );
      deliveryPartnerData.append(
        "registrationNumber",
        combinedFormData?.registrationNumber
      );
      deliveryPartnerData.append(
        "vehicleColor",
        combinedFormData?.vehicleColor
      );
      deliveryPartnerData.append("ownerName", combinedFormData?.ownerName);
      deliveryPartnerData.append(
        "drivingLicenseNumber",
        combinedFormData?.drivingLicenseNumber
      );
      deliveryPartnerData.append(
        "insuranceProvider",
        combinedFormData?.insuranceProvider
      );
      deliveryPartnerData.append(
        "policyNumber",
        combinedFormData?.policyNumber
      );
      deliveryPartnerData.append("expiryDate", combinedFormData?.expiryDate);

      // Append files to FormData
      if (combinedFormData?.drivingLicenseFile) {
        deliveryPartnerData.append(
          "drivingLicenseFile",
          combinedFormData?.drivingLicenseFile
        );
      }
      if (combinedFormData?.vehicleRegistrationFile) {
        deliveryPartnerData.append(
          "vehicleRegistrationFile",
          combinedFormData?.vehicleRegistrationFile
        );
      }
      if (combinedFormData?.insuranceFile) {
        deliveryPartnerData.append(
          "insuranceFile",
          combinedFormData?.insuranceFile
        );
      }

      for (let [key, value] of deliveryPartnerData.entries()) {
        console.log(key, value);
      }
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/delivery-partner/register`,
        deliveryPartnerData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res && res.data.success) {
        await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/deliver-partner-register-notification`, {
          title: "Rider Registered 🛵",
          message: `New delivery partner ${res?.data?.deliveryPartner?.name} has joined the platform.`,
          recipient: "admin",
          status: "unread",
          type: "system",
        });
        await addEmail(combinedFormData?.email);
        toast.success(res.data.message);
        setTimeout(() => {
          setActiveTab("login");
        }, 3000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong here");
    }
  };

  return (
    <Layout title="Login/Register - Ecommer App">
      {/* <section className="vh-100 gradient-custom"> */}
      <div
        className="px-4 py-5 px-md-5 text-center text-lg-start"
        style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
      >
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                Discover Amazing Deals <br />
                <span className="text-primary">for your business</span>
              </h1>
              <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                Welcome to SnapCart, your one-stop destination for all your
                shopping needs! Whether you're looking to upgrade your wardrobe
                with the latest fashion trends, find the perfect pair of shoes,
                or explore cutting-edge electronics, we’ve got you covered. Dive
                into our extensive collection of books to ignite your
                imagination, or gear up with top-notch sports equipment to
                elevate your game. At SnapCart, we believe that every passion
                deserves the best, and we are here to help you find exactly what
                you're looking for!
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  {activeTab === "forgotpassword" ||
                  activeTab === "OTP_emailValidation" ||
                  activeTab === "OTP_registerEmailValidation" ||
                  activeTab === "resetPage" ||
                  activeTab === "mobileValidation" ||
                  activeTab === "OTP_mobileValidation" ||
                  activeTab === "registrationNextPage" ||
                  activeTab === "deliveryPartner" ? (
                    <></>
                  ) : (
                    <ul
                      className="nav nav-pills nav-justified mb-3"
                      id="ex1"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${
                            activeTab === "login" ? "active" : ""
                          }`}
                          onClick={() => setActiveTab("login")}
                        >
                          Sign In
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${
                            activeTab === "register" ? "active" : ""
                          }`}
                          onClick={() => setActiveTab("register")}
                        >
                          Sign Up
                        </button>
                      </li>
                    </ul>
                  )}

                  <div className="tab-content">
                    {activeTab === "login" && (
                      <div
                        className="tab-pane fade show active"
                        id="pills-login"
                        role="tabpanel"
                        aria-labelledby="tab-login"
                      >
                        <LoginPage activeTabHandler={activeTabHandler} />
                      </div>
                    )}

                    {activeTab === "register" && (
                      <div
                        className="tab-pane fade show active"
                        id="pills-register"
                        role="tabpanel"
                        aria-labelledby="tab-register"
                      >
                        <RegisterPage
                          handleRegister={handleRegister}
                          registration={registration}
                        />
                      </div>
                    )}

                    {activeTab === "forgotpassword" && (
                      <ForgotPasssword
                        remember={rememberHandler}
                        otppage={otppageHandler}
                      ></ForgotPasssword>
                    )}

                    {activeTab === "OTP_emailValidation" && (
                      <EmailvalidationOTP
                        to={otpEmail}
                        userId={userId}
                        email={email}
                        mobile={mobileno}
                        nextPage={resetPage}
                      ></EmailvalidationOTP>
                    )}

                    {activeTab === "resetPage" && (
                      // <div
                      //   className="tab-pane fade show active"
                      //   id="pills-login"
                      //   role="tabpanel"
                      //   aria-labelledby="tab-login"
                      // >
                      //   <form onSubmit={resetFormHandler}>
                      //     {/* password */}
                      //     <div className={stylesInput.inputContainer}></div>
                      //     <label className={stylesInput.formLabel}>
                      //       Password <span style={{ color: "red" }}>*</span>
                      //     </label>
                      //     <span className={stylesInput.iconTwoEmailInside}>
                      //       <FontAwesomeIcon
                      //         icon={faLock}
                      //         className={stylesInput.icon}
                      //       />
                      //     </span>
                      //     <input
                      //       type="password"
                      //       id="password"
                      //       className={stylesInput.inputField}
                      //       value={resetPassword}
                      //       onChange={(e) => setResetPassword(e.target.value)}
                      //       placeholder="Enter new  password"
                      //       autoFocus
                      //     />
                      //     {/* confirm password */}
                      //     <div className={stylesInput.inputContainer}>
                      //       <label className={stylesInput.formLabel}>
                      //         Confirm Password
                      //         <span style={{ color: "red" }}>*</span>
                      //       </label>
                      //       <span className={stylesInput.iconInside}>
                      //         <FontAwesomeIcon
                      //           icon={faLock}
                      //           className={stylesInput.icon}
                      //         />
                      //       </span>
                      //       <input
                      //         type="password"
                      //         id="confirmpassword"
                      //         className={stylesInput.inputField}
                      //         value={confirmResetPassword}
                      //         onChange={(e) =>
                      //           setConfirmResetPassword(e.target.value)
                      //         }
                      //         placeholder="Re-enter new password"
                      //         autoFocus
                      //       />
                      //     </div>

                      //     <div className={stylesInput.inputContainer}>
                      //       <button
                      //         type="submit"
                      //         className="btn btn-primary btn-block mb-4"
                      //         style={{ width: "100%" }}
                      //       >
                      //         Reset my password
                      //       </button>
                      //     </div>

                      //     <div className="text-center"></div>
                      //   </form>
                      // </div>
                      <PasswordAndConfirmPassword
                        lastStep={forgotpasswordStepHandler}
                      />
                    )}
                    {activeTab === "OTP_registerEmailValidation" && (
                      <EmailvalidationOTP
                        to={
                          registerFormBody?.email ||
                          deliveryPartnerRegisterFormBody?.email
                        }
                        userId={
                          registerFormBody?.email ||
                          deliveryPartnerRegisterFormBody?.email
                        }
                        email={
                          registerFormBody?.email ||
                          deliveryPartnerRegisterFormBody?.email
                        }
                        mobile={mobileno}
                        nextPage={mobileNumberHandler}
                      ></EmailvalidationOTP>
                    )}
                    {activeTab === "mobileValidation" && (
                      <PhoneNumber
                        otppage={otppageForMobileValidation}
                        email={email}
                      />
                    )}

                    {activeTab === "OTP_mobileValidation" && (
                      <MobileValidationOTP
                        to={otpEmail}
                        // MobileValidationOTP={otpForMobileValidation}
                        userId={userId}
                        email={email}
                        mobile={mobileno}
                        nextPage={registrationNextPage}
                      ></MobileValidationOTP>
                    )}
                    {activeTab === "registrationNextPage" && (
                      <PassWordAddress
                        lastStep={lastStepHandler}
                        nextPage={deliveryPartner}
                        userType={
                          location?.state?.role === "deliveryPartner"
                            ? "deliveryPartner"
                            : "buyer"
                        }
                      ></PassWordAddress>
                    )}
                    {activeTab === "deliveryPartner" && (
                      <VehicleDetailsForm
                        onSubmit={lastStepHandlerasDeliverypartner}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </section> */}
    </Layout>
  );
};

export default LoginRegister;
