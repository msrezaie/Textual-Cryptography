import { useState } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { ThemeSwitch, NavbarWrapper } from "../assets/wrappers/NavbarWrapper";

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
      <NavbarWrapper className="container-fluid">
        <ul>
          <li>
            <Link className="contrast" to="/">
              <strong>TextCrypt</strong>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            {isAdmin ? (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? "contrast active" : "contrast"
                }
              >
                <strong>Admin Dashboard</strong>
              </NavLink>
            ) : userEmail && !isAdmin ? (
              <NavLink
                to="/user"
                className={({ isActive }) =>
                  isActive ? "contrast active" : "contrast"
                }
              >
                <strong>User Dashboard</strong>
              </NavLink>
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
      </NavbarWrapper>
      <ThemeSwitch>
        <i className="fa-solid fa-moon"></i>
        <input type="checkbox" role="switch" onClick={toggleDarkMode} />
        <i className="fa-solid fa-sun"></i>
      </ThemeSwitch>
    </>
  );
};
export default Navbar;
