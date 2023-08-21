// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type C14IconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const C14Icon: React.FC<C14IconProps> = ({
  width = "40",
  height = "40",
  ...restProps
}) => {
  return (
    <svg
      {...restProps}
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#FD7F3A" clipPath="url(#c14iconclip)">
        <path d="m1 39-1-1 1-1 1-1 1 1 1 1-1 1-1 1-1-1ZM18 37l-3-3-1 1-1 1-4-5-5-4 1-1 1-1-3-3-3-3 3-3 3-3 1 1 1 1-2 2-2 2 2 2 2 2-1 1-1 1 5 4 4 5 1-1 1-1 2 2 2 2 2-2 2-2-1-1h-1v-1l1-1h1l-1-1-1-1 6-6 5-6-1-1-1-1 2-2 2-1V9h-1l-1-1 2-2 2-2 1 1 1 1-2 2-2 2h1l1 1-2 2-2 2 1 1 1 1-5 6a309 309 0 0 0-5 7h1l-1 1-1 1 1 1 1 1-6 6-3-3ZM7 37l-1-1 1-1 1-1 1 1 1 1-1 1-1 1-1-1ZM3 33l-1-1 1-1h1l2 1-2 2-1-1Z" />
        <path d="m12 28-1-1 1-1 1-1-1-1-1-1 2-2 1 1 1 1 1-1 1-1 1 1 1 1-1 1-1 1 1 1 1 1-1 1-1 1-1-1-1-1-1 1-1 1-1-1Zm4-2 1-1-1-1-1-1-1 1-1 1 1 1 1 1 1-1ZM20 20l-1-1 1-1 1-1-1-1-1-1 1-1 1-1 1 1 1 1 1-1 1-1 1 1 1 1-1 1-1 1 1 1 1 1-2 2-1-1-1-1-1 1-1 1-1-1Zm4-2 1-1-1-1-1-1-1 1-1 1 1 1 1 1 1-1ZM9 16l-1-1 1-1v-1h1l1 1v1l6-5 6-6 1 1 1 1 2-2 2-2 1 1v1l2-2 2-2 1 1 1 1 1-1 1-1 1 1 1 1-1 1-1 1-1-1-1-1-2 2-2 2-1-1-1-1-1 2-2 2-1-1-1-1-6 5-6 6-1-1-1-1v1l-1 1H9v-1Z" />
      </g>
      <defs>
        <clipPath id="c14iconclip">
          <path fill="#fff" d="M0 0h40v40H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
