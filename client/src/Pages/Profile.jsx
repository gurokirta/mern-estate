import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector(state => state.user);
  return (
    <div className="p-3 max-w-xl mx-auto">
      <h1 className="font-semibold text-3xl text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <img
          src={currentUser.image}
          alt="Profile Picture"
          className="rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="p-3 rounded-lg border"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="p-3 rounded-lg border"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="p-3 rounded-lg border"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
