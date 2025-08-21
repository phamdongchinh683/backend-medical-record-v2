import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { corsOptions } from "./config/corsOption";
import { initializeDatabase } from "./config/database";
import router from "./routers";
import { nodeEnv, port } from "./utils/constants";

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("combined"));
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(router);

async function startServer() {
  try {
    await initializeDatabase();
    if (nodeEnv === "development") {
      app.listen(port, () => {
        console.log("swagger url", `http://localhost:${port}/docs`);
        console.log(
          `Server running at http://localhost:${port} in development mode`
        );
      });
    } else {
      app.listen(port, () => {
        console.log(
          `Server running at http://localhost:${port} in production mode`
        );
      });
    }
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
