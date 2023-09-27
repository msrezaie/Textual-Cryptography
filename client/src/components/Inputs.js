import BtnsWrapper from "../assets/wrappers/InputsWrapper";
import { toast } from "react-toastify";
import { useState } from "react";
import { useOperationContext } from "../pages/Landing";
import axios from "axios";

const Inputs = () => {
  const { operationVariables } = useOperationContext();

  const { cipherName, keys, keyType } = operationVariables;
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");

  const buttonHandler = async (e) => {
    const operation = e.target.name;
    if (operation === "encrypt") {
      if (!plaintext || (keyType !== "no-key" && !keys.key1)) {
        toast.info("Enter text and key[s]!");
      } else {
        try {
          const { data } = await axios.post("/cryptography", {
            cipher: cipherName,
            operation,
            message: plaintext,
            keys,
          });
          setCiphertext(data.result);
        } catch (error) {
          toast.error(error.response.data.msg);
        }
      }
    } else {
      if (!ciphertext || (keyType !== "no-key" && !keys.key1)) {
        toast.info("Enter encrypted text and key[s]!");
      } else {
        try {
          const { data } = await axios.post("/cryptography", {
            cipher: cipherName,
            operation,
            message: ciphertext,
            keys,
          });
          setPlaintext(data.result);
        } catch (error) {
          toast.error(error.response.data.msg);
        }
      }
    }
  };

  return (
    <>
      <div className="container card">
        <label htmlFor="plainTextarea">
          <strong>Plaintext</strong>
        </label>
        <textarea
          rows="5"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          placeholder="Type your plaintext here"
        ></textarea>
      </div>
      <BtnsWrapper className="container card">
        <button name="encrypt" className="contrast" onClick={buttonHandler}>
          Encrypt
        </button>
        <button name="decrypt" className="contrast" onClick={buttonHandler}>
          Decrypt
        </button>
        <button
          name="clear"
          className="outline contrast"
          onClick={() => {
            setPlaintext("");
            setCiphertext("");
          }}
        >
          Clear
        </button>
      </BtnsWrapper>
      <div className="container card">
        <label htmlFor="cipherTextarea">
          <strong>Encrypted Text</strong>
        </label>

        <textarea
          rows="5"
          value={ciphertext}
          onChange={(e) => setCiphertext(e.target.value)}
          placeholder="Type your ciphertext here"
        ></textarea>
      </div>
    </>
  );
};

export default Inputs;
