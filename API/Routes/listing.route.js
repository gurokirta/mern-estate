import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
} from "../Controllers/listing.controller.js";
import { verifyToken } from "../Utils/verifyUser.js";

const listingRouter = express.Router();

listingRouter.post("/create", verifyToken, createListing);
listingRouter.delete("/delete/:id", verifyToken, deleteListing);
listingRouter.post("/update/:id", verifyToken, updateListing);
listingRouter.get("/getListing/:id", getListing);

export default listingRouter;
