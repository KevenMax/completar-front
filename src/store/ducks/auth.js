import { createActions, createReducer } from "reduxsauce";

export const { Types, Creators } = createActions({
  notifyLogout: ["text"]
});

//console.log(Types, Creators);

const INITIAL_STATE = {
  message: ""
};

const notify = (state = INITIAL_STATE, action) => ({
  ...state,
  message: action.text
});

export default createReducer(INITIAL_STATE, {
  [Types.NOTIFY_LOGOUT]: notify
});
