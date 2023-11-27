// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type WebsiteProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const WebsiteIcon: React.FC<WebsiteProps> = ({
  width = "54",
  height = "54",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M27 49.5C39.4264 49.5 49.5 39.4264 49.5 27C49.5 14.5736 39.4264 4.5 27 4.5C14.5736 4.5 4.5 14.5736 4.5 27C4.5 39.4264 14.5736 49.5 27 49.5Z"
        stroke="#B2B2B2"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 27C18 39.4264 22.0294 49.5 27 49.5C31.9706 49.5 36 39.4264 36 27C36 14.5736 31.9706 4.5 27 4.5C22.0294 4.5 18 14.5736 18 27Z"
        stroke="#B2B2B2"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 27H49.5"
        stroke="#B2B2B2"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
