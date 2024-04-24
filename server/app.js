import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { join, dirname } from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const CONNECTION_URL = process.env.ATLAS_URL;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// serving static files | images
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads", express.static(join(__dirname, "uploads")));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use((err, req, res, next) => {
  const messae = err.messae || "Something went wrong.";
  const status = err.status || 500;
  res.status(status).json({ messae, status, success: false, stack: err.stack });
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("App is Working");
});

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`listening at port ${PORT}`)))
  .catch((err) =>
    console.log(
      `the error to connect to mongodb is ${err} and error message is ${err.message} `
    )
  );
