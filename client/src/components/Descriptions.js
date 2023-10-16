import { useAppContext } from "../context/appContext";

const Descriptions = () => {
  const { cipherDescription, keysDescription } = useAppContext();

  return (
    <article>
      <header>
        <strong>Description</strong>
      </header>
      <div className="grid">
        <div className="container">
          <h6>About This Cipher</h6>
          <p>{cipherDescription}</p>
        </div>
        <div className="container">
          <h6>About Cipher Key[s]</h6>
          <p>{keysDescription}</p>
        </div>
      </div>
    </article>
  );
};
export default Descriptions;
