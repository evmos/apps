// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type CheckIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const CheckIcon: React.FC<CheckIconProps> = ({
  width = "25",
  height = "25",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path d="M9.80612 17.7643L4.34612 12.5344C4.01809 12.2202 4.01809 11.7108 4.34612 11.3965L5.53403 10.2587C5.86206 9.94442 6.39395 9.94442 6.72197 10.2587L10.4001 13.7817L18.2782 6.23565C18.6062 5.92145 19.1381 5.92145 19.4662 6.23565L20.6541 7.37353C20.9821 7.68774 20.9821 8.19718 20.6541 8.51141L10.9941 17.7644C10.666 18.0786 10.1342 18.0786 9.80612 17.7643V17.7643Z" />
    </svg>
  );
};
