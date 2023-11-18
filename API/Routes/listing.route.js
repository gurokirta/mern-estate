import express from "express";
import { createListing, deleteListing } from "../Controllers/listing.controller.js";
import { verifyToken } from "../Utils/verifyUser.js";

const listingRouter = express.Router();

listingRouter.post("/create", verifyToken, createListing);
listingRouter.delete("/delete/:id", verifyToken, deleteListing);

export default listingRouter;
