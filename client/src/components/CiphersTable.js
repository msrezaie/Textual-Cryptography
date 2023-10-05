import { useState } from "react";
import { BtnWrapper } from "../assets/wrappers/AdminWrapper";
import { useAppContext } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";

const CiphersTable = () => {
  const { globalState } = useAppContext();
  const [adminCiphers, setAdminCiphers] = useState([...globalState.ciphers]);

  const deleteBtn = async (e) => {
    const cipherName = e.target.value;
    try {
      const response = await axios.delete(
        `/api/v1/admin/cipher/delete/${cipherName}`
      );
      setAdminCiphers((previous) => {
        return previous.filter((cipher) => cipher.name !== cipherName);
      });
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
        <strong>Existing Ciphers</strong>
      </header>
      <figure>
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
            {adminCiphers.length > 0 &&
              adminCiphers.map((cipher, index) => {
                return (
                  <tr key={cipher._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{cipher.name}</td>
                    <td>{cipher.keyType}</td>
                    <td>{cipher.filePath}</td>
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
                          <button className="contrast" onClick={modifyBtn}>
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
export default CiphersTable;
