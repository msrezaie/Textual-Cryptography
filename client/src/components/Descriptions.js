import { useAppContext } from "../context/appContext";

const Descriptions = () => {
  const { globalState } = useAppContext();

  return (
    <article>
      <header>
        <h4>Description</h4>
      </header>
      <div className="container">
        <p id="cipher-desc">{globalState.cipherDescription}</p>
      </div>
    </article>
  );
};
export default Descriptions;
