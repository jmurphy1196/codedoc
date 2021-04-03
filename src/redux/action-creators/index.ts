import { ActionType } from "../action-types";
import { Dispatch } from "redux";
import {
  Direction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  UpdateCellAction,
  Action,
} from "../actions";
import bundle from "../../bundler/index";
import { CellType } from "../cell";
import axios from "axios";
import { History } from "history";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};
export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};
export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};
export const insertCellAfter = (
  id: string | null,
  cellType: CellType
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const { code, err } = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: {
          code,
          err,
        },
      },
    });
  };
};

interface User {
  id: string;
  email: string;
  codeDocs: string[];
}

export const setUser = (user: User) => {
  const { codeDocs, email, id } = user;
  return {
    type: ActionType.SIGN_IN,
    payload: {
      email,
      id,
      codeDocs,
    },
  };
};

export const signin = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOADING_USER,
      payload: {
        loading: true,
      },
    });

    try {
      const response = await axios.post(
        process.env.SERVER_URL || "http://localhost:3005/api/auth/signin",
        { email, password },
        {
          withCredentials: true,
        }
      );
      const { data } = response;
      console.log(response);
      if (data.email) {
        dispatch({
          type: ActionType.CLEAR_USER_ERROR,
          payload: {
            errors: [],
          },
        });
        dispatch({
          type: ActionType.SIGN_IN,
          payload: {
            codeDocs: data.codeDocs,
            id: data.id,
            email: data.email,
          },
        });
      }
      console.log(data);
    } catch (err) {
      console.log(err.request.response);
      if (err.request.response) {
        dispatch({
          type: ActionType.SET_USER_ERROR,
          payload: JSON.parse(err.request.response),
        });
      }
    }
  };
};

export const signout = () => {
  const response = axios.post(
    `${process.env.SERVER_URL || "http://localhost:3005"}/api/auth/signout`,
    {},
    { withCredentials: true }
  );

  return {
    type: ActionType.SIGN_OUT,
  };
};

export const getCodeDoc = (codeDoc: string, history: History) => {
  return async (dispatch: Dispatch<Action>) => {
    const { data } = await axios.get(
      `${
        process.env.SERVER_URL || "http://localhost:3005"
      }/api/codedoc/${codeDoc}`,
      {
        withCredentials: true,
      }
    );

    console.log(data);
    history.push("/");
  };
};
