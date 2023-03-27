import { BAR_COLORS } from "./styles";

const BarWrapper = ({ percents }: { percents: string[] }) => {
  return (
    <div className="flex w-full h-4 rounded-lg overflow-hidden bg-darkGray1">
      <div
        className={`${BAR_COLORS.yes}`}
        style={{ width: `${percents[0]}%` }}
      ></div>
      <div
        className={`${BAR_COLORS.no}`}
        style={{ width: `${percents[1]}%` }}
      ></div>
      <div
        className={`${BAR_COLORS.abstain}`}
        style={{ width: `${percents[2]}%` }}
      ></div>
      <div
        className={`${BAR_COLORS.noWithVeto}`}
        style={{ width: `${percents[3]}%` }}
      ></div>
    </div>
  );
};

export default BarWrapper;
