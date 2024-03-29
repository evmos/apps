// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type RabbyIconProps = React.SVGAttributes<SVGElement> & {
  color?: string | undefined;
};

export const RabbyIcon: React.FC<RabbyIconProps> = ({
  width = "40",
  height = "38",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <g clipPath="url(#clip0_65971_56919)">
        <path
          d="M35.1147 18.5508C36.501 15.2618 29.6477 6.07293 23.1005 2.24465C18.9736 -0.721068 14.6734 -0.313628 13.8024 0.988547C11.8911 3.8463 20.1314 6.2678 25.6424 9.09354C24.4578 9.63997 23.3414 10.6206 22.6849 11.8747C20.6304 9.4925 16.121 7.4411 10.8296 9.09354C7.26389 10.2071 4.30049 12.8323 3.15516 16.7973C2.87686 16.666 2.56874 16.593 2.24457 16.593C1.00493 16.593 0 17.6603 0 18.9768C0 20.2934 1.00493 21.3606 2.24457 21.3606C2.47434 21.3606 3.19277 21.197 3.19277 21.197L14.6734 21.2853C10.082 29.0209 6.45357 30.1517 6.45357 31.4918C6.45357 32.832 9.92536 32.4688 11.2289 31.9693C17.4693 29.5779 24.1718 22.1251 25.3219 19.9797C30.1518 20.6196 34.2108 20.6953 35.1147 18.5508Z"
          fill="url(#paint0_linear_65971_56919)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.6415 9.09393C25.6418 9.09407 25.6421 9.0942 25.6424 9.09433C25.8978 8.98747 25.8565 8.58679 25.7864 8.27215C25.6251 7.54894 22.8435 4.63178 20.2315 3.32518C16.6724 1.5449 14.0516 1.63652 13.6641 2.45694C14.3889 4.03516 17.7502 5.51689 21.2608 7.06444C22.7585 7.72465 24.2833 8.39684 25.6422 9.09361C25.642 9.09372 25.6417 9.09383 25.6415 9.09393Z"
          fill="url(#paint1_linear_65971_56919)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.1248 24.9772C20.405 24.685 19.5919 24.417 18.6675 24.1738C19.6531 22.3007 19.8599 19.5277 18.9291 17.7745C17.6226 15.314 15.9827 14.0044 12.1719 14.0044C10.0759 14.0044 4.43272 14.7542 4.33253 19.7573C4.32202 20.2822 4.33227 20.7633 4.36805 21.2057L14.673 21.285C13.2837 23.6257 11.9826 25.3617 10.8435 26.6817C12.2112 27.0539 13.3398 27.3663 14.376 27.6532C15.3591 27.9254 16.2591 28.1746 17.2009 28.4298C18.6218 27.3304 19.9575 26.1316 21.1248 24.9772Z"
          fill="url(#paint2_linear_65971_56919)"
        />
        <path
          d="M3.01766 20.6919C3.43863 24.4925 5.47242 25.982 9.62829 26.4228C13.7842 26.8636 16.168 26.5679 19.3417 26.8745C21.9924 27.1307 24.3592 28.5652 25.2372 28.0695C26.0274 27.6233 25.5853 26.0114 24.5279 24.9773C23.1574 23.6367 21.2605 22.7047 17.9228 22.374C18.588 20.4398 18.4016 17.7278 17.3685 16.2523C15.8748 14.1188 13.1177 13.1543 9.62829 13.5757C5.98261 14.016 2.48934 15.9222 3.01766 20.6919Z"
          fill="url(#paint3_linear_65971_56919)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_65971_56919"
          x1="10.4144"
          y1="15.6383"
          x2="35.024"
          y2="22.2094"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8797FF" />
          <stop offset="1" stopColor="#8797FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_65971_56919"
          x1="30.7068"
          y1="15.1456"
          x2="12.0385"
          y2="-2.47501"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8697FF" />
          <stop offset="1" stopColor="#8697FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_65971_56919"
          x1="21.6146"
          y1="25.6301"
          x2="4.21082"
          y2="16.2087"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8697FF" />
          <stop offset="1" stopColor="#8697FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_65971_56919"
          x1="11.8712"
          y1="15.4449"
          x2="24.1645"
          y2="30.1523"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8797FF" />
          <stop offset="0.983895" stopColor="#D1D8FF" />
        </linearGradient>
        <clipPath id="clip0_65971_56919">
          <rect width="152" height="32" fill="#8797FF" />
        </clipPath>
      </defs>
    </svg>
  );
};
