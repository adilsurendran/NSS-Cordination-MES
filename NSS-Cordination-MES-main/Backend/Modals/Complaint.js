import mongoose, { Schema } from "mongoose";

const ComplaintSchema = new Schema(
  {
    text: { 
      type: String, 
      required: true 
    },

    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    reply: {
      type: String,
      default: null
    },

    status: {
      type: String,
      default: "pending"
    }
  },
  { timestamps: true }
);

const COMPLAINT = mongoose.model("Complaint", ComplaintSchema);
export default COMPLAINT;
