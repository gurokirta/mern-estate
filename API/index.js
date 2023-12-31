import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/user.route.js";
import authRouter from "./Routes/auth.route.js";
import listingRouter from "./Routes/listing.route.js";
import path from "path";

dotenv.config();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("connected to DB");
  })
  .catch(err => {
    console.log(err, "error");
  });

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on 3000 port");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
