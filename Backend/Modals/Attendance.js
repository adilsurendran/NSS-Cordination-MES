import mongoose, { Schema } from "mongoose";

const AttendanceSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    present: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// ✅ Prevent duplicate attendance
AttendanceSchema.index({ eventId: 1, studentId: 1 }, { unique: true });

const ATTENDANCE = mongoose.model("Attendance", AttendanceSchema);
export default ATTENDANCE;
