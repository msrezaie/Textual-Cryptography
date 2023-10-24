import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../context/appContext";
import { BtnsWrapper } from "../assets/wrappers/InputsWrapper";

const Inputs = () => {
  const {
    cipherName,
    keys,
    keyType,
    userEmail,
    isAdmin,
    fetchHistoryData,
    selectHistoryPText,
    selectHistoryCText,
  } = useAppContext();

  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");

  const buttonHandler = async (e) => {
    const operation = e.target.name;
    if (operation === "encrypt") {
      if (!plaintext) {
        toast.info("Enter text!");
      } else if (keyType === "1-key" && !keys.key) {
        toast.info("Enter key!");
      } else if (keyType === "2-key" && (!keys.key1 || !keys.key2)) {
        toast.info("Enter both keys!");
      } else {
        try {
          const { data } = await axios.post("/api/v1/cryptography", {
            cipherName,
            operation,
            message: plaintext,
            keys,
          });
          const encryted = data.result;
          setCiphertext(encryted);

          if (userEmail && !isAdmin) {
            await axios.post("/api/v1/history/save", {
              userEmail,
              operation,
              cipher: cipherName,
              plaintext,
              keys,
              ciphertext: encryted,
            });
            fetchHistoryData();
          }
        } catch (error) {
          toast.error(error.response.data.error);
        }
      }
    }

    if (operation === "decrypt") {
      if (!ciphertext) {
        toast.info("Enter encrypted text!");
      } else if (keyType === "1-key" && !keys.key) {
        toast.info("Enter key!");
      } else if (keyType === "2-key" && (!keys.key1 || !keys.key2)) {
        toast.info("Enter both keys!");
      } else {
        try {
          const { data } = await axios.post("/api/v1/cryptography", {
            cipherName,
            operation,
            message: ciphertext,
            keys,
          });
          const decryted = data.result;
          setPlaintext(decryted);

          if (userEmail && !isAdmin) {
            await axios.post("/api/v1/history/save", {
              userEmail,
              operation,
              cipher: cipherName,
              ciphertext,
              keys,
              plaintext: decryted,
            });
            fetchHistoryData();
          }
        } catch (error) {
          toast.error(error.response.data);
        }
      }
    }
  };

  useEffect(() => {
    setPlaintext(selectHistoryPText);
    setCiphertext(selectHistoryCText);
  }, [selectHistoryPText, selectHistoryCText]);

  return (
    <>
      <div className="container">
        <label>
          <strong>Plaintext</strong>
        </label>
        <textarea
          rows="5"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value)}
          placeholder="Type your plaintext here"
        ></textarea>
      </div>
      <BtnsWrapper className="container">
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
      <div className="container">
        <label>
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
