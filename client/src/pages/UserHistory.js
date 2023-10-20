import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { BtnWrapper } from "../assets/wrappers/TableWrapper";

const UserHistory = () => {
  const { history, updateHistory } = useAppContext();
  const [historyData, setHistoryData] = useState([...history]);

  const deleteBtn = async (e) => {
    const historyId = e.target.value;
    try {
      const response = await axios.delete(
        `/api/v1/history/delete/${historyId}`
      );
      setHistoryData((prevHistoryData) => {
        return prevHistoryData.filter((history) => history._id !== historyId);
      });
      updateHistory(history.filter((h) => h._id !== historyId));
      toast.success(response.data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const deleteAllBtn = async () => {
    const userId = history[0]?.userId;
    if (userId) {
      try {
        const response = await axios.delete(
          `/api/v1/history/deleteAll/${userId}`
        );
        updateHistory([]);
        toast.success(response.data.msg);
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    } else {
      toast.info("No history to delete!");
    }
  };

  useEffect(() => {
    setHistoryData([...history]);
  }, [history]);

  return (
    <article>
      <header>
        <strong>Encryption/Decryption History</strong>
      </header>
      <figure>
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Plaintext</th>
              <th scope="col">Cipher</th>
              <th scope="col">Key[s]</th>
              <th scope="col">Operation</th>
              <th scope="col">Ciphertext</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {historyData?.map((history, index) => {
              const [firstKey, secondKey] = Object.entries(history.keys ?? {});
              const historyKeys =
                Object.entries(history.keys ?? {}).length < 1
                  ? ""
                  : !secondKey
                  ? firstKey[1]
                  : `Key1: ${firstKey[1]} Key2: ${secondKey[1]}` || "";
              return (
                <tr key={history._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{history.plaintext}</td>
                  <td>{history.cipher}</td>
                  <td>{historyKeys}</td>
                  <td>{history.operation}</td>
                  <td>{history.ciphertext}</td>
                  <td>
                    <BtnWrapper>
                      <li>
                        <button
                          className="contrast"
                          onClick={deleteBtn}
                          value={history._id}
                        >
                          Delete
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
        onClick={deleteAllBtn}
      >
        Delete All
      </button>
    </article>
  );
};
export default UserHistory;
