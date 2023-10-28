import express from "express";
import { test, updateUser } from "../Controllers/user.controller.js";
import { verifyToken } from "../Utils/verifyUser.js";

const userRouter = express.Router();

userRouter.get("/test", test);
userRouter.post("/update/:id", verifyToken, updateUser);

export default userRouter;
