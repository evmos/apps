// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type CodeIconProps = React.SVGAttributes<SVGElement> & {
  color?: string | undefined;
};

export const CodeIcon: React.FC<CodeIconProps> = ({
  width = "20",
  height = "20",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path d="M5.39883 7.35188L2.22696 10.0003L5.39883 12.6488C5.46244 12.7002 5.51518 12.7638 5.55399 12.8358C5.5928 12.9078 5.6169 12.9868 5.6249 13.0683C5.6329 13.1497 5.62463 13.2319 5.60057 13.3101C5.57651 13.3883 5.53715 13.4609 5.48477 13.5238C5.42546 13.5946 5.35137 13.6516 5.26769 13.6907C5.18401 13.7298 5.09277 13.7502 5.00039 13.7503C4.85394 13.751 4.71227 13.6982 4.60196 13.6019L0.851956 10.4769C0.781599 10.419 0.724934 10.3462 0.686031 10.2638C0.647129 10.1814 0.626953 10.0914 0.626953 10.0003C0.626953 9.9092 0.647129 9.81921 0.686031 9.73681C0.724934 9.65441 0.781599 9.58165 0.851956 9.52375L4.60196 6.39875C4.66275 6.33527 4.73626 6.28533 4.81767 6.25219C4.89908 6.21905 4.98656 6.20345 5.07441 6.20641C5.16226 6.20938 5.24849 6.23084 5.32748 6.2694C5.40647 6.30795 5.47644 6.36274 5.53282 6.43017C5.5892 6.4976 5.63072 6.57617 5.65468 6.66074C5.67863 6.74531 5.68447 6.83399 5.67183 6.92097C5.65918 7.00795 5.62833 7.09129 5.58129 7.16554C5.53425 7.23979 5.47208 7.30329 5.39883 7.35188ZM19.1488 9.52375L15.3988 6.39875C15.2707 6.31372 15.1156 6.27894 14.9634 6.30107C14.8112 6.3232 14.6725 6.40068 14.5738 6.51868C14.4752 6.63669 14.4235 6.78693 14.4287 6.94065C14.4339 7.09438 14.4956 7.24079 14.602 7.35188L17.7738 10.0003L14.602 12.6488C14.5048 12.7312 14.4351 12.8414 14.4023 12.9646C14.3695 13.0878 14.3752 13.2181 14.4186 13.3379C14.4619 13.4578 14.5409 13.5615 14.6449 13.6353C14.7489 13.709 14.8729 13.7491 15.0004 13.7503C15.1468 13.751 15.2885 13.6982 15.3988 13.6019L19.1488 10.4769C19.2192 10.419 19.2759 10.3462 19.3148 10.2638C19.3537 10.1814 19.3738 10.0914 19.3738 10.0003C19.3738 9.9092 19.3537 9.81921 19.3148 9.73681C19.2759 9.65441 19.2192 9.58165 19.1488 9.52375ZM12.7113 2.53938C12.6344 2.51091 12.5527 2.49804 12.4707 2.50154C12.3888 2.50503 12.3084 2.52481 12.2342 2.55972C12.16 2.59463 12.0936 2.64398 12.0387 2.70487C11.9838 2.76576 11.9415 2.83698 11.9145 2.91438L6.91446 16.6644C6.88599 16.7413 6.87312 16.8231 6.87662 16.905C6.88011 16.9869 6.89989 17.0673 6.9348 17.1415C6.96971 17.2157 7.01906 17.2821 7.07995 17.3371C7.14084 17.392 7.21206 17.4342 7.28946 17.4613C7.35722 17.4855 7.42844 17.4987 7.50039 17.5003C7.62903 17.501 7.75466 17.4614 7.85971 17.3872C7.96476 17.3129 8.044 17.2077 8.08633 17.0863L13.0863 3.33625C13.1148 3.25936 13.1277 3.17757 13.1242 3.09565C13.1207 3.01374 13.1009 2.93334 13.066 2.85915C13.0311 2.78497 12.9817 2.71848 12.9208 2.66357C12.8599 2.60867 12.7887 2.56645 12.7113 2.53938Z" />
    </svg>
  );
};
