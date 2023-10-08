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
          <h6>About Cipher</h6>
          <p>{cipherDescription}</p>
        </div>
        <div className="container">
          <h6>About Key[s]</h6>
          <p>{keysDescription}</p>
        </div>
      </div>
    </article>
  );
};
export default Descriptions;
