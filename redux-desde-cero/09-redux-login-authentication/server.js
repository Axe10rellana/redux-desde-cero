//dotenv
import dotenv from "dotenv";

//dirname
import * as url from "url";

//express
import express from "express";

//cors
import cors from "cors";

//cookie parser
import cookieParser from "cookie-parser";

//path
import path from "path";

//mongoose
import mongoose from "mongoose";

//middlewares
import { logger } from "./middleware/logEvents.js";
import errorHandler from "./middleware/errorHandler.js";
import verifyJWT from "./middleware/verifyJWT.js";
import credentials from "./middleware/credentials.js";

//config
import { PORT } from "./config/config.js";
import corsOptions from "./config/corsOptions.js";
import connectDB from "./config/dbConn.js";

//routes
import root from "./routes/root.js";
import register from "./routes/register.js";
import auth from "./routes/auth.js";
import refresh from "./routes/refresh.js";
import logout from "./routes/logout.js";
import employees from "./routes/api/employees.js";

//variables
connectDB();
dotenv.config();
const app = express();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

//custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.use("/", root);
app.use("/register", register);
app.use("/auth", auth);
app.use("/refresh", refresh);
app.use("/logout", logout);

app.use(verifyJWT);
app.use("/employees", employees);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

//server
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
