type TriangleHazardIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

const TriangleHazardIcon: React.FC<TriangleHazardIconProps> = ({
  children,
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
      <path d="M1.72494 14.4999H14.2749C15.5583 14.4999 16.3583 13.1083 15.7166 11.9999L9.4416 1.15828C8.79994 0.0499431 7.19994 0.0499431 6.55827 1.15828L0.283272 11.9999C-0.358395 13.1083 0.441605 14.4999 1.72494 14.4999ZM7.99994 8.66661C7.5416 8.66661 7.1666 8.29161 7.1666 7.83328V6.16661C7.1666 5.70828 7.5416 5.33328 7.99994 5.33328C8.45827 5.33328 8.83327 5.70828 8.83327 6.16661V7.83328C8.83327 8.29161 8.45827 8.66661 7.99994 8.66661ZM8.83327 11.9999H7.1666V10.3333H8.83327V11.9999Z" />
    </svg>
  );
};

export default TriangleHazardIcon;
