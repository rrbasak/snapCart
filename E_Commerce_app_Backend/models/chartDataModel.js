import mongoose from "mongoose";

const ChartDataSchema = new mongoose.Schema({
  category: [String], // Months or time periods
  mobileApps: [Number],
  websites: [Number],
  date: { type: Date, default: Date.now },
});

export default mongoose.model("ChartData", ChartDataSchema);
