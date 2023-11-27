// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type RightArrow = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const RightArrow: React.FC<RightArrow> = ({
  width = "13",
  height = "22",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M2 2L11 11L2 20"
        stroke="#E8DFD3"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
