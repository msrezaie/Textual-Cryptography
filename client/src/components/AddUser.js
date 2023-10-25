import axios from "axios";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const formRef = useRef(null);

  const navigate = useNavigate();

  const { fetchUsers } = useAppContext();

  const userSaveHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password, isAdmin } = Object.fromEntries(formData);

    const newUserInfo = {
      email,
      password,
      isAdmin,
    };

    try {
      const response = await axios.post(
        "/api/v1/admin/user/create",
        newUserInfo
      );
      toast.success(response.data.msg);
      formRef.current.reset();
      fetchUsers();
      navigate("/admin/users");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div>
      <article>
        <header>
          <strong>New User Details</strong>
        </header>
        <form ref={formRef} onSubmit={userSaveHandler}>
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
                required
              />
            </div>
          </div>
          <div className="grid">
            <hgroup>
              <strong>Password</strong>
              <p>A new password that is at least 6 characters long.</p>
            </hgroup>
            <div className="profile-inputs-container">
              <input
                type="password"
                name="password"
                placeholder="abcd123!@#"
                autoComplete="off"
                required
              />
            </div>
          </div>
          <div className="grid">
            <hgroup>
              <strong>User Role</strong>
              <p>A user can have an Admin or Not Admin role.</p>
            </hgroup>
            <div className="profile-inputs-container">
              <input type="radio" name="isAdmin" value={true} required />
              <label htmlFor="">Admin</label>
              <input type="radio" name="isAdmin" value={false} required />
              <label htmlFor="">Not Admin</label>
            </div>
          </div>
          <button
            type="submit"
            style={{ width: "150px", padding: "10px", marginTop: "30px" }}
            className="contrast"
          >
            Save
          </button>
        </form>
      </article>
    </div>
  );
};

export default AddUser;
