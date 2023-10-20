import axios from "axios";
import { useState } from "react";
import { useAppContext } from "../context/appContext";
import { UserBtns } from "../assets/wrappers/ProfileWrapper";
import { toast } from "react-toastify";

const UserSettings = () => {
  const { userEmail, updateUser } = useAppContext();
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
    console.log(email);
  };

  return (
    <>
      <article>
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
          <div>
            <UserBtns>
              {!isDisabled && (
                <>
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
                </>
              )}
              {isDisabled && (
                <>
                  <button
                    className="contrast"
                    onClick={() => setIsDisabled(!isDisabled)}
                  >
                    Update
                  </button>
                </>
              )}
            </UserBtns>
          </div>
        </div>
        <button
          className="contrast"
          style={{ width: "250px", padding: "10px" }}
          onClick={() => toast.info("not yet implemented!")}
        >
          Forgot Password?
        </button>
      </article>
    </>
  );
};
export default UserSettings;
