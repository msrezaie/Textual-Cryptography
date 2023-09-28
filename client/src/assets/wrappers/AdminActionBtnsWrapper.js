import styled from "styled-components";

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

export default BtnWrapper;
