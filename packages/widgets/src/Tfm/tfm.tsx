// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { IBCWidget } from "@0xtfm/widget-ibc";
import "./tfm.css";

const Tfm = () => {
  return (
    <div>
      <IBCWidget
        enabledModes={["swap", "transfer"]}
        options={{
          destinationChain: "evmos_9001-2",
          destinationDenom: "aevmos",
        }}
        projectId={""}
      />
    </div>
  );
};

export default Tfm;
