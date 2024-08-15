import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className=" bg-black py-6">
      <div className=" container mx-auto flex justify-between">
        <span className="text-3xl text-white font-extrabold tracking-tight">
          <Link to="/">OneUtil</Link>
        </span>

        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings" className="text-white flex items-center px-3 font-bold hover:bg-gray-700">My Bookings</Link>
              <Link to="/my-services" className="text-white flex items-center px-3 font-bold hover:bg-gray-700">My Services</Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-black px-3 font-bold hover:bg-gray-400"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
