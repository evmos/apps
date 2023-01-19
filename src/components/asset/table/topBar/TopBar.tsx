// import AssetsGuide from "../../modals/AssetsGuide";
import { Dispatch, SetStateAction } from "react";
import { TableData } from "../../../../internal/asset/functionality/table/normalizeData";
import ButtonsActions from "./ButtonsActions";
import { Container } from "./Container";

const TopBar = ({
  totalAssets,
  totalStaked,
  evmosPrice,
  setShow,
  setModalContent,
  tableData,
}: {
  totalAssets: string;
  totalStaked: string;
  evmosPrice: number;
  setShow: Dispatch<SetStateAction<boolean>>;
  setModalContent: Dispatch<SetStateAction<JSX.Element>>;
  tableData: TableData;
}) => {
  const actionsProps = {
    setShow,
    setModalContent,
    tableData,
  };
  return (
    <div className="mx-5 xl:mx-0 mb-5 bg-darkGray2 p-5 rounded-2xl font-[IBM] text-sm px-5 text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 space-y-2 sm:space-y-0 text-center items-center">
      <Container text="Total Assets" value={`$${totalAssets}`} />
      <Container text="Total Staked" value={totalStaked} />
      <Container
        text="EVMOS Price"
        value={evmosPrice === undefined ? "--" : `$${evmosPrice.toString()}`}
      />
      <ButtonsActions actionsProps={actionsProps} />
    </div>
  );
};

export default TopBar;
