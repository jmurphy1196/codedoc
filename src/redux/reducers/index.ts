import CellsReducer from "./cells-reducer";
import BundleReducer from "./bundles-reducer";
import UserReducer from "./user-reducer";

import { combineReducers } from "redux";

const reducers = combineReducers({
  cells: CellsReducer,
  bundles: BundleReducer,
  user: UserReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
