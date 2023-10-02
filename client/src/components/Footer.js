import FooterWrapper from "../assets/wrappers/FooterWrapper";

const Footer = () => {
  return (
    <FooterWrapper className="container-fluid">
      <ul>
        <li>
          <a
            className="contrast"
            href="https://www.linkedin.com/in/msrezaie/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-linkedin fa-2xl"></i>
          </a>
        </li>
        <li>
          <a
            className="contrast"
            href="https://github.com/msrezaie"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-square-github fa-2xl"></i>
          </a>
        </li>
        <li>
          <span>My Portfolio: </span>
          <a
            href="https://msrezaieportfolio.onrender.com/"
            target="_blank"
            rel="noreferrer"
          >
            MSREZAIE
          </a>
        </li>
      </ul>
    </FooterWrapper>
  );
};

export default Footer;
