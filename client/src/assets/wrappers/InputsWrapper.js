import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;

  @media (min-width: 992px) {
    flex-direction: column;
  }

  button {
    padding: 5px 5px;
    margin: 10px;
    width: 130px;
  }
`;

export default Wrapper;
