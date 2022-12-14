type CloseIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

const CloseIcon: React.FC<CloseIconProps> = ({
  children,
  width = "37",
  height = "37",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 37 37"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path d="M20.9309 18.315L27.4706 11.7734C27.6473 11.6027 27.7883 11.3986 27.8852 11.1729C27.9822 10.9472 28.0332 10.7044 28.0354 10.4588C28.0375 10.2131 27.9907 9.96954 27.8977 9.74218C27.8046 9.51482 27.6673 9.30827 27.4936 9.13456C27.3199 8.96086 27.1133 8.82349 26.886 8.73048C26.6586 8.63746 26.415 8.59065 26.1694 8.59278C25.9237 8.59492 25.681 8.64595 25.4552 8.74291C25.2295 8.83986 25.0254 8.9808 24.8547 9.1575L18.3131 15.6972L11.7734 9.1575C11.6027 8.9808 11.3986 8.83986 11.1729 8.74291C10.9472 8.64595 10.7044 8.59492 10.4588 8.59278C10.2131 8.59065 9.96954 8.63746 9.74218 8.73048C9.51482 8.82349 9.30827 8.96086 9.13456 9.13456C8.96086 9.30827 8.82349 9.51482 8.73048 9.74218C8.63746 9.96954 8.59065 10.2131 8.59278 10.4588C8.59492 10.7044 8.64595 10.9472 8.74291 11.1729C8.83986 11.3986 8.9808 11.6027 9.1575 11.7734L15.6972 18.3131L9.1575 24.8547C8.9808 25.0254 8.83986 25.2295 8.74291 25.4552C8.64595 25.681 8.59492 25.9237 8.59278 26.1694C8.59065 26.415 8.63746 26.6586 8.73048 26.886C8.82349 27.1133 8.96086 27.3199 9.13456 27.4936C9.30827 27.6673 9.51482 27.8046 9.74218 27.8977C9.96954 27.9907 10.2131 28.0375 10.4588 28.0354C10.7044 28.0332 10.9472 27.9822 11.1729 27.8852C11.3986 27.7883 11.6027 27.6473 11.7734 27.4706L18.3131 20.9309L24.8547 27.4706C25.0254 27.6473 25.2295 27.7883 25.4552 27.8852C25.681 27.9822 25.9237 28.0332 26.1694 28.0354C26.415 28.0375 26.6586 27.9907 26.886 27.8977C27.1133 27.8046 27.3199 27.6673 27.4936 27.4936C27.6673 27.3199 27.8046 27.1133 27.8977 26.886C27.9907 26.6586 28.0375 26.415 28.0354 26.1694C28.0332 25.9237 27.9822 25.681 27.8852 25.4552C27.7883 25.2295 27.6473 25.0254 27.4706 24.8547L20.9309 18.3131V18.315Z" />
    </svg>
  );
};

export default CloseIcon;
