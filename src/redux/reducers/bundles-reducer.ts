import produce from "immer";
import { Reducer } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface BundleState {
  [cellId: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: BundleState = {};

const bundleReducer: Reducer<BundleState, Action> = produce(
  (state: BundleState = initialState, action: Action): BundleState => {
    switch (action.type) {
      case ActionType.BUNDLE_START: {
        const { cellId } = action.payload;
        state[cellId] = {
          loading: true,
          code: "",
          err: "",
        };

        return state;
      }
      case ActionType.BUNDLE_COMPLETE: {
        const {
          bundle: { code, err },
          cellId,
        } = action.payload;
        state[cellId] = {
          loading: false,
          code,
          err,
        };
        return state;
      }
      default:
        return state;
    }
  }
);

export default bundleReducer;
