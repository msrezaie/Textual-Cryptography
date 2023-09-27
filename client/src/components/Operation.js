import styled from "styled-components";
import { Keys, Selection, Inputs } from "./";

const Wrapper = styled.article`
  margin-bottom: 0;
  header {
    text-align: center;
  }
  h3 {
    margin-bottom: 0;
  }
  select,
  input {
    max-width: 50%;
    height: 40px;
    padding: 0 5px;
    margin: 0;
    font-size: 0.8rem;
  }
`;

const Operation = () => {
  return (
    <>
      <Wrapper>
        <header>
          <h4>Encryptor/Decryptor</h4>
        </header>
        <div className="grid">
          <Selection />
          <Keys />
        </div>
        <div className="grid">
          <Inputs />
        </div>
      </Wrapper>
    </>
  );
};
export default Operation;
