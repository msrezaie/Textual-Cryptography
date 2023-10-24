import styled from "styled-components";

const ThemeSwitch = styled.div`
  i {
    color: var(--contrast-inverse);
  }

  display: block;
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 30px;
  background-color: var(--contrast);
  padding: 8px;
`;

export { ThemeSwitch };
