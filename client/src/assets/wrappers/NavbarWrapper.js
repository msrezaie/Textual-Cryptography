import styled from "styled-components";

const NavbarWrapper = styled.nav`
  .active {
    background-color: var(--contrast-focus);
  }
  li {
    margin: auto 3px;
  }
  .brand {
    font-size: 1.2rem;
  }
`;

const ThemeSwitch = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 30px;
  right: 30px;
  border-radius: 30px;
  background-color: var(--contrast);
  padding: 5px;

  i {
    color: var(--contrast-inverse);
    margin-top: 3px;
    padding: 0 3px;
  }

  input[type="checkbox"] {
    margin: 0;
  }
`;

export { ThemeSwitch, NavbarWrapper };
