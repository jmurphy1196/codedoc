import { Reducer } from "redux";
import { ActionType } from "../action-types";
import { Action, UserError } from "../actions";
import produce from "immer";

interface UserState {
  loading: boolean;
  id: string | null;
  codeDocs: string[];
  errors: UserError[];
  email: string | null;
}

const initialState: UserState = {
  loading: false,
  id: null,
  codeDocs: [],
  errors: [],
  email: null,
};

const reducer: Reducer<UserState, Action> = produce(
  (state: UserState = initialState, action: Action): UserState => {
    switch (action.type) {
      case ActionType.LOADING_USER: {
        const { loading } = action.payload;
        state.loading = loading;
        return state;
      }
      case ActionType.SIGN_IN: {
        const { codeDocs, id, email } = action.payload;
        state.codeDocs = [...codeDocs];
        state.id = id;
        state.email = email;
        state.loading = false;

        return state;
      }

      case ActionType.SIGN_UP: {
        const { codeDocs, id } = action.payload;
        state.codeDocs = [...codeDocs];
        state.id = id;
        state.loading = false;

        return state;
      }
      case ActionType.SIGN_OUT:
        state.id = null;
        state.loading = false;
        state.codeDocs = [];
        return state;

      case ActionType.SAVE_CODEDOC: {
        const { codeDoc } = action.payload;
        state.loading = false;
        state.codeDocs = [...state.codeDocs, codeDoc];
        return state;
      }
      case ActionType.SET_USER_ERROR: {
        const { errors } = action.payload;

        state.errors = errors;

        return state;
      }
      case ActionType.CLEAR_LOADING_USER: {
        state.loading = false;
        return state;
      }
      case ActionType.CLEAR_USER_ERROR: {
        state.errors = [];
        return state;
      }
      default:
        return state;
    }
  }
);

export default reducer;
