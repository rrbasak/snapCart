//key--> like OTP

import twilio from 'twilio';

export const sendSMS = (mobileNo,message,key)=>{
  console.log(mobileNo);
  const client = new twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  // Ensure mobileNo is a string
  const formattedMobileNo = String(mobileNo);
  return client.messages
    .create({
      body: message+` ${key}`,
      to: formattedMobileNo, // Text your number
      from: process.env.TWILIO_PHONE_NUMBER, // From a valid Twilio number
    })
    .then((message) => {
      console.log(message, "Message Sent")
    })
    .catch((error) => {
      console.log(error, "Message Not Sent");
    });
}