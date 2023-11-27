import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Contact({ listing }) {
  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState("");

  const handleChangeValue = e => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await fetch(`/api/user/${listing?.userRef}`);
        const data = await res.json();
        console.log(data);
        setOwner(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOwner();
  }, [listing?.userRef]);
  return (
    <div>
      {owner && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{owner.username} </span>
            for <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={e => handleChangeValue(e)}
            placeholder="Enter Your Message Here ..."
            className="w-full border rounded-lg p-3"
          ></textarea>
          <Link
            to={`mailto:${owner.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white p-3 w-full uppercase rounded-lg text-center hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </div>
  );
}
