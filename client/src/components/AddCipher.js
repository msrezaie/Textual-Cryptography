import axios from "axios";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { useAppContext } from "../context/appContext";

const AddCipher = () => {
  const formRef = useRef(null);
  const { fetchCiphers } = useAppContext();
  const [keyType, setKeyType] = useState("");

  const cipherSaveHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData);
    const {
      cipherName,
      keyType,
      cipherDescription,
      keysDescription,
      cipherFile,
      ...keyArgs
    } = formDataObject;

    const cipherData = {
      cipherName,
      keyType,
      cipherDescription,
      keysDescription,
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
      const response = await axios.post(
        "/api/v1/admin/cipher/create",
        cipherData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.msg);
      formRef.current.reset();
      fetchCiphers();
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div>
      <article>
        <header>
          <strong>Cipher Details</strong>
        </header>
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
            onChange={(e) => setKeyType(e.target.value)}
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
            placeholder="About cipher"
            required
          />
          <textarea
            type="text"
            name="keysDescription"
            placeholder="About cipher keys"
            required
          />
          <input type="file" name="cipherFile" accept=".py" required />
          <button
            type="submit"
            style={{ width: "150px", padding: "10px" }}
            className="contrast"
          >
            Save
          </button>
        </form>
      </article>
    </div>
  );
};
export default AddCipher;
