import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { KeysWrapper } from "../assets/wrappers/InputsWrapper";

const Keys = () => {
  const { keyType, keyArgs, updateKeys, selectHistoryKeys } = useAppContext();
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
    if (selectHistoryKeys) {
      setKeyValue(selectHistoryKeys);
    } else {
      setKeyValue({});
    }
  }, [selectHistoryKeys]);

  return (
    <KeysWrapper className="container card">
      <label>
        <strong>
          Key{keyType === "no-key" || keyType === "1-key" ? "" : "s"}
        </strong>
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
        <div className="twoKeys">
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
    </KeysWrapper>
  );
};
export default Keys;
