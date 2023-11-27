import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaArrowLeft,
  FaArrowRight,
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaChair,
  FaParking,
} from "react-icons/fa";

import Contact from "../components/Contact";

export default function Listing() {
  const { currentUser } = useSelector(state => state.user);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contact, setContact] = useState(false);
  const params = useParams();

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? listing.imageUrls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === listing.imageUrls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/getListing/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading ...</p>}
      {error && <p className="text-center my-7 text-2xl">Something went wrong</p>}
      {listing && !loading && !error && (
        <div className="relative group">
          <div
            className="h-[550px]"
            style={{
              backgroundImage: `url(${listing.imageUrls[currentIndex]})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <FaArrowLeft
              onClick={prevSlide}
              size={30}
            />
          </div>
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <FaArrowRight
              onClick={nextSlide}
              size={30}
            />
          </div>
        </div>
      )}
      <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
        <FaShare
          className="text-slate-500"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
        />
      </div>
      {copied && (
        <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
          Link copied!
        </p>
      )}
      <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
        <p className="text-2xl font-semibold">
          {listing?.name} - ${" "}
          {listing?.offer
            ? listing?.discountPrice.toLocaleString("en-US")
            : listing?.regularPrice.toLocaleString("en-US")}
          {listing?.type === "rent" && " / month"}
        </p>
        <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
          <FaMapMarkerAlt className="text-green-700" />
          {listing?.address}
        </p>
        <div className="flex gap-4">
          <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
            {listing?.type === "rent" ? "For Rent" : "For Sale"}
          </p>
          {listing?.offer && (
            <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
              ${+listing?.regularPrice - +listing?.discountPrice} OFF
            </p>
          )}
        </div>
        <p className="text-slate-800">
          <span className="font-semibold text-black">Description - </span>
          {listing?.description}
        </p>
        <ul className="text-green-800 font-semibold text-xs flex flex-wrap items-center gap-4 sm:gap-6 ">
          <li className="flex gap-1 items-center whitespace-nowrap">
            <FaBed className="text-lg" />
            {listing?.bedrooms > 1
              ? `${listing?.bedrooms} Beds `
              : `${listing?.bedrooms} Bed`}
          </li>
          <li className="flex gap-1 items-center whitespace-nowrap">
            <FaBath className="text-lg" />
            {listing?.bathroom > 1
              ? `${listing?.bathrooms} Baths`
              : `${listing?.bathrooms} Bath`}
          </li>
          <li className="flex gap-1 items-center whitespace-nowrap">
            <FaParking className="text-lg" />
            {listing?.parking ? "Parking spot" : "No Parking"}
          </li>
          <li className="flex gap-1 items-center whitespace-nowrap">
            <FaChair className="text-lg" />
            {listing?.furnished ? "Furnished" : "Unfurnished"}
          </li>
        </ul>
        {currentUser && listing?.userRef !== currentUser._id && !contact && (
          <button
            onClick={() => setContact(true)}
            className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
          >
            Contact To Owner
          </button>
        )}
        {contact && <Contact listing={listing} />}
      </div>
    </main>
  );
}
