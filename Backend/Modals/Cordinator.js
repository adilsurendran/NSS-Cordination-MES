// import mongoose, { Schema } from "mongoose";

// const coordinatorSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   department: { type: String },
//   cordinatorId: { type: String, required: true, unique: true }
// }, { timestamps: true });

// const CORDINATOR = mongoose.model("Coordinator", coordinatorSchema);
// export default CORDINATOR;

import mongoose, { Schema } from "mongoose";

const coordinatorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: String },
  cordinatorId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  commonKey: {
    type: Schema.Types.ObjectId,
    ref: "Login", // ✅ references Login collection
    required: true
  }
}, { timestamps: true });

const CORDINATOR = mongoose.model("Coordinator", coordinatorSchema);
export default CORDINATOR;
