import {
  SETUP_USER,
  LOGOUT_USER,
  SETUP_CIPHERS,
  UPDATE_CIPHER,
  UPDATE_KEYS,
  GET_USER_HISTORY,
  GET_USERS,
  FETCH_CIPHERS,
} from "./action";

const reducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      userName: "",
      isAdmin: false,
      history: [],
      fetchedUsers: [],
    };
  }
  if (action.type === SETUP_USER) {
    return {
      ...state,
      userName: action.payload.name,
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
      keys: {},
    };
  }
  if (action.type === UPDATE_KEYS) {
    return {
      ...state,
      keys: action.payload.keys,
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
  throw new Error(`${action.type} action not defined!`);
};

export default reducer;
