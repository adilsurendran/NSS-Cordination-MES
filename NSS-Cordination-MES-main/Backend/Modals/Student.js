import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
  name: { type: String, required: true },
  className: { type: String, required: true },
  dob: { type: String, required: true },
  sex: { type: String, required: true },
  caste: { type: String, required: true },
  aadhar: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  blood: { type: String, required: true },
  talents: { type: String },
  interests: { type: String },
  password: { type: String, required: true },
  regYear: { type: String, required: true },
  photo: { type: String },
  commonKey: {
  type: Schema.Types.ObjectId,
  ref: "Login",
  required: true
}

}, { timestamps: true });

const STUDENT = mongoose.model("Student", studentSchema);
export default STUDENT;
