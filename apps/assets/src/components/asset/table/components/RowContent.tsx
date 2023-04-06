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
    <div className="flex w-full justify-between mr-8 lg:mr-0">
      <Description symbol={symbol} imageSrc={imgSrc} description={""} />
      <div className="flex flex-col items-end w-full lg:items-start uppercase lg:w-[50%]">
        <span className="font-bold text-sm">{valueInTokens}</span>
        <span className="text-xs text-darkGray5">${valueInDollars}</span>
      </div>
    </div>
  );
};
