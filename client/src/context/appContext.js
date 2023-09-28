import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    user: "",
    isAdmin: false,
  });

  const [globalState, setGlobalState] = useState({
    ciphers: "",
    cipherName: "",
    cipherDescription: "",
    keyType: "",
    keyArgs: "",
    keys: {},
    isLoading: false,
  });

  const logout = async () => {
    try {
      await axios.get("/auth/logout");
      setUserState({ user: "", isAdmin: false });
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/auth/getCurrentUser");
      setUserState({ user: data.name, isAdmin: data.isAdmin });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AppContext.Provider
      value={{ userState, setUserState, globalState, setGlobalState, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { useAppContext, AppProvider };
