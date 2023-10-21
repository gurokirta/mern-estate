import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../Redux/User/userSlice.js";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const { error, isLoading } = useSelector(state => state.user);

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {isLoading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an Account ?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-700 mt-5">{error}</p>}
    </div>
  );
}
