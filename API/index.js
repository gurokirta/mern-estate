import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

app.listen(3000, () => {
  console.log("Server is running on 3000 port");
});
