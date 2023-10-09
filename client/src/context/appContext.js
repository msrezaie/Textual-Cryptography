import axios from "axios";
import reducer from "./reducer";
import { toast } from "react-toastify";
import { createContext, useContext, useEffect, useReducer } from "react";

import {
  SETUP_USER,
  LOGOUT_USER,
  SETUP_CIPHERS,
  FETCH_CIPHERS,
  GET_USER_HISTORY,
  UPDATE_CIPHER,
  UPDATE_KEYS,
  GET_USERS,
} from "./action";

const initialState = {
  userName: "",
  history: [],
  fetchedUsers: [],
  isAdmin: false,
  ciphers: [],
  cipherName: "",
  cipherDescription: "",
  keysDescription: "",
  keyType: "",
  keyArgs: "",
  keys: {},
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginUser = async (userInfo) => {
    try {
      const { data } = await axios.post("/api/v1/auth/login", userInfo);
      const { name, isAdmin } = data;
      dispatch({
        type: SETUP_USER,
        payload: { name, isAdmin },
      });
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const signUpUser = async (userInfo) => {
    try {
      const { data } = await axios.post("/api/v1/auth/signup", userInfo);
      const { name, isAdmin } = data;
      dispatch({
        type: SETUP_USER,
        payload: { name, isAdmin },
      });
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      dispatch({ type: LOGOUT_USER });
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const fetchCiphers = async () => {
    try {
      const { data } = await axios.get("/api/v1/cryptography/ciphers");
      if (data.count < 1) {
        toast.error("No Data, App is not Functional!", { autoClose: false });
      } else {
        const firstCipher = data.cipher[0];

        dispatch({
          type: FETCH_CIPHERS,
          payload: {
            ciphers: data.cipher,
            cipherName: firstCipher.name,
            cipherDescription: firstCipher.cipherDescription,
            keysDescription: firstCipher.keysDescription,
            keyType: firstCipher.keyType,
            keyArgs: firstCipher.keyArgs,
          },
        });
      }
    } catch (error) {
      toast.error(error.response.data, { autoClose: false });
    }
  };

  const fetchHistoryData = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/history");
      dispatch({ type: GET_USER_HISTORY, payload: { history: data.history } });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/users");
      dispatch({ type: GET_USERS, payload: { fetchedUsers: data.users } });
    } catch (error) {
      console.log(error);
    }
  };

  const setupCiphers = () => {
    const firstCipher = state.ciphers[0];
    dispatch({
      type: SETUP_CIPHERS,
      payload: {
        cipherName: firstCipher?.name,
        cipherDescription: firstCipher?.cipherDescription,
        keysDescription: firstCipher?.keysDescription,
        keyType: firstCipher?.keyType,
        keyArgs: firstCipher?.keyArgs,
      },
    });
  };

  const updateCipher = (cipherInfo) => {
    dispatch({
      type: UPDATE_CIPHER,
      payload: {
        cipherName: cipherInfo.cipherName,
        cipherDescription: cipherInfo.cipherDescription,
        keysDescription: cipherInfo.keysDescription,
        keyType: cipherInfo.keyType,
        keyArgs: cipherInfo.keyArgs,
      },
    });
  };

  const updateKeys = (keyInfo) => {
    dispatch({
      type: UPDATE_KEYS,
      payload: {
        keys: keyInfo,
      },
    });
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/getCurrentUser");
      const { name, isAdmin } = data;
      dispatch({
        type: SETUP_USER,
        payload: { name, isAdmin },
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    getCurrentUser();
    fetchCiphers();
  }, []);

  useEffect(() => {
    if (state.userName) {
      fetchHistoryData();
    }
    if (state.isAdmin) {
      fetchUsers();
    }
  }, [state.userName, state.isAdmin]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        signUpUser,
        loginUser,
        logout,
        updateCipher,
        updateKeys,
        fetchCiphers,
        setupCiphers,
        fetchHistoryData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { useAppContext, AppProvider };
