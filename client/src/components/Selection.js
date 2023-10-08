import { useAppContext } from "../context/appContext";

const Selection = () => {
  const { ciphers, updateCipher } = useAppContext();

  const cipherChange = (e) => {
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
