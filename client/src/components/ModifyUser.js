import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { ModifyBtns } from "../assets/wrappers/AdminWrapper";

const ModifyUser = () => {
  const navigate = useNavigate();

  const { fetchUsers, stagedUser, setupStagedUser } = useAppContext();
  const [userValues, setUserValues] = useState({ password: "", ...stagedUser });

  const userUpdateHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password, role } = Object.fromEntries(formData);

    const modifiedUserInfo = {
      email,
      password,
      role,
    };
    try {
      const response = await axios.patch(
        `/api/v1/admin/user/update/${stagedUser.email}`,
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
              autoComplete="off"
              value={userValues.email}
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
              value={userValues.password}
              onChange={(e) =>
                setUserValues({
                  ...userValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="grid">
          <hgroup>
            <strong>User Role</strong>
            <p>
              A user's role can be Root Admin, Read-only Admin, or just a User.
            </p>
          </hgroup>
          <div className="profile-inputs-container">
            <select
              name="role"
              value={userValues.role}
              onChange={(e) => {
                setUserValues({
                  ...userValues,
                  [e.target.name]: e.target.value,
                });
              }}
              required
            >
              <option value="">Select a Role type</option>
              <option value="user">User</option>
              <option value="read-only-admin">Read-only Admin</option>
              <option value="root-admin">Root Admin</option>
            </select>
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
