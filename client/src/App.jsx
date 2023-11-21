import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./Pages/CreateListing";
import UpdateListing from "./Pages/UpdateListing";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/sign-in"
            element={<SignIn />}
          />
          <Route
            path="/sign-up"
            element={<SignUp />}
          />
          <Route element={<PrivateRoute />}>
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="/create-listing"
              element={<CreateListing />}
            />
            <Route
              path="/update-listing/:listingId"
              element={<UpdateListing />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
