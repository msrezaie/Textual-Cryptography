import { OperationArticle } from "../assets/wrappers/OperationWrapper";
import { Keys, Selection, Inputs } from "./";

const Operation = () => {
  return (
    <>
      <OperationArticle>
        <header>
          <strong>Encryptor/Decryptor</strong>
        </header>
        <div className="grid">
          <Selection />
          <Keys />
        </div>
        <div className="grid" style={{ padding: "15px 0" }}>
          <Inputs />
        </div>
        <label>Note: Non-printable characters will be replaced with ☒</label>
      </OperationArticle>
    </>
  );
};
export default Operation;
