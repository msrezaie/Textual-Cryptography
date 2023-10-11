import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Navbar = () => {
  const { userName, isAdmin, logout } = useAppContext();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation().pathname;

  const toggleDarkMode = () => {
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);

    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "light" : "dark"
    );
  };

  return (
    <>
      <nav className="container-fluid">
        <ul>
          <li>
            <Link className="contrast" to="/">
              <strong>TextCrypt</strong>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            {location === "/" && isAdmin ? (
              <Link to="/admin" className="contrast">
                <strong>Admin Panel</strong>
              </Link>
            ) : userName ? (
              <strong>Welcome, {userName}</strong>
            ) : location === "/login" && (!isAdmin || !userName) ? (
              <Link to="/signup" className="contrast">
                <strong>Sign Up</strong>
              </Link>
            ) : location === "/signup" && (!isAdmin || !userName) ? (
              <Link to="/login" className="contrast">
                <strong>Login</strong>
              </Link>
            ) : (
              <Link to="/login" className="contrast">
                <strong>Login</strong>
              </Link>
            )}
          </li>
          {userName && (
            <li>
              <Link onClick={logout} className="contrast">
                <strong>Logout</strong>
              </Link>
            </li>
          )}
          <li>
            <i className="fa-solid fa-moon"></i>
            <input
              style={{ margin: "0 5px 5px 3px" }}
              type="checkbox"
              role="switch"
              onClick={toggleDarkMode}
            />
            <i className="fa-solid fa-sun"></i>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
