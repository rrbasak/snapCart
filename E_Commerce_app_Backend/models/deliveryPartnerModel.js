import mongoose from "mongoose";

const DeliveryPartnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
      default: "6666666666",
    },
    address: {
      type: String,
      required: false,
      default: "A",
    },
    role: {
      type: Number,
      default: 2,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    photo: {
      data: Buffer, //data--Buffer for docs
      contentType: String,
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["Bike", "Scooter", "Bicycle"],
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    vehicleColor: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    drivingLicenseNumber: {
      type: String,
      required: true,
    },
    insuranceProvider: {
      type: String,
      required: true,
    },
    policyNumber: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    drivingLicenseFile: {
      data: Buffer,
      contentType: String,
      // required: true,
    },
    vehicleRegistrationFile: {
      data: Buffer,
      contentType: String,
      // required: true,
    },
    insuranceFile: {
      data: Buffer,
      contentType: String,
      // required: true,
    },
    status: {
      type: String,
      default: "Offline",
      enum: ["Online", "Offline"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("DeliveryPartner", DeliveryPartnerSchema);
