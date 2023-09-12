// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { StatefulHeader } from "stateful-components";
import { StatefulFooter } from "stateful-components";
import { ContentDappStore } from "./dappStore/ContentDappStore";
import { useTranslation } from "next-i18next";
const MainContainer = () => {
  const { t } = useTranslation();

  return (
    <>
      <StatefulHeader pageName={t("appTitle")} page="mission" />
      <div className="container mx-auto mb-auto overflow-auto">
        <ContentDappStore />
      </div>
      <StatefulFooter />
    </>
  );
};

export default MainContainer;
