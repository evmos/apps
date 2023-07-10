// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type CloseBorderIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const CloseBorderIcon: React.FC<CloseBorderIconProps> = ({
  width = "17",
  height = "17",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <g clipPath="url(#clip0_236_1167)">
        <path
          d="M6.49667 10.5032L8.50055 8.50002M8.50055 8.50002L10.5037 6.49685M8.50055 8.50002L6.49667 6.49685M8.50055 8.50002L10.5037 10.5032M8.49984 15.5834C12.412 15.5834 15.5832 12.4121 15.5832 8.50002C15.5832 4.5879 12.412 1.41669 8.49984 1.41669C4.58771 1.41669 1.4165 4.5879 1.4165 8.50002C1.4165 12.4121 4.58771 15.5834 8.49984 15.5834Z"
          stroke="#F02849"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_236_1167">
          <rect width="17" height="17" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
