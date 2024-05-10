// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Frameline } from "@evmosapps/ui-helpers/src/container/FrameLine";
import { ButtonWithLink } from "@evmosapps/ui-helpers/src/links/Button";
import { translation } from "@evmosapps/i18n/server";

export const ButtonSeedApps = async ({ totalApps }: { totalApps: number }) => {
  const { t } = await translation("dappStore");
  return (
    <Frameline>
      <ButtonWithLink className="w-full " href="/dapps">
        {t("ecosystem.button.text")} {totalApps} {t("ecosystem.button.text2")}
      </ButtonWithLink>
    </Frameline>
  );
};
