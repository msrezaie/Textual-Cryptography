import { useAppContext } from "../context/appContext";

const Descriptions = () => {
  const { globalState } = useAppContext();
  return (
    <article>
      <header>
        <strong>Description</strong>
      </header>
      <p id="cipher-desc">{globalState.cipherDescription}</p>
    </article>
  );
};
export default Descriptions;
