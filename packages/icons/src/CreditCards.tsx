// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type CreditCardsIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const CreditCardsIcon: React.FC<CreditCardsIconProps> = ({
  width = "18",
  height = "18",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill={"none"}
      {...restProps}
      xmlns="http://www.w3.org/2000/svg"
      color={color}
    >
      <path
        d="M22 11.429V18a2 2 0 01-2 2H7a2 2 0 01-2-2v-1.5m17-5.071V10a2 2 0 00-2-2h-1m3 3.429h-3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M19 8v6.5a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 012-2h13a2 2 0 012 2V8zm0 0H5.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};
