// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type WalletConnectIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const WalletConnectIcon: React.FC<WalletConnectIconProps> = ({
  width = "40",
  height = "38",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...restProps}
    >
      <g clipPath="url(#a)">
        <mask
          id="b"
          width="40"
          height="40"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "luminance" }}
        >
          <path fill="#fff" d="M0 0h40v40H0V0Z" />
        </mask>
        <g mask="url(#b)">
          <path
            fill="#3396FF"
            stroke="#66B1FF"
            d="M20 40a20 20 0 1 0 0-40 20 20 0 0 0 0 40Z"
          />
          <path
            fill="#fff"
            d="M12 15c5-4 11-4 16 0v1l-1 2h-1l-1-1c-3-3-7-3-10 0l-1 1h-1l-1-2v-1Zm19 3 2 2v1l-7 7h-1l-5-5-5 5h-1l-7-7v-1l2-2 5 5h1l5-5 5 5h1l5-5Z"
          />
        </g>
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h40v40H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
