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
    setSelectedCipher(e.target.value);
    const selectedCipher = ciphers.filter(
      (cipher) => cipher.name === e.target.value
    )[0];
    updateCipher({
      cipherName: e.target.value,
      cipherDescription: selectedCipher.cipherDescription,
      keysDescription: selectedCipher.keysDescription,
      keyType: selectedCipher.keyType,
      keyArgs: selectedCipher.keyArgs,
    });
  };

  useEffect(() => {
    const selectCipher = () => {
      setSelectedCipher(selectHistoryCipher);
      const selectedCipher = ciphers.filter(
        (cipher) => cipher.name === selectHistoryCipher
      )[0];
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
        <strong>Choices</strong>
      </label>
      <select name="cipherName" onChange={cipherChange} value={selectedCipher}>
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
