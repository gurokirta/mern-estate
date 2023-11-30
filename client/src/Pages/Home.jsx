import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function Home() {
  const [listingsOffer, setListingsOffer] = useState([]);
  const [listingsRent, setListingsRent] = useState([]);
  const [listingsSale, setListingsSale] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const itemIndex = [];
  for (let i = 0; i < listingsRent.length; i++) {
    itemIndex.push(listingsRent[i].imageUrls[0]);
  }

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? itemIndex.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === itemIndex.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/getListings?offer=true&limit=4");
        const data = await res.json();
        setListingsOffer(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/getListings?type=rent&limit=4");
        const data = await res.json();
        setListingsRent(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/getListings?type=sale&limit=4");
        const data = await res.json();
        setListingsSale(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 text-3xl lg:text-6xl font-bold">
          Discover Your <span className="text-slate-500">Dream</span> <br />
          Home
        </h1>
        <div className="text-slate-400 text-xs sm:text-sm">
          <p className="">
            Are you on the quest to find your perfect home, a space that resonates
            with your lifestyle and aspirations? <br />
            Your dream home awaits, where every room tells a story, and each corner
            reflects your unique taste.
          </p>
        </div>
        <Link
          to={"/search"}
          className="text-blue-800 text-xs sm:text-sm hover:underline font-bold"
        >
          Let`s get started ...
        </Link>
      </div>
      <div className="relative group">
        <div
          className="h-[400px]"
          style={{
            backgroundImage: `url(${itemIndex[currentIndex]})`,
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
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {listingsOffer && listingsOffer.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="font-semibold text-2xl text-slate-700">
                Recent offers
              </h2>
              <Link
                to={"/search?offer=true"}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {listingsOffer.map(listing => (
                <ListingItem
                  key={listing._id}
                  listing={listing}
                />
              ))}
            </div>
          </div>
        )}
        {listingsRent && listingsRent.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="font-semibold text-2xl text-slate-700">
                Recent places for rent
              </h2>
              <Link
                to={"/search?type=rent"}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {listingsRent.map(listing => (
                <ListingItem
                  key={listing._id}
                  listing={listing}
                />
              ))}
            </div>
          </div>
        )}
        {listingsSale && listingsSale.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="font-semibold text-2xl text-slate-700">
                Recent places for sale
              </h2>
              <Link
                to={"/search?type=sale"}
                className="text-sm text-blue-800 hover:underline"
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {listingsSale.map(listing => (
                <ListingItem
                  key={listing._id}
                  listing={listing}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
