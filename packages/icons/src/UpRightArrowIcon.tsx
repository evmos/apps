// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type UpRightArrowProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const UpRightArrowIcon: React.FC<UpRightArrowProps> = ({
  width = "23",
  height = "23",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 23"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M1.05451 22.0011L22.0012 1.0544M22.0012 1.0544L22.0012 21.1632M22.0012 1.0544L1.89238 1.0544"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
