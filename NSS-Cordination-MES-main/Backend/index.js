
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import router from "./Routes/loginRoutes.js";
import adminrouter from "./Routes/adminRoutes.js";
import cordinatorrouter from "./Routes/cordinatorRoutes.js";
import studentrouter from "./Routes/studentRoutes.js";



mongoose.connect("mongodb://localhost:27017/NSS")
.then(()=>{
    console.log("Database Connected");
})
.catch((e)=>{
    console.log(e); 
})

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:"*"}))
app.listen(8000,()=>{console.log("Server Started running port 8000");
})

app.use("/api/login", router);
app.use("/api/admin", adminrouter);
app.use("/api/cordinator", cordinatorrouter); 
app.use("/api/student",studentrouter)
// app.use("/upload",uploadStudent)
app.use("/uploads", express.static("uploads"));
