import Image from "next/image";

export const Description = ({
  symbol,
  description,
}: {
  symbol: string;
  description: string;
}) => {
  return (
    <div className="flex items-center space-x-5">
      <Image
        src={`/assets/tokens/${symbol.toLocaleLowerCase()}.png`}
        alt={symbol}
        width={35}
        height={35}
      />
      <div className="flex flex-col items-start ">
        <span className="font-bold">{symbol}</span>
        <span className="text-sm text-darkGray5">{description}</span>
      </div>
    </div>
  );
};
