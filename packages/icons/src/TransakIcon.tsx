// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type TransakIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const TransakIcon: React.FC<TransakIconProps> = ({
  width = "40",
  height = "40",
  ...restProps
}) => {
  return (
    <svg
      {...restProps}
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="url(#transakbg)"
        d="M20 40a20 20 0 1 0 0-40 20 20 0 0 0 0 40Z"
      />
      <path
        fill="#fff"
        d="m33 19-6-6a2 2 0 0 0-2 0l-9 9v-8a2 2 0 0 0-3 0v8l-3-3a2 2 0 0 0-3 2l6 6h2l9-9v8a2 2 0 0 0 3 0v-8l3 3a2 2 0 0 0 3-2Z"
      />
      <defs>
        <linearGradient
          id="transakbg"
          x1="2.7"
          x2="37.3"
          y1="10"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".1" stopColor="#348BED" />
          <stop offset=".3" stopColor="#2B80E8" />
          <stop offset=".6" stopColor="#1461DB" />
          <stop offset=".7" stopColor="#0E57D7" />
        </linearGradient>
      </defs>
    </svg>
  );
};
