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
    <div className="flex w-full">
      <Description symbol={symbol} imageSrc={imgSrc} description={""} />
      <div className="flex flex-col items-start uppercase w-[50%]">
        <span className="font-bold">{valueInTokens}</span>
        <span className="text-sm text-darkGray5">{valueInDollars}</span>
      </div>
    </div>
  );
};
