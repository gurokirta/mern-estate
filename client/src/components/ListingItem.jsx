/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg overflow-hidden transition-shadow rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://firebasestorage.googleapis.com/v0/b/mern-estate-255c3.appspot.com/o/rowan-heuvel-gExKTQFX2aA-unsplash.jpg?alt=media&token=0595a433-b9cf-4acd-8d86-ee798be90d1f"
          }
          alt="Property Image"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="flex flex-col gap-2 p-3 w-full">
          <p className="font-semibold text-lg truncate text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="text-green-700 w-4 h-4" />
            <p className="truncate text-gray-600 text-sm w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-1">{listing.description}</p>
          <p className="text-slate-500 mt-2 font-semibold flex items-center">
            $
            {listing.offer
              ? listing?.discountPrice?.toLocaleString("en-US")
              : listing?.regularPrice?.toLocaleString("en-US")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="text-slate-600 flex gap-4">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Beds`
                : `${listing.bedrooms} Bed`}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Baths`
                : `${listing.bathrooms} Bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
