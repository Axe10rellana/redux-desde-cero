//dirname
import * as url from "url";

//express
import express from "express";

//path
import path from "path";

//variables
const router = express.Router();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

//routes
router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

export default router;
