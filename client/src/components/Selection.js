import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../context/appContext";
import { useEffect, useState } from "react";

const Selection = () => {
  const { globalState, setGlobalState } = useAppContext();
  const [ciphers, setCiphers] = useState([]);

  const cipherChange = (e) => {
    const selectedCipher = ciphers.filter(
      (cipher) => cipher.name === e.target.value
    )[0];
    setGlobalState({
      ...globalState,
      cipherName: e.target.value,
      cipherDescription: selectedCipher.description,
      keyType: selectedCipher.keyType,
      keyArgs: selectedCipher.keyArgs,
    });
  };

  useEffect(() => {
    const fetchCiphers = async () => {
      try {
        const { data } = await axios.get("/cryptography/ciphers");
        if (data.count < 1) {
          toast.error("No Data, App is not Functional!", { autoClose: false });
        } else {
          const firstCipher = data.cipher[0];
          setCiphers(data.cipher);
          setGlobalState({
            ...globalState,
            ciphers: data.cipher,
            cipherName: firstCipher.name,
            cipherDescription: firstCipher.description,
            keyType: firstCipher.keyType,
            keyArgs: firstCipher.keyArgs,
          });
        }
      } catch (error) {
        toast.error(error.response.data, { autoClose: false });
      }
    };

    fetchCiphers();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <label>
        <strong>Choices</strong>
      </label>
      <select name="cipherName" onChange={cipherChange}>
        {ciphers.map((cipher) => {
          return (
            <option key={cipher._id} value={cipher.name}>
              {cipher.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Selection;
