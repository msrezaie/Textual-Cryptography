import styled from "styled-components";

const UserWrapper = styled.div`
  .deltUsrBtn {
    width: 170px;
    background-color: #ff5c88;
    border-color: #ff5c88;
    color: whitesmoke;
    padding: 10px;
  }
`;

const ModalBox = styled.dialog`
  backdrop-filter: none;
  background-color: rgba(0, 0, 0, 0.3);

  header {
    text-align: start;
  }

  p:last-of-type {
    margin-bottom: 20px;
  }

  .close {
    background-color: transparent;
    border: none;
  }
  .close:focus {
    box-shadow: none;
  }

  .deltTxt {
    color: #e3426e;
  }
`;

const UserBtns = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  .btns-container {
    display: flex;
    flex-direction: row;
  }

  button {
    padding: 10px 10px;
    margin: 10px;
    width: 130px;
  }
`;

const ModalBtns = styled.div`
  display: flex;
  justify-content: end;

  button {
    margin-left: 10px;
  }

  .cancel-button {
    padding: 5px 0;
    width: 100px;
  }
  .confirm-button {
    padding: 5px 0;
    width: 160px;
  }
`;

export { UserWrapper, UserBtns, ModalBox, ModalBtns };
