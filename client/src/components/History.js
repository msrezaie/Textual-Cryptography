import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import axios from "axios";

const History = () => {
  const { userState } = useAppContext();
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const { data } = await axios.get("/user/history");
        setHistoryData(data.history);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHistoryData();
  }, [userState]);

  return (
    <article>
      <details>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </details>
    </article>
  );
};
export default History;
