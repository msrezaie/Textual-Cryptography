import axios from "axios";
import { toast } from "react-toastify";
import { useRef, useState } from "react";

const AddCipher = () => {
  const formRef = useRef(null);
  const [keyType, setKeyType] = useState("");

  const keyChangeHandler = (e) => {
    setKeyType(e.target.value);
  };

  const cipherSaveHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData);
    const { cipherName, keyType, cipherDescription, cipherFile, ...keyArgs } =
      formDataObject;

    const cipherData = {
      cipherName,
      keyType,
      cipherDescription,
      cipherFile,
      keyArgs: { ...keyArgs },
    };

    if (
      !cipherData.cipherFile.name.endsWith(".py") ||
      cipherData.cipherFile.type !== "text/plain"
    ) {
      toast.warn("Invalid file type!");
      return;
    }
    try {
      const response = await axios.post("/admin/cipher/create", cipherData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.msg);
      formRef.current.reset();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <article>
      <div>
        <header>Add New Cipher</header>
        <form ref={formRef} onSubmit={cipherSaveHandler}>
          <input
            type="text"
            name="cipherName"
            placeholder="Cipher name"
            required
          />
          <select
            id="keyType"
            name="keyType"
            onChange={keyChangeHandler}
            value={keyType}
            required
          >
            <option value="">Select a key type</option>
            <option value="no-key">No Key</option>
            <option value="1-key">1 Key</option>
            <option value="2-key">2 Key</option>
          </select>

          {keyType === "1-key" && (
            <>
              <select name="keyDataType" required>
                <option value="">Select a key data type</option>
                <option value="number">Number</option>
                <option value="text">Text</option>
              </select>
              <input
                type="text"
                name="keyDataDesc"
                placeholder="Key specification description"
                required
              />
            </>
          )}
          {keyType === "2-key" && (
            <>
              <select name="key1DataType" required>
                <option value="">First key data type</option>
                <option value="number">Number</option>
                <option value="text">Text</option>
              </select>
              <input
                type="text"
                name="key1DataDesc"
                placeholder="First key specification description"
                required
              />
              <select name="key2DataType" required>
                <option value="">Second key data type</option>
                <option value="number">Number</option>
                <option value="text">Text</option>
              </select>
              <input
                type="text"
                name="key2DataDesc"
                placeholder="Second key specification description"
                required
              />
            </>
          )}

          <textarea
            type="text"
            name="cipherDescription"
            placeholder="Cipher description"
            required
          />
          <input type="file" name="cipherFile" accept=".py" required />
          <button type="submit" className="contrast">
            Save
          </button>
        </form>
      </div>
    </article>
  );
};
export default AddCipher;
