import { Operation, Descriptions } from "../components";
import MainWrapper from "../assets/wrappers/MainWrapper";
import { createContext, useContext, useState } from "react";

const OperationContext = createContext();

export const useOperationContext = () => useContext(OperationContext);

const Landing = () => {
  const [operationVariables, setOperationVariables] = useState({
    cipherName: "",
    cipherDescription: "",
    keyType: "",
    keyArgs: "",
    keys: {},
  });

  return (
    <OperationContext.Provider
      value={{ operationVariables, setOperationVariables }}
    >
      <MainWrapper className="container">
        <Operation />
        <Descriptions />
      </MainWrapper>
    </OperationContext.Provider>
  );
};
export default Landing;
