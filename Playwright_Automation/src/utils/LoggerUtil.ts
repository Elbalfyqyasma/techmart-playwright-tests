import winston from "winston";
import path from "path";

const currentDir = __dirname;
const srcDir = path.resolve(currentDir, "..");
const loggingDir = path.resolve(srcDir, "logging");

// ✅ timezone from .env
const timeZone = process.env.TIMEZONE || "UTC";

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => new Date().toLocaleString("en-US", { timeZone }),
    }),
    customFormat,
  ),
  transports: [
    // ✅ colorized console
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(winston.format.colorize(), customFormat),
    }),
    // ✅ all logs
    new winston.transports.File({
      filename: path.join(loggingDir, "test_run.log"),
      maxFiles: 5,
      maxsize: 300 * 1024,
      level: "info",
    }),
    // ✅ errors only
    new winston.transports.File({
      filename: path.join(loggingDir, "test_error.log"),
      maxFiles: 5,
      maxsize: 10 * 1024,
      level: "error",
    }),
  ],
});

export default logger;
