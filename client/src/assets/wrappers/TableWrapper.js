import styled from "styled-components";

const BtnWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 0;

  li {
    list-style: none;
    padding: 0 5px;
  }

  button {
    padding: 2px 5px;
    margin-bottom: 0;
  }
`;

export { BtnWrapper };
