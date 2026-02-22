import express from "express";
import { loginUser } from "../Controllers/loginController.js";

const  router = express.Router();

router.post("/", loginUser);

export default router;
