import styled from "styled-components";

const BtnsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-bottom: 20px;

  @media (min-width: 992px) {
    flex-direction: column;
  }

  button {
    padding: 5px 5px;
    margin: 10px;
    width: 130px;
  }
`;

const KeysWrapper = styled.div`
  .twoKeys {
    display: flex;
    flex-direction: column;
  }

  .twoKeys input {
    max-width: 100%;
    padding: 0 10px;
    margin: 5px 0;
  }

  input {
    max-width: 100%;
    height: 40px;
    font-size: 0.9rem;
  }

  @media (min-width: 576px) {
    .twoKeys {
      display: flex;
      flex-direction: row;
    }

    .twoKeys input {
      max-width: 50%;
      padding: 10px;
      margin-right: 10px;
    }

    input {
      max-width: 50%;
      height: 40px;
      font-size: 0.9rem;
    }
  }
`;

export { BtnsWrapper, KeysWrapper };
