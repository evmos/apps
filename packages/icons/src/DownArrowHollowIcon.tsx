// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type DownArrowHollowIcon = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const DownArrowHollowIcon: React.FC<DownArrowHollowIcon> = ({
  width = "52",
  height = "52",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 55 55"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <rect x="1.5" y="1.5" width="52" height="52" rx="26" fill="#FAF1E4" />
      <rect
        x="1.5"
        y="1.5"
        width="52"
        height="52"
        rx="26"
        stroke="#4F4740"
        strokeWidth="3"
      />
      <g clipPath="url(#clip0_2930_62222)">
        <path
          d="M21.4101 30.7973C21.9574 30.2353 22.8434 30.2362 23.3898 30.7973L26.6 34.0945V17.4375C26.6 16.6428 27.226 16 28 16C28.7739 16 29.4 16.6428 29.4 17.4375V34.0945L32.6103 30.7982C33.1572 30.2366 34.0432 30.2366 34.59 30.7982C35.1369 31.3597 35.1369 32.2694 34.59 32.8309L28.99 38.5809C28.4432 39.1424 27.5572 39.1424 27.0103 38.5809L21.4103 32.8309C20.8633 32.2662 20.8633 31.3588 21.4101 30.7973Z"
          fill="#2D2925"
        />
      </g>
      <defs>
        <clipPath id="clip0_2930_62222">
          <rect
            width="14"
            height="23"
            fill="white"
            transform="translate(21 16)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
