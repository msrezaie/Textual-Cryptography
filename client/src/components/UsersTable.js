import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { BtnWrapper } from "../assets/wrappers/TableWrapper";

const UsersTable = () => {
  const navigate = useNavigate();
  const { fetchedUsers, updateFetchedUsers, setupStagedUser } = useAppContext();
  const [users, setUsers] = useState([...fetchedUsers]);

  const deleteBtn = async (e) => {
    const targetEmail = e.target.value;
    try {
      const response = await axios.delete(
        `/api/v1/admin/user/delete/${targetEmail}`
      );
      setUsers((previous) => {
        return previous.filter((user) => user.email !== targetEmail);
      });
      updateFetchedUsers(
        fetchedUsers.filter((user) => user.email !== targetEmail)
      );
      toast.success(response.data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const modifyBtn = async (e) => {
    const stagedUser = fetchedUsers.find((user) => user._id === e.target.value);
    setupStagedUser(stagedUser);
    navigate("/admin/modifyUser");
  };

  useEffect(() => {
    setUsers([...fetchedUsers]);
  }, [fetchedUsers]);

  return (
    <article>
      <header>
        <strong>Existing Users</strong>
      </header>
      <figure>
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Created at</th>
              <th scope="col">Updated at</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {
              return (
                <tr key={user._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Admin" : "Not Admin"}</td>
                  <td>{user.createdAt}</td>
                  <td>{user.updatedAt}</td>
                  <td>
                    <BtnWrapper>
                      <li>
                        <button
                          value={user.email}
                          onClick={deleteBtn}
                          className="contrast"
                        >
                          Delete
                        </button>
                      </li>
                      <li>
                        <button
                          value={user._id}
                          onClick={modifyBtn}
                          className="contrast"
                        >
                          Modify
                        </button>
                      </li>
                    </BtnWrapper>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </figure>
      <button
        className="contrast"
        style={{ width: "150px", padding: "10px" }}
        onClick={() => navigate("/admin/addUser")}
      >
        Add New
      </button>
    </article>
  );
};
export default UsersTable;
