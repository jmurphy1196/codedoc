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

import { Cell } from "../cell";

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

export const signinOrSignup = (
  email: string,
  password: string,
  confirmPassword: string | null = null
) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOADING_USER,
      payload: {
        loading: true,
      },
    });

    try {
      let response;
      if (!confirmPassword) {
        response = await axios.post(
          process.env.SERVER_URL ||
            "https://code-doc-backend.herokuapp.com/api/auth/signin",
          { email, password },
          {
            withCredentials: true,
          }
        );
      } else {
        response = await axios.post(
          process.env.SERVER_URL ||
            "https://code-doc-backend.herokuapp.com/api/auth/signup",
          { email, password, confirmPassword },
          {
            withCredentials: true,
          }
        );
      }
      const { data } = response;
      console.log(data);
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
      } else {
        dispatch({
          type: ActionType.SET_USER_ERROR,
          payload: {
            errors: [
              {
                message: "Network error",
                code: 500,
              },
            ],
          },
        });
      }
    }
  };
};

export const signout = () => {
  const response = axios.post(
    `${
      process.env.SERVER_URL || "https://code-doc-backend.herokuapp.com"
    }/api/auth/signout`,
    {},
    { withCredentials: true }
  );

  return {
    type: ActionType.SIGN_OUT,
  };
};

export const getCodeDoc = (
  codeDoc: string,
  history: History | null = null,
  isShared = false,
  sharedUserId: string | null = null
) => {
  return async (dispatch: Dispatch<Action>) => {
    let response;
    try {
      if (!isShared) {
        response = await axios.get(
          `${
            process.env.SERVER_URL || "https://code-doc-backend.herokuapp.com"
          }/api/codedoc/${codeDoc}`,
          {
            withCredentials: true,
          }
        );
      } else {
        response = await axios.get(
          `${
            process.env.SERVER_URL || "https://code-doc-backend.herokuapp.com"
          }/api/codedoc/share/${sharedUserId}/${codeDoc}`,
          {
            withCredentials: true,
          }
        );
      }
      const { data } = response;

      console.log(data);
      if (!data.errors) {
        dispatch({
          type: ActionType.LOAD_CODEDOC,
          payload: {
            data: data.data,
            order: data.order,
            currentDoc: codeDoc,
          },
        });
        if (history) {
          history.push("/");
        }
      }
    } catch (err) {
      console.log("THERE WAS AN ERROR");
      if (err.response?.data) {
        dispatch({
          type: ActionType.SET_USER_ERROR,
          payload: {
            errors: err.response.data.errors,
          },
        });
      } else {
        dispatch({
          type: ActionType.SET_USER_ERROR,
          payload: {
            errors: [
              {
                message: err.toJSON().message,
                code: 500,
              },
            ],
          },
        });
      }
    }
  };
};

interface codeDocState {
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

export const saveCodeDoc = (codeDoc: codeDocState, documentName: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const { data } = await axios.post(
      `${
        process.env.SERVER_URL || "https://code-doc-backend.herokuapp.com"
      }/api/codedoc/save-code-doc`,
      {
        codeDoc,
        documentName,
      },
      { withCredentials: true }
    );
    console.log(data);
  };
};

export const getUserCodeDocs = () => {
  return async (dispatch: Dispatch<Action>) => {
    const { data } = await axios.get(
      `${
        process.env.SERVER_URL || "https://code-doc-backend.herokuapp.com"
      }/api/codedoc`,
      { withCredentials: true }
    );

    if (!data.errors) {
      dispatch({
        type: ActionType.GET_CODEDOCS,
        payload: data,
      });
    }
  };
};

export const deleteCodeDoc = (documentName: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const { data } = await axios.post(
      `${
        process.env.SERVER_URL || "https://code-doc-backend.herokuapp.com"
      }/api/codedoc/remove-code-doc`,
      { documentName },
      { withCredentials: true }
    );
    if (!data.errors) {
      dispatch({
        type: ActionType.DELETE_CODEDOC,
        payload: {
          documentName,
        },
      });
    }
  };
};

export const clearUserError = () => {
  return {
    type: ActionType.CLEAR_USER_ERROR,
    payload: {
      errors: [],
    },
  };
};
