import { Branding } from "./Branding";
import { LaunchPad } from "./LaunchPad";

import { ConnectModalButton } from "./ConnectModalButton";
import { Container } from "@evmosapps/ui-helpers";
import { EvmosPrice } from "./TokenPrice";
import { Suspense } from "react";

export const Header = () => {
  return (
    <Container
      full
      className="flex flex-col text-pearl md:flex-row md:items-center md:justify-between my-5 md:my-8 items-center gap-y-6"
    >
      <Branding />

      <div className="flex items-center space-x-3 text-xs sm:text-base leading-none">
        <EvmosPrice />
        <LaunchPad />
        <Suspense>
          <ConnectModalButton />
        </Suspense>
      </div>
    </Container>
  );
};
