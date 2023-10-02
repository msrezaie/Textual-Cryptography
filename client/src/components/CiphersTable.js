import { BtnWrapper } from "../assets/wrappers/AdminWrapper";
import { useAppContext } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";

const CiphersTable = () => {
  const { globalState } = useAppContext();
  console.log(globalState);
  const deleteBtn = async (e) => {
    const cipherName = e.target.value;
    try {
      const response = await axios.delete(`/admin/cipher/delete/${cipherName}`);
      toast.success(response.data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <article>
      <header>
        <strong>Existing Ciphers</strong>
      </header>
      <table>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">keyType</th>
            <th scope="col">file</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          {globalState.ciphers.length > 0 &&
            globalState.ciphers.map((cipher, index) => {
              return (
                <tr key={cipher._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{cipher.name}</td>
                  <td>{cipher.keyType}</td>
                  <td>
                    <a href={cipher.filePath}>{cipher.filePath}</a>
                  </td>
                  <td>
                    <BtnWrapper>
                      <li>
                        <button
                          className="contrast"
                          onClick={deleteBtn}
                          value={cipher.name}
                        >
                          Delete
                        </button>
                      </li>
                      <li>
                        <button className="contrast">Modify</button>
                      </li>
                    </BtnWrapper>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </article>
  );
};
export default CiphersTable;
