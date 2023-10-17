import axios from "axios";
import { useState } from "react";
import { BtnWrapper } from "../assets/wrappers/TableWrapper";
import { useAppContext } from "../context/appContext";
import { toast } from "react-toastify";

const UsersTable = () => {
  const { fetchedUsers, updateFetchedUsers } = useAppContext();
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
    toast.info("not yet functional");
  };

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
              <th scope="col">email</th>
              <th scope="col">admin</th>
              <th scope="col">created at</th>
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {
              return (
                <tr key={user._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.email}</td>
                  <td>{String(user.isAdmin)}</td>
                  <td>{user.createdAt}</td>
                  <td>
                    <BtnWrapper>
                      <li>
                        <button
                          value={user.email}
                          onClick={deleteBtn}
                          className="contrast"
                        >
                          Remove
                        </button>
                      </li>
                      <li>
                        <button onClick={modifyBtn} className="contrast">
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
    </article>
  );
};
export default UsersTable;
