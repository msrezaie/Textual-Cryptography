import styled from "styled-components";

const MainWrapper = styled.main`
  max-width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .buttons {
    max-width: 50%;
  }
  header {
    text-align: center;
  }
`;

const BtnWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  li {
    list-style: none;
    padding: 0 5px;
  }

  button {
    padding: 2px 5px;
    margin-bottom: 0;
  }
`;

export { MainWrapper, BtnWrapper };
