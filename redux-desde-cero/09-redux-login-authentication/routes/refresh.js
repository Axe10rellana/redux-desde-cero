//express
import express from "express";

//controllers
import { handleRefreshToken } from "../controllers/refreshTokenController.js";

//variables
const router = express.Router();

//routes
router.get("/", handleRefreshToken);

export default router;
