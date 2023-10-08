import { BtnWrapper } from "../assets/wrappers/TableWrapper";
import { useAppContext } from "../context/appContext";
import { toast } from "react-toastify";

const UsersTable = () => {
  const { fetchedUsers } = useAppContext();

  const deleteBtn = async (e) => {
    toast.info("not yet functional");
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
              <th scope="col">name</th>
              <th scope="col">admin</th>
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody>
            {fetchedUsers?.map((user, index) => {
              return (
                <tr key={user._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{String(user.isAdmin)}</td>
                  <td>
                    <BtnWrapper>
                      <li>
                        <button onClick={deleteBtn} className="contrast">
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
