import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { ModifyBtns } from "../assets/wrappers/AdminWrapper";

const ModifyCipher = () => {
  const navigate = useNavigate();
  const { fetchCiphers, stagedCipher, setupStagedCipher } = useAppContext();

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
      cipherName,
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
        `/api/v1/admin/cipher/update/${stagedCipher._id}`,
        cipherData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.msg);
      setCipherValues({});
      setupStagedCipher({});
      fetchCiphers();
      navigate("/admin");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const cipherCancelHandler = async (e) => {
    e.preventDefault();
    setCipherValues({});
    setupStagedCipher({});
    navigate("/admin");
  };

  return (
    <article>
      <header>
        <strong>Update Cipher Details</strong>
      </header>
      <form onSubmit={cipherUpdateHandler}>
        <div className="grid">
          <hgroup>
            <strong>Cipher</strong>
            <p>A name for the Cipher.</p>
          </hgroup>
          <div className="profile-inputs-container">
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
          </div>
        </div>
        <div className="grid">
          <hgroup>
            <strong>Key Type</strong>
            <p>The number of Keys this Cipher require.</p>
          </hgroup>
          <div className="profile-inputs-container">
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
          </div>
        </div>

        {cipherValues.keyType === "1-key" && (
          <>
            <div className="grid">
              <hgroup>
                <strong>Key Data Type</strong>
                <p>Specify whether the Key can be a number or text.</p>
              </hgroup>
              <div className="profile-inputs-container">
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
              </div>
            </div>
          </>
        )}
        {cipherValues.keyType === "2-key" && (
          <>
            <div className="grid">
              <hgroup>
                <strong>Key 1 Data Type</strong>
                <p>Specify whether the first Key can be a number or text.</p>
              </hgroup>
              <div className="profile-inputs-container">
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
              </div>
            </div>
            <div className="grid">
              <hgroup>
                <strong>Key 2 Data Type</strong>
                <p>Specify whether the second Key can be a number or text.</p>
              </hgroup>
              <div className="profile-inputs-container">
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
              </div>
            </div>
          </>
        )}
        <div className="grid">
          <hgroup>
            <strong>Cipher Description</strong>
            <p>
              Description of the Cipher which will be shown once the Cipher is
              selected.
            </p>
          </hgroup>
          <div className="profile-inputs-container">
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
          </div>
        </div>
        <div className="grid">
          <hgroup>
            <strong>Cipher Key[s] Description</strong>
            <p>Any brief details about the second Key.</p>
          </hgroup>
          <div className="profile-inputs-container">
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
          </div>
        </div>

        <div className="grid">
          <hgroup>
            <strong>Cipher Script File</strong>
            <p>The algorithm file performing encryption/decryption.</p>
          </hgroup>
          <div className="">
            <input type="file" name="cipherFile" accept=".py" />
          </div>
        </div>
        <p>Note: Current script file will be kept if no file is selected!</p>
        <ModifyBtns>
          <button type="submit" className="contrast">
            Update
          </button>
          <button className="outline contrast" onClick={cipherCancelHandler}>
            Cancel
          </button>
        </ModifyBtns>
      </form>
    </article>
  );
};
export default ModifyCipher;
