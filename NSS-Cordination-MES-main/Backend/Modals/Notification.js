import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    batches: [
      {
        type: String,
        required: true,
      },
    ],
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const NOTIFICATION = mongoose.model("Notification", notificationSchema);
export default NOTIFICATION;
