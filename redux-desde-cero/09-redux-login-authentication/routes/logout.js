//express
import express from "express";

//controllers
import { handleLogout } from "../controllers/logoutController.js";

//variables
const router = express.Router();

//routes
router.get("/", handleLogout);

export default router;
