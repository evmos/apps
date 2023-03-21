import { useMemo } from "react";
import { buildD } from "./helpers";

const ORDERED_COLOR_LIST = ["#ed4e33", "#edcd5b", "#faf1e4"];
const cDarkGray5 = "#918378";
const transparent = "rgba(0,0,0,0)";

type Arc = { color?: string; percentage: number };

type ArcProps = React.SVGAttributes<SVGElement> & {
  items: Arc[];
  range?: number;
};

const Arc: React.FC<ArcProps> = ({ items, range = 240, ...restProps }) => {
  const strokeWidth = 6;

  const paths = useMemo(() => {
    if (!items?.length) {
      return [
        {
          d: buildD(0, 100, strokeWidth, range),
          stroke: cDarkGray5,
          key: cDarkGray5,
        },
      ];
    }

    let acc = 0;
    return items?.map(({ color, percentage }, i) => {
      const d = buildD(acc, percentage, strokeWidth, range);
      const stroke =
        percentage > 0 ? color || ORDERED_COLOR_LIST[i] : transparent;
      acc += percentage;

      return { d, stroke, key: i };
    });
  }, [items, range]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 100 ${
        50 + Math.cos((((360 - range) / 2) * Math.PI) / 180) * 50
      }`}
      fill="transparent"
      {...restProps}
    >
      {paths.map(({ key, ...pathProps }) => (
        <path
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          key={key}
          {...pathProps}
        />
      ))}
    </svg>
  );
};

export default Arc;
