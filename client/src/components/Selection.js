import { useAppContext } from "../context/appContext";
import { useEffect, useState } from "react";
import { UPDATE_CIPHER_SELECT } from "../context/action";

const Selection = () => {
  const {
    ciphers,
    updateCipher,
    selectHistoryId,
    selectHistoryCipher,
    selectHistoryKeys,
    dispatch,
  } = useAppContext();

  const [selectedCipher, setSelectedCipher] = useState("");

  const cipherChange = (e) => {
    const selectedCipherName = e.target.value;
    setSelectedCipher(selectedCipherName);
    const currentCipher = ciphers.find(
      (cipher) => cipher.cipherName === selectedCipherName.toLowerCase()
    );
    updateCipher({
      cipherName: e.target.value,
      cipherDescription: currentCipher.cipherDescription,
      keysDescription: currentCipher.keysDescription,
      keyType: currentCipher.keyType,
      keyArgs: currentCipher.keyArgs,
    });
  };

  useEffect(() => {
    const selectCipher = () => {
      setSelectedCipher(selectHistoryCipher);
      const selectedCipher = ciphers.find(
        (cipher) => cipher.cipherName === selectHistoryCipher
      );
      selectedCipher &&
        dispatch({
          type: UPDATE_CIPHER_SELECT,
          payload: {
            cipherName: selectHistoryCipher,
            cipherDescription: selectedCipher.cipherDescription,
            keysDescription: selectedCipher.keysDescription,
            keyType: selectedCipher.keyType,
            keyArgs: selectedCipher.keyArgs,
            selectHistoryKeys,
          },
        });
    };
    selectCipher();
    // eslint-disable-next-line
  }, [selectHistoryId]);

  return (
    <div className="container">
      <label>
        <strong>Cipher Choices</strong>
      </label>
      <select onChange={cipherChange} value={selectedCipher}>
        {ciphers.map((cipher) => {
          return (
            <option key={cipher._id} value={cipher.cipherName}>
              {cipher.cipherName.charAt(0).toUpperCase() +
                cipher.cipherName.slice(1)}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Selection;
