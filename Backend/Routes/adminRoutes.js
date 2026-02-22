import express from "express";
import { addCoordinator, deletecord, editcordinator, forgotPassword, getAllComplaints, getAllCoordinators, getperformance, getstudents, replyToComplaint, resetPassword,  } from "../Controllers/adminController.js";

const  adminrouter = express.Router();

adminrouter.post("/newcordinator",addCoordinator );
adminrouter.get("/getcord", getAllCoordinators);
adminrouter.put("/editcord/:id", editcordinator);
adminrouter.delete("/delete/:id", deletecord);
adminrouter.get("/complaints", getAllComplaints);
adminrouter.put("/complaints/reply/:id", replyToComplaint);
adminrouter.get("/students", getstudents);
adminrouter.get("/performance", getperformance);
adminrouter.post("/forgot-password", forgotPassword);
adminrouter.put("/reset-password", resetPassword);


export default adminrouter;
