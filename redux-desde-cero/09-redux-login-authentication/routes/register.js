//express
import express from "express";

//controllers
import { handleNewUser } from "../controllers/registerController.js";

//variables
const router = express.Router();

//routes
router.post("/", handleNewUser);

export default router;
