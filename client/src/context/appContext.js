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
  SETUP_STAGED_CIPHER,
  UPDATE_FETCHED_CIPHERS,
  UPDATE_KEYS,
  UPDATE_USER_STATE,
  UPDATE_HISTORY,
  UPDATE_FETCHED_USERS,
  SETUP_SELECT_HISTORY,
  GET_USERS,
} from "./action";

let initialState = {
  userEmail: "",
  history: [],
  fetchedUsers: [],
  isAdmin: false,
  ciphers: [],
  stagedCipher: {},
  cipherName: "",
  cipherDescription: "",
  keysDescription: "",
  keyType: "",
  keyArgs: "",
  keys: {},
  selectHistoryId: "",
  selectHistoryCipher: "",
  selectHistoryPText: "",
  selectHistoryCText: "",
  selectHistoryKeys: {},
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginUser = async (userInfo) => {
    try {
      const { data } = await axios.post("/api/v1/auth/login", userInfo);
      const { email, isAdmin } = data;
      dispatch({
        type: SETUP_USER,
        payload: { email, isAdmin },
      });
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const signUpUser = async (userInfo) => {
    try {
      const { data } = await axios.post("/api/v1/auth/signup", userInfo);
      const { email, isAdmin } = data;
      dispatch({
        type: SETUP_USER,
        payload: { email, isAdmin },
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
        const fetchedCiphers = data.ciphers.sort((a, b) =>
          a.cipherName < b.cipherName ? -1 : a.cipherName > b.cipherName ? 1 : 0
        );
        const firstCipher = fetchedCiphers[0];

        dispatch({
          type: FETCH_CIPHERS,
          payload: {
            ciphers: fetchedCiphers,
            cipherName: firstCipher.cipherName,
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
      const { data } = await axios.get("/api/v1/history");
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
        cipherName: firstCipher?.cipherName,
        cipherDescription: firstCipher?.cipherDescription,
        keysDescription: firstCipher?.keysDescription,
        keyType: firstCipher?.keyType,
        keyArgs: firstCipher?.keyArgs,
      },
    });
  };

  const setupStagedCipher = (selectedCipher) => {
    dispatch({
      type: SETUP_STAGED_CIPHER,
      payload: {
        selectedCipher,
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

  const updateFetchedCiphers = (newCiphers) => {
    dispatch({
      type: UPDATE_FETCHED_CIPHERS,
      payload: {
        newCiphers,
      },
    });
  };

  const updateHistory = (newHistoryData) => {
    dispatch({
      type: UPDATE_HISTORY,
      payload: {
        newHistoryData,
      },
    });
  };

  const updateFetchedUsers = (newUsers) => {
    dispatch({
      type: UPDATE_FETCHED_USERS,
      payload: {
        newUsers,
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

  const updateUser = (userInfo) => {
    dispatch({
      type: UPDATE_USER_STATE,
      payload: {
        email: userInfo,
      },
    });
  };

  const setupSelectHistory = (historyInfo) => {
    const { _id, keys, cipher, plaintext, ciphertext } = historyInfo;
    dispatch({
      type: SETUP_SELECT_HISTORY,
      payload: { _id, keys, cipher, plaintext, ciphertext },
    });
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/getCurrentUser");
      const { email, isAdmin } = data;
      dispatch({
        type: SETUP_USER,
        payload: { email, isAdmin },
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
    if (state.userEmail) {
      fetchHistoryData();
    }
    if (state.isAdmin) {
      fetchUsers();
    }
  }, [state.userEmail, state.isAdmin]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        signUpUser,
        loginUser,
        logout,
        updateCipher,
        setupStagedCipher,
        updateKeys,
        updateUser,
        updateHistory,
        updateFetchedCiphers,
        updateFetchedUsers,
        setupSelectHistory,
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
