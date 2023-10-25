import { NavLink } from "react-router-dom";

const SideBarNav = ({ links }) => {
  return (
    <figure>
      <div className="nav-links">
        {links.map((link) => {
          const { id, text, path } = link;
          return (
            <NavLink
              key={id}
              to={path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              end
            >
              <div className="contrast">
                <strong>{text}</strong>
              </div>
            </NavLink>
          );
        })}
      </div>
    </figure>
  );
};

export default SideBarNav;
