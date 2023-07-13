// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useState } from "react";
import { Intro } from "./Intro";
import Transak from "./Transak";
import Onboard from "./Onboard";

export const TopUp = () => {
  const [topUpType, setTopUpType] = useState("intro");

  function renderScreen() {
    if (topUpType === "intro") {
      return <Intro setTopUpType={setTopUpType} />;
    } else {
      return (
        <Onboard topUpType={topUpType}>
          {topUpType === "card" ? <Transak /> : <></>}
        </Onboard>
      );
    }
  }

  return <section className="space-y-3">{renderScreen()}</section>;
};
