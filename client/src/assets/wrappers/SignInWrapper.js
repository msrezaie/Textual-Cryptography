import styled from "styled-components";

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 8rem);

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

const SigninFieldset = styled.fieldset`
  ul {
    display: flex;
    padding: 0;
    margin: 0;
    justify-content: space-between;
  }
  li {
    margin: 0;
    list-style: none;
  }
`;

const AnchorBtn = styled.div`
  .a-btn {
    background: none;
    border: none;
    box-shadow: none;
    color: teal;
    outline: none;
    padding-bottom: 0;
  }
  .a-btn:hover {
    color: var(--contrast);
  }
`;

export { MainWrapper, SigninFieldset, AnchorBtn };
