import express from "express";
import { addEventPhotos, addPerformance, approvestd, deleteevent, deleteEventPhoto, editevent, fetchallevents, getAllFeedback, getallpending, getAllPerformances, getAttendanceByEvent, getEventPhotos, getVerifiedStudents, newevent, notification, rejectstd, updateAttendance } from "../Controllers/cordinatorController.js";
import { getallevents } from "../Controllers/studentController.js";
import { uploadEventPhotos } from "../middleware/uploadStudent.js";

const  cordinatorrouter = express.Router();

cordinatorrouter.post("/addevent", newevent);
cordinatorrouter.get("/allevent", fetchallevents);
cordinatorrouter.put("/editevent/:id", editevent);
cordinatorrouter.delete("/delete/:id",deleteevent);
cordinatorrouter.get('/allpending',getallpending);
cordinatorrouter.put('/approve/:id',approvestd);
cordinatorrouter.put('/reject/:id',rejectstd);
cordinatorrouter.get('/viewfeedback',getAllFeedback);
cordinatorrouter.get('/eventsall',getallevents);
cordinatorrouter.get('/studentsall',getVerifiedStudents);
// cordinatorrouter.post('/attendance',markAttendance);
cordinatorrouter.post('/addperformance',addPerformance);
cordinatorrouter.get('/performances',getAllPerformances);
cordinatorrouter.post('/sendnotification',notification);

cordinatorrouter.get('/attendance/:eventId', getAttendanceByEvent);
cordinatorrouter.post('/attendance/update', updateAttendance)


cordinatorrouter.post(
  "/events/:eventId/photos",
  uploadEventPhotos.array("photos", 10),
  addEventPhotos
);

cordinatorrouter.get("/events/:eventId/photos", getEventPhotos);

cordinatorrouter.delete("/events/:eventId/photos/:photoId", deleteEventPhoto);
export default cordinatorrouter;
