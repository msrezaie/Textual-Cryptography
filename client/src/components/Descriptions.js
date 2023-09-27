import { useOperationContext } from "../pages/Landing";

const Descriptions = () => {
  const { operationVariables } = useOperationContext();

  return (
    <article>
      <header>
        <h4>Description</h4>
      </header>
      <div className="container">
        <p id="cipher-desc">{operationVariables.cipherDescription}</p>
      </div>
    </article>
  );
};
export default Descriptions;
