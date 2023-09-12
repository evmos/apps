// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type MetamaskIconProps = React.SVGAttributes<SVGElement> & {
  color?: string | undefined;
};

export const MetamaskIcon: React.FC<MetamaskIconProps> = ({
  width = "40",
  height = "38",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...restProps}
    >
      <g strokeLinecap="round" stroke-linejoin="round" clipPath="url(#a)">
        <path fill="#E2761B" stroke="#E2761B" d="M38 0 22 12l3-7 13-5Z" />
        <path
          fill="#E4761B"
          stroke="#E4761B"
          d="m2 0 15 12-2-7L2 0ZM32 27l-4 6 9 3 3-9h-8ZM0 27l3 9 9-3-4-6H0Z"
        />
        <path
          fill="#E4761B"
          stroke="#E4761B"
          d="m11 16-2 4h9l-1-9-6 5ZM29 16l-6-5-1 9h9l-2-4ZM12 33l5-2-4-4-1 6ZM23 31l5 2-1-6-4 4Z"
        />
        <path
          fill="#D7C1B3"
          stroke="#D7C1B3"
          d="m28 33-5-2v5l5-3ZM12 33l5 3v-5l-5 2Z"
        />
        <path
          fill="#233447"
          stroke="#233447"
          d="m17 25-5-2 3-1 2 3ZM23 25l1-3 4 1-5 2Z"
        />
        <path
          fill="#CD6116"
          stroke="#CD6116"
          d="m12 33 1-6H8l4 6ZM27 27l1 6 4-6h-5ZM31 20h-9l1 5 2-3 3 1 3-3ZM12 23l4-1 1 3 1-5H9l3 3Z"
        />
        <path
          fill="#E4751F"
          stroke="#E4751F"
          d="m9 20 4 7-1-4-3-3ZM28 23l-1 4 4-7-3 3ZM18 20l-1 5 1 5V20ZM22 20v10l1-5-1-5Z"
        />
        <path
          fill="#F6851B"
          stroke="#F6851B"
          d="m23 25-1 5 1 1 4-4 1-4-5 2ZM12 23l1 4 4 4 1-1-1-5-5-2Z"
        />
        <path
          fill="#C0AD9E"
          stroke="#C0AD9E"
          d="M23 36v-2h0-6 0v2l-5-3 2 2 3 2h6l3-2 2-2-5 3Z"
        />
        <path fill="#161616" stroke="#161616" d="m23 31-1-1h-4l-1 1v3h6v-3Z" />
        <path
          fill="#763D16"
          stroke="#763D16"
          d="m39 12 1-6-2-6-15 11 6 5 8 3 2-3h-1l1-1-1-1 1-1v-1ZM0 6l1 6v1l1 1-1 1 1 1H1l2 3 8-3 6-5L2 0 0 6Z"
        />
        <path
          fill="#F6851B"
          stroke="#F6851B"
          d="m37 19-8-3 2 4-4 7h13l-3-8ZM11 16l-8 3-3 8h13l-4-7 2-4ZM22 20l1-9 2-6H15l2 6 1 9v10h4V20Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h40v37H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
