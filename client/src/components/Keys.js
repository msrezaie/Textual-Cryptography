import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

const Keys = () => {
  const { keyType, keyArgs, updateKeys } = useAppContext();
  const [keyValue, setKeyValue] = useState({});

  const keyInputHandler = (e) => {
    const { name, value } = e.target;

    setKeyValue((prevKeyValue) => ({
      ...prevKeyValue,
      [name]: value,
    }));
  };

  useEffect(() => {
    updateKeys(keyValue);
    // eslint-disable-next-line
  }, [keyValue]);

  useEffect(() => {
    setKeyValue({});
  }, [keyType]);

  return (
    <div className="container card">
      <label>
        <strong>Keys</strong>
      </label>

      {keyType === "1-key" && (
        <input
          name="key"
          value={keyValue?.key || ""}
          onChange={keyInputHandler}
          type={keyArgs?.keyDataType}
          placeholder={keyArgs?.keyDataDesc}
          required
        />
      )}

      {keyType === "2-key" && (
        <div>
          <input
            name="key1"
            value={keyValue?.key1 || ""}
            onChange={keyInputHandler}
            type={keyArgs?.key1DataType}
            placeholder={keyArgs?.key1DataDesc}
            required
          />
          <input
            name="key2"
            value={keyValue?.key2 || ""}
            onChange={keyInputHandler}
            type={keyArgs?.key2DataType}
            placeholder={keyArgs?.key2DataDesc}
            required
          />
        </div>
      )}
      {keyType === "no-key" && <input disabled placeholder="No Key Required" />}

      <label id="non-printable" htmlFor="keys">
        Note: Non-printable characters will be replaced with ☒
      </label>
    </div>
  );
};
export default Keys;
