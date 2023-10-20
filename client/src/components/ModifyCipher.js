import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { SETUP_STAGED_CIPHER } from "../context/action";

const ModifyCipher = () => {
  const navigate = useNavigate();
  const { fetchCiphers, stagedCipher, dispatch } = useAppContext();

  const [cipherValues, setCipherValues] = useState({ ...stagedCipher });

  const cipherUpdateHandler = async (e) => {
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
      newCipherName: cipherName,
      keyType,
      cipherDescription,
      keysDescription,
      cipherFile,
      keyArgs: { ...keyArgs },
    };

    if (cipherData.cipherFile.name) {
      if (
        !cipherData.cipherFile.name.endsWith(".py") ||
        cipherData.cipherFile.type !== "text/plain"
      ) {
        toast.warn("Invalid file type!");
        return;
      }
    }

    try {
      const response = await axios.patch(
        `/api/v1/admin/cipher/update/${stagedCipher.cipherName}`,
        cipherData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.msg);
      setCipherValues({});
      dispatch({
        type: SETUP_STAGED_CIPHER,
        payload: {
          selectedCipher: {},
        },
      });
      fetchCiphers();
      navigate("/admin");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <article>
      <header>
        <strong>Cipher Details</strong>
      </header>
      <form onSubmit={cipherUpdateHandler}>
        <label htmlFor="cipherName">Name of the Cipher</label>
        <input
          type="text"
          name="cipherName"
          placeholder="i.e. reverse or caesar"
          value={cipherValues.cipherName}
          onChange={(e) =>
            setCipherValues({
              ...cipherValues,
              [e.target.name]: e.target.value,
            })
          }
          required
        />
        <label htmlFor="keyType">Key Type</label>
        <select
          name="keyType"
          value={cipherValues.keyType}
          onChange={(e) => {
            const { keyArgs, ...newCipherValues } = cipherValues;
            setCipherValues({
              ...newCipherValues,
              [e.target.name]: e.target.value,
            });
          }}
          required
        >
          <option value="">Select a key type</option>
          <option value="no-key">No Key</option>
          <option value="1-key">1 Key</option>
          <option value="2-key">2 Key</option>
        </select>

        {cipherValues.keyType === "1-key" && (
          <>
            <label htmlFor="keyDataType">Key Data Type</label>
            <select
              name="keyDataType"
              value={cipherValues.keyArgs?.keyDataType}
              onChange={(e) =>
                setCipherValues({
                  ...cipherValues,
                  keyArgs: {
                    ...cipherValues.keyArgs,
                    [e.target.name]: e.target.value,
                  },
                })
              }
              required
            >
              <option value="">Select...</option>
              <option value="number">Number</option>
              <option value="text">Text</option>
            </select>
            <label htmlFor="keyDataDesc">Key Description</label>
            <input
              type="text"
              name="keyDataDesc"
              value={cipherValues.keyArgs?.keyDataDesc || ""}
              onChange={(e) =>
                setCipherValues({
                  ...cipherValues,
                  keyArgs: {
                    ...cipherValues.keyArgs,
                    [e.target.name]: e.target.value,
                  },
                })
              }
              placeholder="i.e. not an even number or number 14"
              required
            />
          </>
        )}
        {cipherValues.keyType === "2-key" && (
          <>
            <label htmlFor="key1DataType">Key 1 Data Type</label>
            <select
              name="key1DataType"
              value={cipherValues.keyArgs?.key1DataType}
              onChange={(e) =>
                setCipherValues({
                  ...cipherValues,
                  keyArgs: {
                    ...cipherValues.keyArgs,
                    [e.target.name]: e.target.value,
                  },
                })
              }
              required
            >
              <option value="">First key data type</option>
              <option value="number">Number</option>
              <option value="text">Text</option>
            </select>
            <label htmlFor="key1DataDesc">Key 1 Description</label>
            <input
              type="text"
              name="key1DataDesc"
              value={cipherValues.keyArgs?.key1DataDesc || ""}
              onChange={(e) =>
                setCipherValues({
                  ...cipherValues,
                  keyArgs: {
                    ...cipherValues.keyArgs,
                    [e.target.name]: e.target.value,
                  },
                })
              }
              placeholder="i.e. not an even number or number 14"
              required
            />
            <label htmlFor="key2DataType">Key 2 Data Type</label>
            <select
              name="key2DataType"
              value={cipherValues.keyArgs?.key2DataType}
              onChange={(e) =>
                setCipherValues({
                  ...cipherValues,
                  keyArgs: {
                    ...cipherValues.keyArgs,
                    [e.target.name]: e.target.value,
                  },
                })
              }
              required
            >
              <option value="">Second key data type</option>
              <option value="number">Number</option>
              <option value="text">Text</option>
            </select>
            <label htmlFor="key2DataDesc">Key 2 Description</label>
            <input
              type="text"
              name="key2DataDesc"
              value={cipherValues.keyArgs?.key2DataDesc || ""}
              onChange={(e) =>
                setCipherValues({
                  ...cipherValues,
                  keyArgs: {
                    ...cipherValues.keyArgs,
                    [e.target.name]: e.target.value,
                  },
                })
              }
              placeholder="i.e. not an even number or number 14"
              required
            />
          </>
        )}

        <label htmlFor="cipherDescription">Cipher Description</label>
        <textarea
          rows="5"
          type="text"
          name="cipherDescription"
          placeholder="About cipher"
          value={cipherValues.cipherDescription}
          onChange={(e) =>
            setCipherValues({
              ...cipherValues,
              [e.target.name]: e.target.value,
            })
          }
          required
        />
        <label htmlFor="cipherDescription">Cipher Key[s] Description</label>
        <textarea
          rows="5"
          type="text"
          name="keysDescription"
          placeholder="About cipher keys"
          value={cipherValues.keysDescription}
          onChange={(e) =>
            setCipherValues({
              ...cipherValues,
              [e.target.name]: e.target.value,
            })
          }
          required
        />
        <label htmlFor="cipherFile">Cipher Script File</label>
        <input type="file" name="cipherFile" accept=".py" />
        <p>
          <i>Current script file will be kept if no file is selected!</i>
        </p>
        <button
          type="submit"
          style={{ width: "150px", padding: "10px" }}
          className="contrast"
        >
          Update
        </button>
      </form>
    </article>
  );
};
export default ModifyCipher;
