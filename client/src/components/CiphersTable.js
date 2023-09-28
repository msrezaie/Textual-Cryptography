import BtnWrapper from "../assets/wrappers/AdminActionBtnsWrapper";
import { useAppContext } from "../context/appContext";

const CiphersTable = () => {
  const { globalState } = useAppContext();
  return (
    <article>
      <header>Existing Ciphers</header>
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
          {globalState.ciphers?.map((cipher, index) => {
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
                      <button className="contrast">Delete</button>
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
