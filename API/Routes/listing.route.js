import express from "express";
import { createListing } from "../Controllers/listing.controller.js";
import { verifyToken } from "../Utils/verifyUser.js";

const listingRouter = express.Router();

listingRouter.post("/create", verifyToken, createListing);

export default listingRouter;
