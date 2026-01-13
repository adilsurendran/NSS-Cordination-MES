import mongoose, { Schema } from "mongoose";

const LoginSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // will store bcrypt hash
  role: { type: String, required: true }, // e.g. 'admin', 'user'
  status: { type: Boolean, default: true }, // e.g. 'admin', 'user'

  resetOtp: String,
  resetOtpExpire: Date,
});

const LOGIN = mongoose.model("Login", LoginSchema);
export default LOGIN;
 