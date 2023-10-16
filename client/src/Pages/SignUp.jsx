import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border rounded-lg p-3 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border rounded-lg p-3 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border rounded-lg p-3 focus:outline-none"
        />

        <button
          className="bg-slate-700
          rounded-lg
          p-3 uppercase
        text-white hover:opacity-70 
          disabled:opacity-90"
        >
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className="">Have an Account ?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  );
}
