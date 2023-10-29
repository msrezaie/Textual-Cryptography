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
          <strong>New Cipher Details</strong>
        </header>
        <form ref={formRef} onSubmit={cipherSaveHandler}>
          <div className="grid">
            <hgroup>
              <strong>Cipher</strong>
              <p>A name for the Cipher.</p>
            </hgroup>
            <div className="profile-inputs-container">
              <input
                type="text"
                name="cipherName"
                placeholder="i.e. Caesar"
                required
              />
            </div>
          </div>

          <div className="grid">
            <hgroup>
              <strong>Key Type</strong>
              <p>The number of Keys this Cipher require.</p>
            </hgroup>
            <div className="profile-inputs-container">
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
            </div>
          </div>

          {keyType === "1-key" && (
            <>
              <div className="grid">
                <hgroup>
                  <strong>Key Data Type</strong>
                  <p>Specify whether the Key can be a number or text.</p>
                </hgroup>
                <div className="profile-inputs-container">
                  <select name="keyDataType" required>
                    <option value="">Select a key data type</option>
                    <option value="number">Number</option>
                    <option value="text">Text</option>
                  </select>
                </div>
              </div>
              <div className="grid">
                <hgroup>
                  <strong>Key Description</strong>
                  <p>Any brief details about the Key.</p>
                </hgroup>
                <div className="profile-inputs-container">
                  <input
                    type="text"
                    name="keyDataDesc"
                    placeholder="i.e. not an even number or number 14"
                    required
                  />
                </div>
              </div>
            </>
          )}
          {keyType === "2-key" && (
            <>
              <div className="grid">
                <hgroup>
                  <strong>Key 1 Data Type</strong>
                  <p>Specify whether the first Key can be a number or text.</p>
                </hgroup>
                <div className="profile-inputs-container">
                  <select name="key1DataType" required>
                    <option value="">First key data type</option>
                    <option value="number">Number</option>
                    <option value="text">Text</option>
                  </select>
                </div>
              </div>
              <div className="grid">
                <hgroup>
                  <strong>Key 1 Description</strong>
                  <p>Any brief details about the first Key.</p>
                </hgroup>
                <div className="profile-inputs-container">
                  <input
                    type="text"
                    name="key1DataDesc"
                    placeholder="i.e. not an even number or number 14"
                    required
                  />
                </div>
              </div>
              <div className="grid">
                <hgroup>
                  <strong>Key 2 Data Type</strong>
                  <p>Specify whether the second Key can be a number or text.</p>
                </hgroup>
                <div className="profile-inputs-container">
                  <select name="key2DataType" required>
                    <option value="">Second key data type</option>
                    <option value="number">Number</option>
                    <option value="text">Text</option>
                  </select>
                </div>
              </div>
              <div className="grid">
                <hgroup>
                  <strong>Key 2 Description</strong>
                  <p>Any brief details about the second Key.</p>
                </hgroup>
                <div className="profile-inputs-container">
                  <input
                    type="text"
                    name="key2DataDesc"
                    placeholder="i.e. not an even number or number 14"
                    required
                  />
                </div>
              </div>
            </>
          )}
          <div className="grid">
            <hgroup>
              <strong>Cipher Description</strong>
              <p>A description for the Cipher.</p>
            </hgroup>
            <div className="profile-inputs-container">
              <textarea
                rows="5"
                type="text"
                name="cipherDescription"
                placeholder="About this Cipher"
                required
              />
            </div>
          </div>
          <div className="grid">
            <hgroup>
              <strong>Cipher Key[s] Description</strong>
              <p>A description for the Cipher's key[s].</p>
            </hgroup>
            <div className="profile-inputs-container">
              <textarea
                rows="5"
                type="text"
                name="keysDescription"
                placeholder="About Cipher Key[s]"
                required
              />
            </div>
          </div>
          <div className="grid">
            <hgroup>
              <strong>Cipher Script File</strong>
              <p>The algorithm file performing encryption/decryption.</p>
            </hgroup>
            <div className="">
              <input type="file" name="cipherFile" accept=".py" required />
            </div>
          </div>

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
