import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { ThemeSwitch } from "../assets/wrappers/NavbarWrapper";

const Navbar = () => {
  const { userEmail, isAdmin, logout } = useAppContext();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation().pathname;

  const toggleDarkMode = () => {
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);

    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
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
                <strong>Admin Dashboard</strong>
              </Link>
            ) : !location.startsWith("/user") && userEmail && !isAdmin ? (
              <Link to="/user" className="contrast">
                <strong>Profile</strong>
              </Link>
            ) : location === "/login" && (!isAdmin || !userEmail) ? (
              <Link to="/signup" className="contrast">
                <strong>Sign Up</strong>
              </Link>
            ) : location === "/signup" && (!isAdmin || !userEmail) ? (
              <Link to="/login" className="contrast">
                <strong>Login</strong>
              </Link>
            ) : (
              !userEmail && (
                <Link to="/login" className="contrast">
                  <strong>Login</strong>
                </Link>
              )
            )}
          </li>
          {userEmail && (
            <li>
              <Link onClick={logout} className="contrast">
                <strong>Logout</strong>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <ThemeSwitch>
        <i className="fa-solid fa-moon"></i>
        <input
          style={{ margin: "0px 3px 5px 3px" }}
          type="checkbox"
          role="switch"
          onClick={toggleDarkMode}
        />
        <i className="fa-solid fa-sun"></i>
      </ThemeSwitch>
    </>
  );
};
export default Navbar;
