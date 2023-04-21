// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch } from "react";
import { AnyAction } from "redux";
import { SimpleSnackbar } from "./content/SimpleSnackbar";
import { ViewExplorerSnackbar } from "./content/ViexExplorerSnackbar";
import ExclamationIcon from "./icons/ExclamationIcon";
import SuccessIcon from "./icons/SuccessIcon";
import TriangleHazardIcon from "./icons/TriangleHazardIcon";
import { removeSnackbar } from "./redux/notificationSlice";
import { SNACKBAR_CONTENT_TYPES, SNACKBAR_TYPES } from "./types";

const Snackbar = ({
  type,
  content,
  id,
  dispatch,
}: {
  type: string;
  content: {
    type: string;
    title: string;
    text?: string;
    hash?: string;
    explorerTxUrl?: string;
  };
  id: number;
  dispatch: Dispatch<AnyAction>;
}) => {
  let icon;
  if (type === SNACKBAR_TYPES.DEFAULT) {
    icon = <ExclamationIcon />;
  } else if (type === SNACKBAR_TYPES.ERROR) {
    icon = <TriangleHazardIcon color="white" />;
  } else if (type === SNACKBAR_TYPES.SUCCESS) {
    icon = <SuccessIcon color="white" />;
  }

  return (
    <div
      onAnimationEnd={() => {
        // remove me from state
        dispatch(removeSnackbar({ id }));
      }}
      className="animation z-[9999]"
      key={id}
    >
      <div
        className={`
        ${type === SNACKBAR_TYPES.SUCCESS ? "text-white bg-green" : ""}
        ${type === SNACKBAR_TYPES.ERROR ? "text-white bg-red" : ""}
        ${type === SNACKBAR_TYPES.DEFAULT ? "bg-darkPearl text-darkGray2" : ""}
        inline-flex relative p-2 min-w-[280px] max-w-[360px] overflow-hidden rounded-lg shadow-[0px 4px 8px rgba(0, 0, 0, 0.5)] pointer-events-auto`}
      >
        <div className="space-x-2 flex-auto p-2 self-center w-full">
          <div className="flex font-bold items-center w-full">
            <div className="pr-3">{icon}</div>
            {content.type === SNACKBAR_CONTENT_TYPES.TEXT && (
              <SimpleSnackbar title={content.title} text={content.text} />
            )}
            {content.type === SNACKBAR_CONTENT_TYPES.LINK &&
              content.hash !== undefined &&
              content.explorerTxUrl !== undefined && (
                <ViewExplorerSnackbar
                  values={{
                    title: content.title,
                    hash: content.hash,
                    explorerTxUrl: content.explorerTxUrl,
                  }}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Snackbar;
