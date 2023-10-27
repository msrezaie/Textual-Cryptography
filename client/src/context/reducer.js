import {
  SETUP_USER,
  LOGOUT_USER,
  SETUP_CIPHERS,
  UPDATE_CIPHER,
  SETUP_STAGED_CIPHER,
  SETUP_STAGED_USER,
  UPDATE_FETCHED_CIPHERS,
  UPDATE_KEYS,
  UPDATE_HISTORY,
  UPDATE_USER_STATE,
  GET_USER_HISTORY,
  GET_USERS,
  UPDATE_FETCHED_USERS,
  FETCH_CIPHERS,
  SETUP_SELECT_HISTORY,
  UPDATE_CIPHER_SELECT,
} from "./action";

const reducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      userEmail: "",
      role: "",
      history: [],
      fetchedUsers: [],
      selectHistoryId: "",
      selectHistoryCipher: "",
      selectHistoryPText: "",
      selectHistoryCText: "",
      selectHistoryKeys: {},
    };
  }
  if (action.type === SETUP_USER) {
    return {
      ...state,
      userEmail: action.payload.email,
      role: action.payload.role,
    };
  }
  if (action.type === FETCH_CIPHERS) {
    return {
      ...state,
      ciphers: action.payload.ciphers,
      cipherName: action.payload.cipherName,
      cipherDescription: action.payload.cipherDescription,
      keysDescription: action.payload.keysDescription,
      keyType: action.payload.keyType,
      keyArgs: action.payload.keyArgs,
    };
  }
  if (action.type === SETUP_CIPHERS) {
    return {
      ...state,
      cipherName: action.payload.cipherName,
      cipherDescription: action.payload.cipherDescription,
      keysDescription: action.payload.keysDescription,
      keyType: action.payload.keyType,
      keyArgs: action.payload.keyArgs,
    };
  }
  if (action.type === UPDATE_CIPHER) {
    return {
      ...state,
      cipherName: action.payload.cipherName,
      cipherDescription: action.payload.cipherDescription,
      keysDescription: action.payload.keysDescription,
      keyType: action.payload.keyType,
      keyArgs: action.payload.keyArgs,
      selectHistoryKeys: {},
    };
  }
  if (action.type === SETUP_STAGED_CIPHER) {
    return {
      ...state,
      stagedCipher: action.payload.selectedCipher,
    };
  }
  if (action.type === SETUP_STAGED_USER) {
    return {
      ...state,
      stagedUser: action.payload.selectedUser,
    };
  }
  if (action.type === UPDATE_HISTORY) {
    return {
      ...state,
      history: action.payload.newHistoryData,
    };
  }
  if (action.type === UPDATE_CIPHER_SELECT) {
    return {
      ...state,
      cipherName: action.payload.cipherName,
      cipherDescription: action.payload.cipherDescription,
      keysDescription: action.payload.keysDescription,
      keyType: action.payload.keyType,
      keyArgs: action.payload.keyArgs,
      selectHistoryKeys: action.payload.selectHistoryKeys,
    };
  }
  if (action.type === UPDATE_KEYS) {
    return {
      ...state,
      keys: action.payload.keys,
    };
  }
  if (action.type === UPDATE_FETCHED_CIPHERS) {
    return {
      ...state,
      ciphers: action.payload.newCiphers,
    };
  }
  if (action.type === SETUP_SELECT_HISTORY) {
    return {
      ...state,
      selectHistoryId: action.payload._id,
      selectHistoryCipher: action.payload.cipher,
      selectHistoryPText: action.payload.plaintext,
      selectHistoryCText: action.payload.ciphertext,
      selectHistoryKeys: action.payload.keys,
    };
  }
  if (action.type === GET_USER_HISTORY) {
    return {
      ...state,
      history: action.payload.history,
    };
  }
  if (action.type === GET_USERS) {
    return {
      ...state,
      fetchedUsers: action.payload.fetchedUsers,
    };
  }

  if (action.type === UPDATE_FETCHED_USERS) {
    return {
      ...state,
      fetchedUsers: action.payload.newUsers,
    };
  }
  if (action.type === UPDATE_USER_STATE) {
    return {
      ...state,
      userEmail: action.payload.email,
    };
  }
  throw new Error(`${action.type} action not defined!`);
};

export default reducer;
