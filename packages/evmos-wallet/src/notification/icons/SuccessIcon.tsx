// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type SuccessIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

const SuccessIcon: React.FC<SuccessIconProps> = ({
  width = "18",
  height = "18",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path d="M8.99984 0.666626C4.39984 0.666626 0.666504 4.39996 0.666504 8.99996C0.666504 13.6 4.39984 17.3333 8.99984 17.3333C13.5998 17.3333 17.3332 13.6 17.3332 8.99996C17.3332 4.39996 13.5998 0.666626 8.99984 0.666626ZM6.7415 12.575L3.74984 9.58329C3.67269 9.50614 3.61149 9.41455 3.56973 9.31375C3.52798 9.21294 3.50649 9.1049 3.50649 8.99579C3.50649 8.88668 3.52798 8.77864 3.56973 8.67784C3.61149 8.57704 3.67269 8.48544 3.74984 8.40829C3.82699 8.33114 3.91858 8.26994 4.01938 8.22819C4.12019 8.18643 4.22823 8.16494 4.33734 8.16494C4.44645 8.16494 4.55449 8.18643 4.65529 8.22819C4.75609 8.26994 4.84769 8.33114 4.92484 8.40829L7.33317 10.8083L13.0665 5.07496C13.2223 4.91914 13.4336 4.83161 13.654 4.83161C13.8744 4.83161 14.0857 4.91914 14.2415 5.07496C14.3973 5.23077 14.4849 5.4421 14.4849 5.66246C14.4849 5.88281 14.3973 6.09414 14.2415 6.24996L7.9165 12.575C7.83941 12.6522 7.74784 12.7135 7.64702 12.7553C7.54621 12.7971 7.43814 12.8187 7.329 12.8187C7.21986 12.8187 7.11179 12.7971 7.01098 12.7553C6.91017 12.7135 6.8186 12.6522 6.7415 12.575Z" />
    </svg>
  );
};

export default SuccessIcon;
