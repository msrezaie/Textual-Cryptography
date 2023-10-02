import BtnsWrapper from "../assets/wrappers/InputsWrapper";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAppContext } from "../context/appContext";
import axios from "axios";

const Inputs = () => {
  const { globalState, userState } = useAppContext();

  const { cipherName, keys, keyType } = globalState;
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const buttonHandler = async (e) => {
    const operation = e.target.name;
    if (operation === "encrypt") {
      if (!plaintext) {
        toast.info("Enter text!");
      } else if (keyType === "1-key" && !keys.key1) {
        toast.info("Enter key!");
      } else if (keyType === "2-key" && (!keys.key1 || !keys.key2)) {
        toast.info("Enter both keys!");
      } else {
        try {
          const { data } = await axios.post("/cryptography", {
            cipher: cipherName,
            operation,
            message: plaintext,
            keys,
          });
          const encryted = data.result;
          setCiphertext(encryted);

          if (userState.user) {
            await axios.post("/user/history", {
              cipher: cipherName,
              plaintext,
              keys,
              ciphertext: encryted,
            });
          }
        } catch (error) {
          toast.error(error.response.data.error);
        }
      }
    }

    if (operation === "decrypt") {
      if (!ciphertext) {
        toast.info("Enter encrypted text!");
      } else if (keyType === "1-key" && !keys.key1) {
        toast.info("Enter key!");
      } else if (keyType === "2-key" && (!keys.key1 || !keys.key2)) {
        toast.info("Enter both keys!");
      } else {
        try {
          const { data } = await axios.post("/cryptography", {
            cipher: cipherName,
            operation,
            message: ciphertext,
            keys,
          });
          const decryted = data.result;
          setPlaintext(decryted);

          if (userState.user) {
            await axios.post("/user/history", {
              cipher: cipherName,
              plaintext: decryted,
              keys,
              ciphertext,
            });
          }
        } catch (error) {
          toast.error(error.response.data);
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
