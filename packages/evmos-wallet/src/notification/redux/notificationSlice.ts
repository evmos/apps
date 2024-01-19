// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { createSlice } from "@reduxjs/toolkit";
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

const notificationSlice = createSlice({
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
      action: { type: string; payload: { id: number } },
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

export const NotificacionReducer = notificationSlice.reducer;
