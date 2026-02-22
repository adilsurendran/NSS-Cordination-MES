// import mongoose, { Schema } from "mongoose";

// const eventScheama = new Schema({
//   name: { type: String, required: true },
//   date: { type: String, required: true },
//   time: { type: String, required: true },
//   place: { type: String, required: true },
// }, { timestamps: true });

// const EVENT = mongoose.model("Event", eventScheama);
// export default EVENT


import mongoose, { Schema } from "mongoose";

const eventScheama = new Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    place: { type: String, required: true },

    // ✅ NEW: photos array
    photos: [
      {
        filename: { type: String, required: true }, // actual filename on disk
        url: { type: String, required: true },      // accessible URL
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const EVENT = mongoose.model("Event", eventScheama);
export default EVENT;
