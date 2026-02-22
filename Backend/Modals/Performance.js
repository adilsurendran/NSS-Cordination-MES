import mongoose, { Schema } from "mongoose";

const performanceSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      unique: true,   
    },
    participationLevel: {
      type: String,
      enum: ["Excellent", "Active", "Average", "Poor"], // optional validation
      required: true,
    },
    remarks: {
      type: String,
      default: "",
    },
    attendance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const PERFORMANCE = mongoose.model("Performance", performanceSchema);
export default PERFORMANCE;
