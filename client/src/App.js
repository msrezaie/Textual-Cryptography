import { useState, useEffect } from "react";

const Dummy = () => {
  const [key, setKey] = useState(false);

  const inputHandler = () => {
    if (key) {
      setKey(false);
      return;
    }
    setKey(true);

    console.log("pressed");
    return;
  };

  return (
    <>
      <input type="text" />
      <button className="btn" onClick={inputHandler}>
        Toggle
      </button>
    </>
  );
};

const App = () => {
  return <Dummy />;
};

export default App;
