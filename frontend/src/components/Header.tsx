import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className=" bg-black py-6">
      <div className={isLoggedIn?`container mx-auto md:flex space-y-6 md:space-y-0 justify-between`:`container mx-auto flex md:space-y-0 justify-between`}>
        <span className="text-3xl text-white font-extrabold tracking-tight">
          <Link to="/">OneUtil</Link>
        </span>

        <div >
          <span className="flex space-x-2">
            {isLoggedIn ? (
              <>
                <Link to="/my-bookings" className="text-white flex items-center px-1 lg:px-3 font-bold hover:bg-gray-700">My Bookings</Link>
                <Link to="/my-services" className="text-white flex items-center px-1 lg:px-3 font-bold hover:bg-gray-700">My Services</Link>
                <Link to="/service-bookings" className="text-white flex items-center px-1 lg:px-3 font-bold hover:bg-gray-700">My Service Bookings</Link>
                <SignOutButton />
              </>
            ) : (
              <Link
                to="/sign-in"
                className="flex bg-white items-center text-black px-4 py-2 font-bold hover:bg-gray-400"
              >
                Sign In
              </Link>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
