import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/user.route.js";
import authRouter from "./Routes/auth.route.js";
import listingRouter from "./Routes/listing.route.js";

dotenv.config();

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
  //! აქ ვამოწმებთ თუ error-ში გვაქვს statusCode მაშინ ეგ ამოგვაქვს და თუ არ არის მაშინ ვტოვებთ სერვერის ერორს რომელიც არის code 500

  // --------------------
  const message = err.message || "Internal Server Error";
  //! აქ ვამოწმებთ თუ error-ში გვაქვს message მაშინ ამოგვაქვს ეგ და თუ არ არის მაშინ უბრალოდ ვტოვებთ ჩვენს მიერ შექმნილ მესიჯს, რაც უკვე სტრინგში გვიწერია

  return res.status(statusCode).json({
    //! ამ ჯეისონში ჩვენ სტატუსის სახით ვწერთ ზემოთ მოცემულ statusCode-ს და შემდეგ ფროფერთიებს, რომლებიც გვაქვს მოცემული უკვე მასში
    success: false,
    statusCode,
    message,
  });
});
