import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProviders/AuthProvider";
import logo from "../../assets/letter-t.png";
const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .then(() => {});
  };
  return (
    <header aria-label="Site Header" className="border-b border-gray-100 p-2">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8">
        <Link to="/" className="flex">
          <span className="sr-only">Logo</span>
          <span className="inline-block h-10 rounded-lg bg-gray-200">
            <img src={logo} className="w-10" alt="logo" />
          </span>
        </Link>
        {!user?.email && (
          <Link
            to="/login"
            className="flex items-center h-10 p-4 rounded-lg cursor-pointer bg-gray-200  gap-4 text-xs font-bold uppercase tracking-wide text-gray-500 "
          >
            <p>please login to use the tool</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        )}
        <div className="flex items-center justify-end gap-4">
          <nav
            aria-label="Site Nav"
            className="flex gap-4 text-xs font-bold uppercase tracking-wide text-gray-500 "
          >
            {user?.email && (
              <>
                <NavLink
                  to="/dashboard/home"
                  className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-red-700"
                >
                  Dashboard
                </NavLink>{" "}
                <label
                  onClick={handleLogOut}
                  to="/dashboard/home"
                  className="block h-16 cursor-pointer border-b-4 border-transparent leading-[4rem] hover:border-current hover:text-red-700"
                >
                  LOGOUT
                </label>
                <p
                  to="/dashboard/home"
                  className="block h-16 border-b-4 border-transparent leading-[4rem] "
                >
                  {user?.displayName}
                </p>
              </>
            )}
          </nav>

          <div className="flex items-center">
            <div className="flex items-center  border-gray-100">
              {user ? (
                <img
                  src={user?.photoURL}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              ) : (
                <Link
                  to="/login"
                  className="grid h-16 w-16 place-content-center border-b-4 border-transparent hover:border-red-700"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>

                  <span className="sr-only"> Account </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
