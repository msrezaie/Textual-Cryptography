import styled from "styled-components";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 7rem);
  padding: 1rem 0;
  @media (min-width: 768px) {
    max-width: 60%;
  }
  @media (min-width: 992px) {
    max-width: 50%;
  }
  @media (min-width: 1200px) {
    max-width: 35%;
  }
`;

export default Wrapper;
