//express
import express from "express";

//controllers
import { handleLogin } from "../controllers/authController.js";

//variables
const router = express.Router();

//routes
router.post("/", handleLogin);

export default router;
