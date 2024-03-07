// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type KeplrIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const KeplrIcon: React.FC<KeplrIconProps> = ({
  width = "40",
  height = "38",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
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
          <path fill="#fff" d="M40 0H0v40h40V0Z" />
        </mask>
        <g mask="url(#b)">
          <path
            fill="url(#c)"
            d="M31 0H9C4 0 0 4 0 9v22c0 5 4 9 9 9h22c5 0 9-4 9-9V9c0-5-4-9-9-9Z"
          />
          <path
            fill="url(#d)"
            d="M31 0H9C4 0 0 4 0 9v22c0 5 4 9 9 9h22c5 0 9-4 9-9V9c0-5-4-9-9-9Z"
          />
          <path
            fill="url(#e)"
            d="M31 0H9C4 0 0 4 0 9v22c0 5 4 9 9 9h22c5 0 9-4 9-9V9c0-5-4-9-9-9Z"
          />
          <path
            fill="url(#f)"
            d="M31 0H9C4 0 0 4 0 9v22c0 5 4 9 9 9h22c5 0 9-4 9-9V9c0-5-4-9-9-9Z"
          />
          <path
            fill="#fff"
            d="M16 31V21l9 10h5v-1L20 20l10-10h-5l-9 9v-9h-4v21h4Z"
          />
        </g>
      </g>
      <defs>
        <radialGradient
          id="d"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(-45 47 17) scale(64.1473 65.107)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#232DE3" />
          <stop offset="1" stopColor="#232DE3" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="e"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="rotate(-138 26 13) scale(40.1083 61.1539)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8B4DFF" />
          <stop offset="1" stopColor="#8B4DFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="f"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 31.5367 -76.5165 0 20 0)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#24D5FF" />
          <stop offset="1" stopColor="#1BB8FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="c"
          x1="20"
          x2="20"
          y1="0"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1FD1FF" />
          <stop offset="1" stopColor="#1BB8FF" />
        </linearGradient>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h40v40H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
