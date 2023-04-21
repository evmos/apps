// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type KeplrIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const KeplrIcon: React.FC<KeplrIconProps> = ({
  width = "38",
  height = "38",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 141 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M0.163025 59.5C0.163025 36.586 0.163025 25.129 5.32062 16.7126C8.20657 12.0031 12.1661 8.04354 16.8756 5.15759C25.292 0 36.749 0 59.663 0H80.663C103.577 0 115.034 0 123.45 5.15759C128.16 8.04354 132.119 12.0031 135.005 16.7126C140.163 25.129 140.163 36.586 140.163 59.5V80.5C140.163 103.414 140.163 114.871 135.005 123.287C132.119 127.997 128.16 131.956 123.45 134.842C115.034 140 103.577 140 80.663 140H59.663C36.749 140 25.292 140 16.8756 134.842C12.1661 131.956 8.20657 127.997 5.32062 123.287C0.163025 114.871 0.163025 103.414 0.163025 80.5V59.5Z"
        fill="url(#paint0_linear_417_6478)"
      />
      <path
        d="M0.163025 59.5C0.163025 36.586 0.163025 25.129 5.32062 16.7126C8.20657 12.0031 12.1661 8.04354 16.8756 5.15759C25.292 0 36.749 0 59.663 0H80.663C103.577 0 115.034 0 123.45 5.15759C128.16 8.04354 132.119 12.0031 135.005 16.7126C140.163 25.129 140.163 36.586 140.163 59.5V80.5C140.163 103.414 140.163 114.871 135.005 123.287C132.119 127.997 128.16 131.956 123.45 134.842C115.034 140 103.577 140 80.663 140H59.663C36.749 140 25.292 140 16.8756 134.842C12.1661 131.956 8.20657 127.997 5.32062 123.287C0.163025 114.871 0.163025 103.414 0.163025 80.5V59.5Z"
        fill="url(#paint1_radial_417_6478)"
      />
      <path
        d="M52.5786 107.2V73.4838L84.94 107.2H102.94V106.325L65.7218 67.9397L100.07 31.5125V31.075H81.9532L52.5786 63.2635V31.075H38V107.2H52.5786Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_417_6478"
          x1="113.771"
          y1="-9.5546"
          x2="113.663"
          y2="109.626"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#17D2FF" />
          <stop offset="1" stopColor="#704EFF" />
          <stop offset="1" stopColor="#704EFF" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_417_6478"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-0.00183922 134.267) rotate(-56.6396) scale(101.149 105.53)"
        >
          <stop stopColor="#2845E5" />
          <stop offset="1" stopColor="#099BF7" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};
