import axios from "axios";
import { useState } from "react";
import { useAppContext } from "../context/appContext";
import { UserBtns } from "../assets/wrappers/ProfileWrapper";
import { toast } from "react-toastify";
import { LOGOUT_USER } from "../context/action";
import { useNavigate } from "react-router-dom";

const UserSettings = () => {
  const navigate = useNavigate();
  const { userEmail, updateUser, dispatch } = useAppContext();
  const [email, setEmail] = useState(userEmail);
  const [isDisabled, setIsDisabled] = useState(true);

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
      navigate("/");
      toast.success("Account successfully deleted!");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <>
      <article>
        <header>
          <strong>User Information</strong>
        </header>
        <div className="grid">
          <div>
            <label>
              <strong>Email</strong>
            </label>
            <input
              disabled={isDisabled}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
        </div>
      </article>
      <button
        style={{ width: "200px", marginTop: "50px" }}
        className="contrast"
        onClick={deleteAccount}
      >
        Delete Account
      </button>
    </>
  );
};
export default UserSettings;
