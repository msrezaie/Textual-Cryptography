import { useEffect, useState } from "react";
// import { useOperationContext } from "../pages/Landing";
import { useAppContext } from "../context/appContext";

const Keys = () => {
  const { state, setState } = useAppContext();
  const [keyValue, setKeyValue] = useState({
    key1: "",
    key2: "",
  });
  const { keyType, keyArgs } = state;

  const keyInputHandler = (e) => {
    const { name, value } = e.target;

    setKeyValue((prevKeyValue) => ({
      ...prevKeyValue,
      [name]: value,
    }));
  };

  useEffect(() => {
    setState({ ...state, keys: keyValue });
  }, [keyValue]);

  useEffect(() => {
    setKeyValue({
      key1: "",
      key2: "",
    });
  }, [keyType]);

  return (
    <div className="container card">
      <label>
        <strong>Keys</strong>
      </label>

      {keyType === "1-key" && (
        <input
          type={keyArgs?.keyDataType}
          value={keyValue.key1}
          name="key1"
          onChange={keyInputHandler}
          placeholder={keyArgs?.keyDataDesc}
        />
      )}

      {keyType === "2-key" && (
        <div>
          <input
            name="key1"
            value={keyValue.key1}
            onChange={keyInputHandler}
            type={keyArgs?.key1DataType}
            placeholder={keyArgs?.key1DataDesc}
          />
          <input
            name="key2"
            value={keyValue.key2}
            onChange={keyInputHandler}
            type={keyArgs?.key2DataType}
            placeholder={keyArgs?.key2DataDesc}
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
