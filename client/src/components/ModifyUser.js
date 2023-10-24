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
        <strong>User Details</strong>
      </header>
      <form onSubmit={userUpdateHandler}>
        <label htmlFor="">Email</label>
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
        <div
        // style={{ pointerEvents: "none", opacity: "0.5", userSelect: "none" }}
        >
          <label htmlFor="">Role</label>
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

        <ModifyBtns>
          <button
            type="submit"
            style={{ width: "150px", padding: "10px" }}
            className="contrast"
          >
            Update
          </button>
          <button
            onClick={userCancelHandler}
            style={{ width: "150px", padding: "10px" }}
            className="outline contrast"
          >
            Cancel
          </button>
        </ModifyBtns>
      </form>
    </article>
  );
};
export default ModifyUser;
