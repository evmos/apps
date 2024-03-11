// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { IBCWidget } from "@0xtfm/widget-ibc";
import "./tfm.css";

const Tfm = () => {
  return (
    <div>
      <IBCWidget projectId={""} />
    </div>
  );
};

export default Tfm;
