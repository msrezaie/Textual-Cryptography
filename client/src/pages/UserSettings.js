import axios from "axios";
import { useState } from "react";
import { useAppContext } from "../context/appContext";
import {
  UserWrapper,
  UserBtns,
  ModalBtns,
  ModalBox,
} from "../assets/wrappers/UserWrapper";
import { toast } from "react-toastify";
import { LOGOUT_USER } from "../context/action";
import { useNavigate } from "react-router-dom";

const UserSettings = () => {
  const navigate = useNavigate();
  const { userEmail, updateUser, dispatch } = useAppContext();
  const [email, setEmail] = useState(userEmail);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const updateEmail = async () => {
    try {
      await axios.patch(`/api/v1/user/update/${userEmail}`, {
        userEmail: email,
      });
      updateUser(email);
      setIsDisabled(!isDisabled);
      toast.success("User info updated!");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const deleteAccount = async () => {
    try {
      await axios.delete(`/api/v1/user/delete/${userEmail}`, {
        userEmail: email,
      });
      dispatch({ type: LOGOUT_USER });
      setConfirmEmail("");
      setModalOpen(!modalOpen);
      navigate("/");
      toast.success("Account successfully deleted!");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <UserWrapper>
      <article>
        <header>
          <strong>User Information</strong>
        </header>
        <div className="grid">
          <hgroup>
            <strong>Email Address</strong>
            <p>A valid Email address used for signing in.</p>
          </hgroup>
          <div className="profile-inputs-container">
            <input
              type="email"
              disabled={isDisabled}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <UserBtns>
          {!isDisabled && (
            <div className="btns-container">
              <button
                className="outline contrast"
                onClick={() => {
                  setEmail(userEmail);
                  setIsDisabled(!isDisabled);
                }}
              >
                Cancel
              </button>
              <button className="contrast" onClick={updateEmail}>
                Save
              </button>
            </div>
          )}
          {isDisabled && (
            <button
              className="contrast"
              onClick={() => setIsDisabled(!isDisabled)}
            >
              Update
            </button>
          )}
        </UserBtns>
      </article>
      <button
        className="deltUsrBtn contrast"
        onClick={() => setModalOpen(!modalOpen)}
      >
        Delete Account
      </button>

      <ModalBox open={modalOpen}>
        <article>
          <header>
            <button
              className="close"
              onClick={() => {
                setConfirmEmail("");
                setModalOpen(!modalOpen);
              }}
            />
            <strong>Delete User Account</strong>
          </header>
          <p>
            Type{" "}
            <span className="deltTxt">
              <strong>delete {email}</strong>
            </span>{" "}
            below to confirm.
          </p>
          <input
            type="text"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
          <footer>
            <ModalBtns>
              <button
                className="outline contrast cancel-button"
                onClick={() => {
                  setConfirmEmail("");
                  setModalOpen(!modalOpen);
                }}
              >
                Cancel
              </button>
              <button
                className="deltUsrBtn confirm-button"
                onClick={deleteAccount}
                disabled={confirmEmail !== `delete ${email}`}
              >
                Delete Account
              </button>
            </ModalBtns>
          </footer>
        </article>
      </ModalBox>
    </UserWrapper>
  );
};

export default UserSettings;
