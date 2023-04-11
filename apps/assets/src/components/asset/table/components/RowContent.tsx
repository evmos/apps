import { Description } from "./Description";

export const RowContent = ({
  symbol,
  imgSrc,
  valueInTokens,
  valueInDollars,
}: {
  symbol: string;
  imgSrc: string;
  valueInTokens: string;
  valueInDollars: string;
}) => {
  return (
    <div className="mr-8 flex w-full justify-between lg:mr-0">
      <Description symbol={symbol} imageSrc={imgSrc} description={""} />
      <div className="flex w-full flex-col items-end uppercase lg:w-[50%] lg:items-start">
        <span className="text-sm font-bold">{valueInTokens}</span>
        <span className="text-xs text-darkGray5">${valueInDollars}</span>
      </div>
    </div>
  );
};
