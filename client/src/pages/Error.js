import styled from "styled-components";

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-height: calc(100vh - 9rem);
`;

const Error = () => {
  return (
    <MainWrapper className="container">
      <article>
        <h5>404</h5>
        <p>Page Not Found!</p>
      </article>
    </MainWrapper>
  );
};
export default Error;
