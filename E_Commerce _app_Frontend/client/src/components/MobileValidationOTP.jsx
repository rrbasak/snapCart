/* eslint-disable jsx-a11y/anchor-is-valid */
// import axios from "axios";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";
import { useAuth } from "../context/auth";
// import { Link } from "react-router-dom";

//function
const mask = (value) => {
  ////console.log(value);
  if (value.includes("@")) {
    // Mask email address
    const [localPart, domain] = value.split("@");
    const maskedLocalPart =
      localPart.slice(0, 2) +
      "*".repeat(localPart.length - 4) +
      localPart.slice(-2);
    return `${maskedLocalPart}@${domain}`;
  } else {
    // Mask phone number
    value = value.slice(3);
    ////console.log(value)
    if (value.length === 10) {
      return value.slice(0, 3) + "****" + value.slice(-3);
    } else {
      throw new Error(
        "Invalid phone number length. Phone number should be 10 digits."
      );
    }
  }
};

export default function MobileValidationOTP({ to, userId, email, mobile, nextPage }) {
  console.log(userId);
  console.log(to);
  console.log(email);
  // const [auth, setAuth] = useAuth();
  const [disable, setDisable] = useState(true);
  const [timerCount, setTimer] = useState(120);
  const [otp, setOtp] = useState("");
  const maskedTo = mask(to || mobile);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disable]);

  const handleOtpChange = (otp) => {
    setOtp(otp);
    if (otp.length === 4) {
      handleSubmit(otp);
    }
  };

  const handleSubmit = async (otp) => {
    ////console.log("otp",otp);
    ////console.log("OTP",OTP);

    // if (otp === OTP) {
    //   ////console.log("reset");
    //   nextPage();
    //   return;
    // } else {
    //   alert(
    //     "The code you have entered is not correct, try again or re-send the link"
    //   );
    //   return;
    // }

    try {
      const res = await axios.post("/api/v1/auth/verify-sms-otp", {
        userId: userId || email,
        otp,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        nextPage();
        return;
      } else {
        toast.error(res.data.message || "Verification failed", {
          icon: "⚠️",
          style: {
            background: "#fff9c4",
            color: "#000",
          },
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        icon: "⚠️",
        style: {
          background: "#f8d7da",
          color: "#721c24",
        },
      });
      console.error("Error:", error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const handleResendOtp = () => {
    // handle resend OTP logic here
    //console.log("Resend OTP clicked");
  };

  const resendOTP = () => {
    emailHandller().then(() => {
      setDisable(true);
      setTimer(120);
    });
  };

  const emailHandller = async () => {
    try {
      const id = userId || email;
      const res = await axios.post("/api/v1/auth/resend-otp", {
        userId: id,
        email: to,
        mobile: mobile,
      });
      //console.log(res);
      if (res && res.data.success) {
        toast.success(res.data.message);
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
      toast.error("Something went wrongg");
      console.error("Error:", error.message);
    }
  };

  const formatTime = (time) => {
    if (time === 120) return "2 min";
    if (time > 60) {
      const seconds = time % 60;
      return `1:${seconds < 10 ? "0" : ""}${seconds} min`;
    }
    return `${time} sec`;
  };
  return (
    <div>
      <div className="text-center mb-3">
        <h1>Enter The Code</h1>
        <p>
          Enter the code that we sent to{" "}
          <span style={{ color: "blue" }}>{maskedTo}</span>. Be careful not to
          share the code with anyone.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <OtpInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={4}
          isInputNum={true}
          inputStyle={{
            height: "3rem",
            width: "3rem",
            margin: "0 0.2rem",
            fontSize: "1.5rem",
            borderRadius: "15px",
            border: "1px solid #ced4da",
          }}
          shouldAutoFocus
          renderInput={(props) => (
            <input
              {...props}
              type="tel"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
            />
          )}
          placeholder="1234"
        />
      </div>

      <div className="text-center">
        <p>Didn't recieve code?</p>{" "}
        <a
          className="flex flex-row items-center"
          style={{
            color: disable ? "gray" : "blue",
            cursor: disable ? "none" : "pointer",
            textDecorationLine: disable ? "none" : "underline",
          }}
          onClick={!disable ? resendOTP : null}
        >
          {disable ? `Resend OTP in ${formatTime(timerCount)}` : "Resend OTP"}
        </a>
      </div>
    </div>
  );
}
