import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  ////console.log("password", password);
  try {
    // if (typeof password !== "string") {
    //   throw new Error("Password must be a string");
    // }
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  } catch (error) {
    ////console.log(error);
  }
};
export const hashOTP = async (otp) => {
  try {
    const saltRound = 10;
    const hashedotp = await bcrypt.hash(otp, saltRound);
    return hashedotp;
  } catch (error) {
    ////console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    ////console.log("Comparing passwords:", password, hashedPassword);

    // Ensure password is a string
    if (typeof password !== "string") {
      throw new Error("Password must be a string");
    }

    const match = await bcrypt.compare(password, hashedPassword);
    ////console.log("Password comparison result:", match);

    return match;
  } catch (error) {
    ////console.log("Error comparing passwords:", error);
    throw new Error("Error comparing passwords");
  }
};
export const compareOTP = async (otp, hashedotp) => {
  try {
    if (typeof otp !== "string") {
      throw new Error("OTP must be a string");
    }
    const match = await bcrypt.compare(otp, hashedotp);
    return match;
  } catch (error) {
    throw new Error("Error comparing otp", error);
  }
};
