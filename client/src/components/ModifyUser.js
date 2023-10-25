import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { ModifyBtns } from "../assets/wrappers/AdminWrapper";

const ModifyUser = () => {
  const navigate = useNavigate();

  const { fetchUsers, stagedUser, setupStagedUser } = useAppContext();
  const [userValues, setUserValues] = useState({ ...stagedUser });

  const userUpdateHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, isAdmin } = Object.fromEntries(formData);

    const modifiedUserInfo = {
      email,
      isAdmin,
    };

    try {
      const response = await axios.patch(
        `/api/v1/admin/user/modify/${stagedUser._id}`,
        modifiedUserInfo
      );
      toast.success(response.data.msg);
      setupStagedUser({});
      setUserValues({});
      fetchUsers();
      navigate("/admin/users");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const userCancelHandler = async (e) => {
    e.preventDefault();
    setUserValues({});
    setupStagedUser({});
    navigate("/admin/users");
  };

  return (
    <article>
      <header>
        <strong>Update User Details</strong>
      </header>
      <form onSubmit={userUpdateHandler}>
        <div className="grid">
          <hgroup>
            <strong>User Email</strong>
            <p>A valid Email address used for signing in.</p>
          </hgroup>
          <div className="profile-inputs-container">
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={userValues.email || ""}
              onChange={(e) =>
                setUserValues({
                  ...userValues,
                  [e.target.name]: e.target.value,
                })
              }
              required
            />
          </div>
        </div>
        <div className="grid">
          <hgroup>
            <strong>New Password</strong>
            <p>Leave empty to keep old password.</p>
          </hgroup>
          <div className="profile-inputs-container">
            <input
              type="password"
              name="password"
              placeholder="abcd123!@#"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="grid">
          <hgroup>
            <strong>User Role</strong>
            <p>A user can have an Admin or Not Admin role.</p>
          </hgroup>
          <div className="profile-inputs-container">
            <input
              type="radio"
              name="isAdmin"
              checked={userValues.isAdmin === true}
              value={true}
              onChange={(e) =>
                setUserValues({
                  ...userValues,
                  [e.target.name]: e.target.value === "true",
                })
              }
            />
            <label htmlFor="">Admin</label>
            <input
              type="radio"
              name="isAdmin"
              checked={userValues.isAdmin === false}
              value={false}
              onChange={(e) =>
                setUserValues({
                  ...userValues,
                  [e.target.name]: e.target.value === "true",
                })
              }
            />
            <label htmlFor="">Not Admin</label>
          </div>
        </div>
        <ModifyBtns>
          <button type="submit" className="contrast">
            Update
          </button>
          <button onClick={userCancelHandler} className="outline contrast">
            Cancel
          </button>
        </ModifyBtns>
      </form>
    </article>
  );
};
export default ModifyUser;
