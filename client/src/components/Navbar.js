import { useAppContext } from "../context/appContext";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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
              <p>Welcome, {userState.user}</p>
            ) : (
              <Link to="/login">
                <button className="contrast">Login</button>
              </Link>
            )}
          </li>
          <li>
            {userState.user ? (
              <button className="contrast" onClick={logout}>
                Logout
              </button>
            ) : (
              <Link to="/register">
                <button className="contrast">Register</button>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
