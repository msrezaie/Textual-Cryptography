import styled from "styled-components";

const Wrapper = styled.main`
  max-width: 98%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .buttons {
    max-width: 50%;
  }
  header {
    text-align: center;
  }
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  li {
    display: inline;
  }
`;

export default Wrapper;
