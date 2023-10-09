import { useAppContext } from "../context/appContext";
import { useLocation, Link } from "react-router-dom";
// import { BtnUl } from "../assets/wrappers/NavbarWrapper";

const Navbar = () => {
  const { userName, isAdmin, logout } = useAppContext();
  const location = useLocation().pathname;
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
              <Link to="/admin">
                <button className="contrast">Admin Panel</button>
              </Link>
            ) : userName ? (
              <strong>Welcome, {userName}</strong>
            ) : location === "/login" && (!isAdmin || !userName) ? (
              <Link to="/signup">
                <button className="contrast">Sign Up</button>
              </Link>
            ) : location === "/signup" && (!isAdmin || !userName) ? (
              <Link to="/login">
                <button className="contrast">Login</button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="contrast">Login</button>
              </Link>
            )}
          </li>
          <li>
            {userName && (
              <button className="contrast" onClick={logout}>
                Logout
              </button>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
