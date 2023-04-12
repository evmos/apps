type GrilledSteakIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
  height?: string | number;
  width?: string | number;
};

export const GrilledSteak: React.FC<GrilledSteakIconProps> = ({
  width = "24",
  height = "24",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M8.39092 8.27229C7.9397 9.30927 6.86494 11.5306 6.1758 12.1201C5.31437 12.8569 3.87864 14.6171 4.20681 16.0907C4.53498 17.5643 5.51946 19.4063 8.39092 19.4063C9.84337 19.4063 10.6871 19.0502 11.5963 18.6665C12.4845 18.2916 13.4353 17.8903 15.0773 17.769C18.4 17.5234 22.625 15.0264 20.4099 11.0558C18.1949 7.08519 14.3875 5.71257 12.1648 5.85718C11.253 5.95269 9.2216 6.56943 8.39092 8.27229ZM13.7224 10.2215C14.2095 9.91532 15.3256 9.46164 15.8934 10.0962C16.6031 10.8895 15.6429 12.4759 14.3069 12.5177C13.2381 12.5511 12.8596 12.0028 12.8039 11.7244C12.6926 11.46 12.7204 10.7893 13.7224 10.2215Z"
        fill="#70655C"
      />
      <path d="M3.90869 18.1956V15.9829C3.90869 16.7177 4.29835 17.5415 4.49319 17.8616C5.82915 20.0326 8.58461 20.1995 10.0876 19.5734C11.5906 18.9471 13.5945 18.2791 14.7218 18.1539C15.6235 18.0537 16.8788 17.7503 17.3937 17.6111C20.099 16.9097 21.0815 14.8696 21.2346 13.9372V14.6052C21.2346 19.281 15.4732 20.1578 14.012 20.116C12.843 20.0828 10.9643 20.8536 10.1711 21.2432C9.46134 21.5773 7.64107 22.0449 6.03791 21.2432C4.43473 20.4417 3.95043 18.8775 3.90869 18.1956Z" />
      <path d="M8.48039 9.98155C8.17433 10.5965 7.80381 11.2783 7.46793 11.7535H12.8108C12.8082 11.7436 12.806 11.7339 12.8041 11.7245C12.6928 11.4601 12.7206 10.7893 13.7226 10.2215C13.8454 10.1443 14.0083 10.0577 14.1923 9.98155H8.48039ZM7.05545 12.2356C7.08601 12.2098 7.11747 12.1802 7.1497 12.1473H13.0639C13.2899 12.3564 13.6795 12.5373 14.3071 12.5177C14.6953 12.5056 15.0519 12.363 15.3449 12.1473H19.6087C19.7685 12.6393 19.8064 13.0995 19.7465 13.5255H5.92848C6.27968 12.9854 6.71878 12.5203 7.05545 12.2356ZM5.69688 13.9193C5.42908 14.4293 5.26773 14.9795 5.34942 15.4943H18.5923C19.0982 15.0542 19.4816 14.5264 19.6611 13.9193H5.69688ZM6.15679 17.2663C5.80038 16.8446 5.57965 16.3552 5.44394 15.8881H18.0739C17.0891 16.5437 15.8217 16.9346 14.679 17.0181C14.0656 17.0629 13.5649 17.1529 13.1321 17.2663H6.15679ZM6.55778 17.6601C7.10371 18.1034 7.87219 18.4044 8.95254 18.4044C10.1965 18.4044 10.9191 18.1029 11.6977 17.778C11.7915 17.7389 11.8861 17.6994 11.9825 17.6601H6.55778ZM19.4573 11.7535H15.7508C16.1665 11.2239 16.2882 10.5374 15.8935 10.0963C15.8549 10.0531 15.8138 10.015 15.7705 9.98155H18.3078C18.6507 10.3905 18.9677 10.8413 19.2461 11.3346C19.3262 11.4765 19.3964 11.6161 19.4573 11.7535ZM8.67222 9.58778H17.958C17.2536 8.83896 16.4653 8.25024 15.6892 7.81581H9.94561C9.54854 8.11104 9.19219 8.49235 8.95254 8.978C8.87725 9.14906 8.78167 9.35821 8.67222 9.58778ZM12.1847 6.93331C12.8003 6.78871 13.8011 6.94575 14.8964 7.42204H10.5883C11.1948 7.11716 11.8038 6.97274 12.1847 6.93331Z" />
      <path d="M21.6314 1.74499C21.6637 1.69811 21.6956 1.65432 21.7267 1.61392C21.6956 1.65574 21.6639 1.69949 21.6314 1.74499C21.0882 2.53594 20.4629 4.2134 21.7267 5.55164C23.0656 6.96921 21.6941 8.63618 20.8408 9.29246C21.2018 8.86587 21.648 7.71738 20.5454 6.53606C19.4831 5.39777 20.7728 2.94936 21.6314 1.74499Z" />
      <path d="M5.47181 10.4647C5.50142 10.5032 5.53076 10.5391 5.55945 10.5722C5.5309 10.5379 5.50164 10.502 5.47181 10.4647C4.97259 9.81571 4.39802 8.43932 5.55945 7.34127C6.78973 6.17813 5.52928 4.81036 4.74529 4.27188C5.07698 4.6219 5.48707 5.56426 4.4739 6.53355C3.49762 7.46753 4.68277 9.47649 5.47181 10.4647Z" />
    </svg>
  );
};
