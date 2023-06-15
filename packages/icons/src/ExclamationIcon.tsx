// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type ExclamationIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const ExclamationIcon: React.FC<ExclamationIconProps> = ({
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
      viewBox="0 0 17 15"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path d="M8 0C12.42 0 16 3.58 16 8C16 12.42 12.42 16 8 16C3.58 16 0 12.42 0 8C0 3.58 3.58 0 8 0ZM9.13 9.38L9.48 2.92H6.52L6.87 9.38H9.13ZM9.04 12.74C9.28 12.51 9.41 12.19 9.41 11.78C9.41 11.36 9.29 11.04 9.05 10.81C8.81 10.58 8.46 10.46 7.99 10.46C7.52 10.46 7.17 10.58 6.92 10.81C6.67 11.04 6.55 11.36 6.55 11.78C6.55 12.19 6.68 12.51 6.93 12.74C7.19 12.97 7.54 13.08 7.99 13.08C8.44 13.08 8.79 12.97 9.04 12.74V12.74Z" />
    </svg>
  );
};
