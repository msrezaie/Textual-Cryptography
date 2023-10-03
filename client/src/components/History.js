import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { BtnWrapper } from "../assets/wrappers/AdminWrapper";
import { HistoryArticle } from "../assets/wrappers/HistoryWrapper";

const History = () => {
  const { userState } = useAppContext();
  const [historyData, setHistoryData] = useState([]);

  const deleteBtn = async (e) => {
    const historyId = e.target.value;
    try {
      const response = await axios.delete(
        `/api/v1/user/history/delete/${historyId}`
      );
      setHistoryData((prevHistoryData) => {
        return prevHistoryData.filter((history) => history._id !== historyId);
      });
      toast.success(response.data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const modifyBtn = async () => {
    toast.info("not yet functional");
  };

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const { data } = await axios.get("/api/v1/user/history");
        setHistoryData(data.history);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHistoryData();
  }, [userState]);

  return (
    <HistoryArticle>
      <details open>
        <summary>
          <strong>Your Usage History</strong>
        </summary>
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Plaintext</th>
              <th scope="col">Cipher</th>
              <th scope="col">Key[s]</th>
              <th scope="col">Ciphertext</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {historyData?.map((history, index) => {
              return (
                <tr key={history._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{history.plaintext}</td>
                  <td>{history.cipher}</td>
                  <td>{history.keys}</td>
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
      </details>
    </HistoryArticle>
  );
};
export default History;
