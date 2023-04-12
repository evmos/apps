type LeftArrowIcon = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const LeftArrowIcon: React.FC<LeftArrowIcon> = ({
  width = "52",
  height = "52",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M8.71924 12.8662C9.22692 13.3543 9.22692 14.1458 8.71924 14.6339C8.21155 15.122 7.38845 15.122 6.88076 14.6339L0.380757 8.38389C-0.126919 7.89577 -0.126919 7.10427 0.380757 6.61614L6.88076 0.366113C7.38845 -0.122038 8.21155 -0.122038 8.71924 0.366113C9.22692 0.854277 9.22692 1.64573 8.71924 2.13389L4.43847 6.25001H24.7C25.418 6.25001 26 6.80964 26 7.50002C26 8.19039 25.418 8.75002 24.7 8.75002H4.43849L8.71924 12.8662Z"
        fill="#F5F5F5"
      />
    </svg>
  );
};
