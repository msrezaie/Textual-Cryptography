import {
  SETUP_USER,
  LOGOUT_USER,
  SETUP_CIPHERS,
  UPDATE_CIPHER,
  UPDATE_KEYS,
  UPDATE_HISTORY,
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
      isAdmin: false,
      history: [],
      fetchedUsers: [],
    };
  }
  if (action.type === SETUP_USER) {
    return {
      ...state,
      userEmail: action.payload.email,
      isAdmin: action.payload.isAdmin,
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
  throw new Error(`${action.type} action not defined!`);
};

export default reducer;
