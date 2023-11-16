import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { dragEndReducer } from "./reducers/dragEnd";
import { moveBelowReducer } from "./reducers/moveBelow";

// yaa aik variable bana raha ha intialState
const initialState: {
  board: string[];
  boardSize: number;
  // these down 2 are related to ui elements
  squareBeingReplaced: Element | undefined;
  squareBeingDragged: Element | undefined;
} = {
  board: [],
  boardSize: 8,
  squareBeingDragged: undefined,
  squareBeingReplaced: undefined,
};

const candyCrushSlice = createSlice({
  name: "candyCrush",
  initialState,
  reducers: {
    updateBoard: (state, action: PayloadAction<string[]>) => {
      state.board = action.payload;
    },
    dragStart: (state, action: PayloadAction<any>) => {
      state.squareBeingDragged = action.payload;
    },
    dragDrop: (state, action: PayloadAction<any>) => {
      state.squareBeingReplaced = action.payload;
    },
    dragEnd: dragEndReducer,
    moveBelow: moveBelowReducer,
  },
});

export const store = configureStore({
  reducer: {
    candyCrush: candyCrushSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const { updateBoard, moveBelow, dragDrop, dragEnd, dragStart } =
  candyCrushSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
