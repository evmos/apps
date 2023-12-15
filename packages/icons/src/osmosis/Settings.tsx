// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type SettingsIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const SettingsIcon: React.FC<SettingsIconProps> = ({ ...restProps }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z"
        fill="currentColor"
      />
      <path
        d="M21.8898 10.32L21.0998 7.8C21.0145 7.50876 20.8714 7.23767 20.6791 7.00292C20.4867 6.76817 20.2491 6.57456 19.9803 6.43364C19.7116 6.29272 19.4171 6.20737 19.1147 6.1827C18.8122 6.15802 18.5079 6.19451 18.2198 6.29L17.8798 6.4C17.6134 6.48805 17.3297 6.51039 17.0529 6.46511C16.776 6.41984 16.5142 6.3083 16.2898 6.14L16.1798 6.06C15.9608 5.89237 15.7842 5.67562 15.6644 5.42723C15.5445 5.17884 15.4847 4.90575 15.4898 4.63V4.35C15.4947 3.72202 15.2501 3.11779 14.8098 2.67C14.6004 2.45845 14.3512 2.29036 14.0766 2.17538C13.8021 2.0604 13.5075 2.0008 13.2098 2H10.6598C10.048 2.00791 9.46404 2.25719 9.03514 2.69358C8.60624 3.12997 8.3671 3.71813 8.36979 4.33V4.57C8.36883 4.86027 8.30274 5.14663 8.1764 5.40796C8.05006 5.6693 7.86669 5.89895 7.63979 6.08L7.50979 6.18C7.25913 6.36962 6.96596 6.49516 6.65575 6.5457C6.34554 6.59624 6.02767 6.57025 5.72979 6.47C5.45621 6.37533 5.16626 6.33715 4.87749 6.35777C4.58872 6.3784 4.30714 6.4574 4.04979 6.59C3.78184 6.72299 3.54413 6.90969 3.35145 7.1385C3.15877 7.36731 3.01524 7.63333 2.92979 7.92L2.10979 10.52C1.91963 11.1062 1.9684 11.7437 2.2455 12.2942C2.5226 12.8447 3.00566 13.2636 3.58979 13.46H3.74979C4.01925 13.561 4.2611 13.7241 4.4557 13.9361C4.6503 14.148 4.79217 14.4029 4.86979 14.68L4.92979 14.84C5.04127 15.1461 5.07855 15.4743 5.03856 15.7977C4.99858 16.121 4.88248 16.4302 4.69979 16.7C4.33001 17.2036 4.17403 17.8328 4.2658 18.4508C4.35756 19.0688 4.68964 19.6256 5.18979 20L7.25979 21.57C7.65174 21.855 8.12523 22.0058 8.60979 22C8.73948 22.0127 8.8701 22.0127 8.99979 22C9.29989 21.9419 9.58501 21.8233 9.83775 21.6514C10.0905 21.4794 10.3055 21.2578 10.4698 21L10.6998 20.67C10.8611 20.4386 11.0746 20.2483 11.323 20.1145C11.5714 19.9808 11.8478 19.9073 12.1298 19.9C12.4253 19.8927 12.7179 19.9604 12.9802 20.0968C13.2425 20.2332 13.466 20.4339 13.6298 20.68L13.7498 20.85C13.9203 21.1037 14.1409 21.3199 14.3981 21.4852C14.6553 21.6504 14.9436 21.7613 15.2452 21.8109C15.5469 21.8606 15.8555 21.848 16.1521 21.7739C16.4487 21.6997 16.727 21.5657 16.9698 21.38L18.9998 19.86C19.4798 19.4872 19.799 18.945 19.8919 18.3444C19.9849 17.7438 19.8446 17.1304 19.4998 16.63L19.2398 16.25C19.0834 16.0084 18.9811 15.736 18.9396 15.4512C18.8982 15.1664 18.9187 14.8761 18.9998 14.6C19.0824 14.3044 19.2357 14.0334 19.4466 13.8104C19.6574 13.5874 19.9193 13.4191 20.2098 13.32L20.4098 13.25C20.9885 13.0492 21.4665 12.6312 21.7426 12.0845C22.0188 11.5377 22.0716 10.905 21.8898 10.32ZM11.9998 15.5C11.3076 15.5 10.6309 15.2947 10.0553 14.9101C9.47972 14.5256 9.03112 13.9789 8.76621 13.3394C8.50131 12.6999 8.43199 11.9961 8.56704 11.3172C8.70209 10.6383 9.03543 10.0146 9.52492 9.52513C10.0144 9.03564 10.638 8.7023 11.317 8.56725C11.9959 8.4322 12.6996 8.50151 13.3392 8.76642C13.9787 9.03133 14.5253 9.47993 14.9099 10.0555C15.2945 10.6311 15.4998 11.3078 15.4998 12C15.4998 12.9283 15.131 13.8185 14.4747 14.4749C13.8183 15.1313 12.928 15.5 11.9998 15.5Z"
        fill="currentColor"
      />
    </svg>
  );
};
