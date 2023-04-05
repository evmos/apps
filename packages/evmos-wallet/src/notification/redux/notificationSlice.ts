import { createSlice } from "@reduxjs/toolkit";
import { StoreType } from "../../redux/Store";
import Snackbar from "../Snackbar";

export type Snackbar = {
  type: string;
  content: {
    type: string;
    title: string;
    text?: string;
    hash?: string;
    explorerTxUrl?: string;
  };
  id: number;
};

const initialValue: { currentId: number; snackbars: Snackbar[] } = {
  currentId: 0,
  snackbars: [],
};

export const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState: {
    value: initialValue,
  },
  reducers: {
    addSnackbar: (state, action: { type: string; payload: Snackbar }) => {
      const newMap = state.value.snackbars;
      action.payload.id = state.value.currentId;
      newMap.push(action.payload);
      state.value.currentId = state.value.currentId + 1;
      state.value.snackbars = newMap;
    },
    removeSnackbar: (
      state,
      action: { type: string; payload: { id: number } }
    ) => {
      const newMap: Snackbar[] = [];
      state.value.snackbars.forEach((v) => {
        if (v.id !== action.payload.id) {
          newMap.push(v);
        }
      });
      state.value.snackbars = newMap;
    },
  },
});

export const { addSnackbar, removeSnackbar } = notificationSlice.actions;

export const getAllSnackbars = (state: StoreType) => {
  const snackbars: Snackbar[] = [];
  state.snackbar.value.snackbars.forEach((v) => {
    snackbars.push(v);
  });
  snackbars.sort((a, b) => {
    if (a.id > b.id) {
      return 1;
    } else if (a.id < b.id) {
      return -1;
    }
    return 0;
  });
  return snackbars;
};

export const NotificacionReducer = notificationSlice.reducer;
export type NotificationType = typeof notificationSlice;
