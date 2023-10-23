/* eslint-disable react/jsx-no-undef */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import OAuth from "../components/Oauth.jsx";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { username, email, password } = formData;

  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        setError(data.message);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={username}
          placeholder="Username"
          id="username"
          className="border rounded-lg p-3 focus:outline-none"
          onChange={handleChange}
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          id="email"
          className="border rounded-lg p-3 focus:outline-none"
          onChange={handleChange}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          id="password"
          className="border rounded-lg p-3 focus:outline-none"
          onChange={handleChange}
        />

        <button
          disabled={isLoading}
          className="bg-slate-700
          rounded-lg
          p-3 uppercase
        text-white hover:opacity-70 
          disabled:opacity-90"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an Account ?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-700 mt-5">{error}</p>}
    </div>
  );
}
