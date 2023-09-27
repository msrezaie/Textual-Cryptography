import { useAppContext } from "../context/appContext";

const Descriptions = () => {
  const { state } = useAppContext();

  return (
    <article>
      <header>
        <h4>Description</h4>
      </header>
      <div className="container">
        <p id="cipher-desc">{state.cipherDescription}</p>
      </div>
    </article>
  );
};
export default Descriptions;
