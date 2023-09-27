import { createContext, useContext, useState } from "react";

// const initialState = {
//   cipherName: "",
//   cipherDescription: "",
//   keyType: "",
//   keyArgs: "",
//   keys: {},
//   user: "",
// };

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    cipherName: "",
    cipherDescription: "",
    keyType: "",
    keyArgs: "",
    keys: {},
    user: "",
  });

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { useAppContext, AppProvider };
