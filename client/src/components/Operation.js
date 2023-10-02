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
        <div className="grid">
          <Inputs />
        </div>
      </OperationArticle>
    </>
  );
};
export default Operation;
