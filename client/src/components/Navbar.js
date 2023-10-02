import { useAppContext } from "../context/appContext";
import { useLocation, Link } from "react-router-dom";
// import { BtnUl } from "../assets/wrappers/NavbarWrapper";

const Navbar = () => {
  const { userState, logout } = useAppContext();
  const location = useLocation().pathname;
  return (
    <>
      <nav className="container-fluid">
        <ul>
          <li>
            <Link className="contrast" to="/">
              <strong>Textual Cryptography</strong>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            {location === "/" && userState.isAdmin ? (
              <Link to="/admin">
                <button className="contrast">Admin Panel</button>
              </Link>
            ) : userState.user ? (
              <strong>Welcome, {userState.user}</strong>
            ) : location === "/login" &&
              (!userState.isAdmin || !userState.user) ? (
              <Link to="/signup">
                <button className="contrast">Sign Up</button>
              </Link>
            ) : location === "/signup" &&
              (!userState.isAdmin || !userState.user) ? (
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
            {userState.user && (
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
