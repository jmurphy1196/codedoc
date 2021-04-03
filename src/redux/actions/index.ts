import { ActionType } from "../action-types/index";
import { Cell, CellType } from "../cell";

export type Direction = "up" | "down";

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}
export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}
export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellType;
  };
}
export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export interface Signin {
  type: ActionType.SIGN_IN;
  payload: {
    id: string;
    codeDocs: string[];
    email: string;
  };
}

export interface Signup {
  type: ActionType.SIGN_UP;
  payload: {
    id: string;
    codeDocs: string[];
    email: string;
  };
}

export interface LoadingUser {
  type: ActionType.LOADING_USER;
  payload: {
    loading: boolean;
  };
}

export interface Signout {
  type: ActionType.SIGN_OUT;
}

export interface SaveCodeDoc {
  type: ActionType.SAVE_CODEDOC;
  payload: {
    codeDoc: string;
  };
}

export interface LoadCodeDoc {
  type: ActionType.LOAD_CODEDOC;
  payload: {
    [cellId: string]: Cell;
  };
}
export interface UserError {
  message?: string;
  field?: string;
  code: number;
}

export interface SetUserErrors {
  type: ActionType.SET_USER_ERROR;
  payload: {
    errors: UserError[];
  };
}

export interface ClearLoadingUser {
  type: ActionType.CLEAR_LOADING_USER;
  payload: {
    loading: false;
  };
}

export interface ClearUserError {
  type: ActionType.CLEAR_USER_ERROR;
  payload: {
    errors: [];
  };
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction
  | Signin
  | Signup
  | LoadingUser
  | Signout
  | SaveCodeDoc
  | LoadCodeDoc
  | SetUserErrors
  | ClearLoadingUser
  | ClearUserError;
