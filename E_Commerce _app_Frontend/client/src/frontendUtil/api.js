import axios from "axios";

export const checkEmail = async (email) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/api/v1/check/check-email`,
    { email }
  );
  //console.log("response",response)
  return response.data.exists;
};

export const addEmail = async (email) => {
  await axios.post(`${process.env.REACT_APP_API}/api/v1/check/add-email`, {
    email,
  });
};
