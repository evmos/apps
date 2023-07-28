// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch } from "react";
import { AnyAction } from "redux";
import { SimpleSnackbar } from "./content/SimpleSnackbar";
import { ViewExplorerSnackbar } from "./content/ViexExplorerSnackbar";
import { ExclamationIcon } from "icons";
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
        ${type === SNACKBAR_TYPES.SUCCESS ? "bg-green text-white" : ""}
        ${type === SNACKBAR_TYPES.ERROR ? "bg-red text-white" : ""}
        ${type === SNACKBAR_TYPES.DEFAULT ? "bg-darkPearl text-darkGray2" : ""}
        shadow-[0px 4px 8px rgba(0, 0, 0, 0.5)] pointer-events-auto relative inline-flex min-w-[280px] max-w-[360px] overflow-hidden rounded-lg p-2`}
      >
        <div className="w-full flex-auto space-x-2 self-center p-2">
          <div className="flex w-full items-center font-bold">
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
