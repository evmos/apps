// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type UpArrowProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const UpArrowIcon: React.FC<UpArrowProps> = ({
  width = "18",
  height = "10",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 10"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M1.04494 9.38353C1.27935 9.61787 1.59723 9.74951 1.92869 9.74951C2.26014 9.74951 2.57803 9.61787 2.81243 9.38353L8.99993 3.19603L15.1874 9.38353C15.4232 9.61123 15.7389 9.73722 16.0667 9.73437C16.3944 9.73152 16.7079 9.60006 16.9397 9.3683C17.1714 9.13654 17.3029 8.82303 17.3058 8.49528C17.3086 8.16753 17.1826 7.85178 16.9549 7.61603L9.88367 0.544779C9.64926 0.310439 9.33138 0.178795 8.99993 0.178795C8.66847 0.178795 8.35059 0.310439 8.11618 0.544779L1.04494 7.61603C0.810599 7.85044 0.678955 8.16832 0.678955 8.49978C0.678955 8.83123 0.810599 9.14912 1.04494 9.38353Z"
        fill="#FAF1E4"
      />
    </svg>
  );
};
