import express from "express";
import { addCoordinator, deletecord, editcordinator, getAllComplaints, getAllCoordinators, getperformance, getstudents, replyToComplaint,  } from "../Controllers/adminController.js";

const  adminrouter = express.Router();

adminrouter.post("/newcordinator",addCoordinator );
adminrouter.get("/getcord", getAllCoordinators);
adminrouter.put("/editcord/:id", editcordinator);
adminrouter.delete("/delete/:id", deletecord);
adminrouter.get("/complaints", getAllComplaints);
adminrouter.put("/complaints/reply/:id", replyToComplaint);
adminrouter.get("/students", getstudents);
adminrouter.get("/performance", getperformance);

export default adminrouter;
