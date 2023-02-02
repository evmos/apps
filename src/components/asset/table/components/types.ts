import { BigNumber } from "ethers";
import { Dispatch, SetStateAction } from "react";
import { TableDataElement } from "../../../../internal/asset/functionality/table/normalizeData";

export type SubRowProps = {
  item: TableDataElement;
  setShow: Dispatch<SetStateAction<boolean>>;
  setModalContent: Dispatch<SetStateAction<JSX.Element>>;
  isIBCBalance?: boolean;
  feeBalance: BigNumber;
};

export type DescriptionProps = {
  symbol: string;
  description: string;
  subRow?: boolean;
};
