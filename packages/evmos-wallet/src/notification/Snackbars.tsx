// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch } from "react";
import { AnyAction } from "redux";
import { Snackbar as SnackbarType } from "./redux/notificationSlice";

import Snackbar from "./Snackbar";

export function Snackbars({
  valueRedux,
  dispatch,
}: {
  valueRedux: SnackbarType[];
  dispatch: Dispatch<AnyAction>;
}) {
  return (
    <div className="fixed bottom-3 left-3 z-[100] space-y-5">
      {valueRedux.map((e) => {
        return (
          <Snackbar
            type={e.type}
            content={e.content}
            id={e.id}
            key={e.id}
            dispatch={dispatch}
          />
        );
      })}
    </div>
  );
}
