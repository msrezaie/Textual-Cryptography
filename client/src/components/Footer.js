import styled from "styled-components";

const Wrapper = styled.footer`
  li {
    display: inline;
    padding: 0 3px;
  }
`;

const Footer = () => {
  return (
    <Wrapper className="container-fluid">
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
          <span>Developer: </span>
          <a
            href="https://msrezaieportfolio.onrender.com/"
            target="_blank"
            rel="noreferrer"
          >
            MSREZAIE
          </a>
        </li>
      </ul>
    </Wrapper>
  );
};

export default Footer;
