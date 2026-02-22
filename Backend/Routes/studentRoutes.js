import express from "express";
import { getallevents, getEventPhotosForStudent, getStudentAttendance, getStudentComplaints, getStudentPerformans, notifications, postComplaint, postfeedback, registerStudent } from "../Controllers/studentController.js";
import { uploadStudent } from "../middleware/uploadStudent.js";

const  studentrouter = express.Router();

studentrouter.post("/register",uploadStudent.single("photo"),registerStudent)
studentrouter.get("/events",getallevents)
studentrouter.get("/events/:eventId/photos", getEventPhotosForStudent);
studentrouter.post("/feedback",postfeedback)
studentrouter.post("/complaint",postComplaint)
studentrouter.get("/complaints/:studentId",getStudentComplaints)
studentrouter.get("/attendance/:studentId",getStudentAttendance)
studentrouter.get("/getperformance/:studentId",getStudentPerformans)
studentrouter.get("/notifications/:regYear",notifications)

export default studentrouter;
