type ExternalLinkIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const ExternalLinkIcon: React.FC<ExternalLinkIconProps> = ({
  width = "28",
  height = "28",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      stroke={color}
      fill="transparent"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M24.5 16.3333V22.1667C24.5 22.7855 24.2542 23.379 23.8166 23.8166C23.379 24.2542 22.7855 24.5 22.1667 24.5H5.83333C5.21449 24.5 4.621 24.2542 4.18342 23.8166C3.74583 23.379 3.5 22.7855 3.5 22.1667V5.83333C3.5 5.21449 3.74583 4.621 4.18342 4.18342C4.621 3.74583 5.21449 3.5 5.83333 3.5H11.6667M15.75 12.25L24.5 3.5L15.75 12.25ZM18.6667 3.5H24.5V9.33333L18.6667 3.5Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
