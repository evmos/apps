// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { TopBarContainer, TopBarItem } from "ui-helpers";
import ButtonsActions from "./ButtonsActions";
import { TopBarProps } from "./types";

const TopBar = ({ topProps }: { topProps: TopBarProps }) => {
  const actionsProps = {
    setShow: topProps.setShow,
    setModalContent: topProps.setModalContent,
    tableData: topProps.tableData,
  };
  return (
    <TopBarContainer>
      <>
        <TopBarItem text="Total Assets" value={`$${topProps.totalAssets}`} />
        <TopBarItem
          text="EVMOS Price"
          value={
            topProps.evmosPrice === undefined
              ? "--"
              : `$${topProps.evmosPrice.toString()}`
          }
        />
        <ButtonsActions actionsProps={actionsProps} />
      </>
    </TopBarContainer>
  );
};

export default TopBar;
