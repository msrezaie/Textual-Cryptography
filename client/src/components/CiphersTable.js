import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../context/appContext";
import { BtnWrapper } from "../assets/wrappers/TableWrapper";
import { useNavigate } from "react-router-dom";

const CiphersTable = () => {
  const navigate = useNavigate();
  const { ciphers } = useAppContext();
  const [adminCiphers, setAdminCiphers] = useState([...ciphers]);
  const [cipherURL, setCipherURL] = useState("");
  const downloadLink = useRef(null);

  const deleteBtn = async (e) => {
    const cipherName = e.target.value;
    try {
      const response = await axios.delete(
        `/api/v1/admin/cipher/delete/${cipherName}`
      );
      setAdminCiphers((previous) => {
        return previous.filter((cipher) => cipher.name !== cipherName);
      });
      toast.success(response.data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const modifyBtn = async (e) => {
    toast.info("not yet implemented");
  };

  const getFile = async (cipherName) => {
    // const cipherName = e.target.value;
    try {
      const response = await axios.get(
        `/api/v1/admin/cipher/file/${cipherName}`
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const url = window.URL.createObjectURL(blob);

      setCipherURL(url);

      if (downloadLink.current) {
        downloadLink.current.click();
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    setAdminCiphers([...ciphers]);
  }, [ciphers]);

  return (
    <article>
      <header>
        <strong>Existing Ciphers</strong>
      </header>
      <figure>
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cipher</th>
              <th scope="col">Key-Type</th>
              <th scope="col">File</th>
              <th scope="col">created at</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminCiphers.length > 0 &&
              adminCiphers.map((cipher, index) => {
                const cipherName = cipher.name;

                return (
                  <tr key={cipher._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{cipher.name}</td>
                    <td>{cipher.keyType}</td>
                    <td>
                      {/* eslint-disable-next-line */}
                      <a
                        style={{ display: "none" }}
                        href={cipherURL}
                        ref={downloadLink}
                        download={"cipherfile.py"}
                      ></a>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          borderColor: "none",
                          boxShadow: "none",
                          color: "#0070E0",
                          padding: 0,
                          textDecoration: "underline",
                          outline: "none",
                        }}
                        onClick={() => getFile(cipherName)}
                      >
                        {cipher.filePath}
                      </button>
                    </td>
                    <td>{cipher.createdAt}</td>
                    <td>
                      <BtnWrapper>
                        <li>
                          <button
                            className="contrast"
                            onClick={deleteBtn}
                            value={cipher.name}
                          >
                            Delete
                          </button>
                        </li>
                        <li>
                          <button
                            className="contrast"
                            value={cipher.name}
                            onClick={modifyBtn}
                          >
                            Modify
                          </button>
                        </li>
                      </BtnWrapper>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </figure>
      <button
        className="contrast"
        style={{ width: "150px", padding: "10px" }}
        onClick={() => navigate("/admin/addCipher")}
      >
        Add New
      </button>
    </article>
  );
};
export default CiphersTable;
