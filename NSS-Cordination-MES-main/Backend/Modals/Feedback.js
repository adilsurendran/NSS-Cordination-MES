import mongoose, { Schema } from "mongoose";

const FeedbackSchema = new Schema(
  {
    feedback: { type: String, required: true },

    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true
    }
  },
  { timestamps: true } // ✅ adds createdAt & updatedAt
);

const FEEDBACK = mongoose.model("Feedback", FeedbackSchema);
export default FEEDBACK;
