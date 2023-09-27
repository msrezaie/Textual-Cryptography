import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="container-fluid">
        <ul>
          <li>
            <Link className="contrast" to="/">
              <strong>Textual Cryptography</strong>
            </Link>
            {/* temporary */}
            <Link to="/admin">/admin</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
