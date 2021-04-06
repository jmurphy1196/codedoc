import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";
import produce from "immer";
import { Reducer } from "redux";

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer: Reducer<CellState, Action> = produce(
  (state: CellState = initialState, action: Action): CellState => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { content, id } = action.payload;
        state.data[id].content = content;
        return state;

      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const cellToMove = state.order.findIndex(
          (cellId) => cellId === action.payload.id
        );
        if (cellToMove === -1) return state;
        const temp = state.order[cellToMove];
        if (direction === "up" && cellToMove !== 0) {
          state.order[cellToMove] = state.order[cellToMove - 1];
          state.order[cellToMove - 1] = temp;
        }
        if (direction === "down" && cellToMove !== state.order.length - 1) {
          state.order[cellToMove] = state.order[cellToMove + 1];
          state.order[cellToMove + 1] = temp;
        }
        return state;
      case ActionType.INSERT_CELL_AFTER:
        const { type } = action.payload;
        const newCell: Cell = {
          content: "",
          id: randomId(),
          type,
        };
        state.data[newCell.id] = newCell;
        const cellInd = state.order.findIndex(
          (cellId) => cellId === action.payload.id
        );
        //insert a new cell on the end
        if (cellInd === -1) {
          state.order.unshift(newCell.id);
        } else {
          state.order.splice(cellInd + 1, 0, newCell.id);
        }
        return state;
      case ActionType.DELETE_CELL:
        const cellId = action.payload;
        const cellToDeleteInd = state.order.findIndex(
          (cell) => cell === cellId
        );
        state.order.splice(cellToDeleteInd, 1);
        delete state.data[cellId];
        return state;

      case ActionType.LOAD_CODEDOC:
        const { data, order } = action.payload;
        state.data = data;
        state.order = order;
        return state;
      default:
        break;
    }
    return state;
  }
);

const randomId = (): string => {
  return Math.random().toString(36).substr(2, 5);
};

export default reducer;
