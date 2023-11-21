import Listing from "../Models/listing.model.js";
import { errorHandler } from "../Utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing does not exist"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can delete only your own listing"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing does not exist"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can update only your own listing"));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, "Listing does not exist"));
    }

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
