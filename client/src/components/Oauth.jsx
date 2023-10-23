import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

import { useDispatch } from "react-redux";
import { signInSuccess } from "../Redux/User/userSlice";

export default function Oauth() {
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          photo: result.user.photoURL,
          email: result.user.email,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log("Could not sign with google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleLoginWithGoogle}
      className="
    bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}
