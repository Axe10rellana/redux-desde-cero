//dirname
import * as url from "url";

//date-fns
import { format } from "date-fns";

//uuid
import { v4 as uuid } from "uuid";

//fs
import fs from "fs";
import fsPromises from "fs/promises";

//path
import path from "path";

//variables
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

//functions
export const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};

export const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.info(`${req.method} ${req.path}`);
  next();
};
