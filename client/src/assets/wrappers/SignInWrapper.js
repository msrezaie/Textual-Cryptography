import styled from "styled-components";

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 7rem);

  @media (min-width: 768px) {
    max-width: 60%;
  }
  @media (min-width: 992px) {
    max-width: 50%;
  }
  @media (min-width: 1200px) {
    width: 600px;
  }
`;

const LoginFieldset = styled.fieldset`
  margin-bottom: 0;
  ul {
    display: flex;
    justify-content: space-between;
    white-space: nowrap;
    margin-bottom: 12px;
  }
  li {
    list-style: none;
  }
`;

export { MainWrapper, LoginFieldset };
