// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type CopyPasteIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const CopyPasteIcon: React.FC<CopyPasteIconProps> = ({
  width = "37",
  height = "36",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 37 36"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <rect
        x="0.257324"
        y="0.631348"
        width="36.087"
        height="34.7368"
        rx="6"
        fill="#FFE6E2"
      />
      <rect
        x="0.257324"
        y="0.631348"
        width="36.087"
        height="34.7368"
        rx="6"
        fill="#FFE6E2"
      />
      <path
        d="M24.1909 14.6968H17.698C17.5258 14.6968 17.3606 14.6309 17.2389 14.5137C17.1171 14.3965 17.0487 14.2375 17.0487 14.0718C17.0487 13.906 17.1171 13.747 17.2389 13.6298C17.3606 13.5126 17.5258 13.4468 17.698 13.4468H24.1909C24.3631 13.4468 24.5282 13.5126 24.65 13.6298C24.7718 13.747 24.8402 13.906 24.8402 14.0718C24.8402 14.2375 24.7718 14.3965 24.65 14.5137C24.5282 14.6309 24.3631 14.6968 24.1909 14.6968Z"
        fill="#ED4E33"
      />
      <path
        d="M24.1909 17.1973H17.698C17.5258 17.1973 17.3606 17.1314 17.2389 17.0142C17.1171 16.897 17.0487 16.738 17.0487 16.5723C17.0487 16.4065 17.1171 16.2475 17.2389 16.1303C17.3606 16.0131 17.5258 15.9473 17.698 15.9473H24.1909C24.3631 15.9473 24.5282 16.0131 24.65 16.1303C24.7718 16.2475 24.8402 16.4065 24.8402 16.5723C24.8402 16.738 24.7718 16.897 24.65 17.0142C24.5282 17.1314 24.3631 17.1973 24.1909 17.1973Z"
        fill="#ED4E33"
      />
      <path
        d="M24.1909 19.6973H17.698C17.5258 19.6973 17.3606 19.6314 17.2389 19.5142C17.1171 19.397 17.0487 19.238 17.0487 19.0723C17.0487 18.9065 17.1171 18.7475 17.2389 18.6303C17.3606 18.5131 17.5258 18.4473 17.698 18.4473H24.1909C24.3631 18.4473 24.5282 18.5131 24.65 18.6303C24.7718 18.7475 24.8402 18.9065 24.8402 19.0723C24.8402 19.238 24.7718 19.397 24.65 19.5142C24.5282 19.6314 24.3631 19.6973 24.1909 19.6973Z"
        fill="#ED4E33"
      />
      <path
        d="M24.8427 23.4472H14.887C14.5743 23.4472 14.2647 23.3879 13.9759 23.2728C13.687 23.1576 13.4246 22.9888 13.2035 22.776C12.7571 22.3462 12.5062 21.7633 12.5062 21.1555V9.90545C12.5062 9.29766 12.7571 8.71476 13.2035 8.28499C13.65 7.85521 14.2555 7.61377 14.887 7.61377H24.8427C25.4741 7.61377 26.0797 7.85521 26.5261 8.28499C26.9726 8.71476 27.2234 9.29766 27.2234 9.90545V21.1555C27.2234 21.7633 26.9726 22.3462 26.5261 22.776C26.0797 23.2058 25.4741 23.4472 24.8427 23.4472ZM14.887 8.86378C14.5999 8.86378 14.3247 8.97353 14.1218 9.16888C13.9188 9.36423 13.8048 9.62918 13.8048 9.90545V21.1555C13.8048 21.4318 13.9188 21.6968 14.1218 21.8921C14.3247 22.0875 14.5999 22.1972 14.887 22.1972H24.8427C25.1297 22.1972 25.405 22.0875 25.6079 21.8921C25.8108 21.6968 25.9249 21.4318 25.9249 21.1555V9.90545C25.9249 9.62918 25.8108 9.36423 25.6079 9.16888C25.405 8.97353 25.1297 8.86378 24.8427 8.86378H14.887Z"
        fill="#ED4E33"
      />
      <path
        d="M22.0267 27.6136H11.638C11.0066 27.6136 10.4011 27.3721 9.95462 26.9424C9.50815 26.5126 9.25732 25.9297 9.25732 25.3219V11.9885C9.25732 11.3807 9.50815 10.7978 9.95462 10.368C10.4011 9.93822 11.0066 9.69678 11.638 9.69678H12.0709C12.2431 9.69678 12.4083 9.76263 12.53 9.87984C12.6518 9.99705 12.7202 10.156 12.7202 10.3218C12.7202 10.4875 12.6518 10.6465 12.53 10.7637C12.4083 10.8809 12.2431 10.9468 12.0709 10.9468H11.638C11.351 10.9468 11.0758 11.0565 10.8729 11.2519C10.6699 11.4472 10.5559 11.7122 10.5559 11.9885V25.3219C10.5559 25.5982 10.6699 25.8631 10.8729 26.0585C11.0758 26.2538 11.351 26.3636 11.638 26.3636H22.0267C22.3137 26.3636 22.5889 26.2538 22.7919 26.0585C22.9948 25.8631 23.1088 25.5982 23.1088 25.3219V24.9052C23.1088 24.7395 23.1772 24.5805 23.299 24.4633C23.4208 24.3461 23.5859 24.2802 23.7581 24.2802C23.9303 24.2802 24.0955 24.3461 24.2172 24.4633C24.339 24.5805 24.4074 24.7395 24.4074 24.9052V25.3219C24.4074 25.9297 24.1566 26.5126 23.7101 26.9424C23.2636 27.3721 22.6581 27.6136 22.0267 27.6136Z"
        fill="#ED4E33"
      />
    </svg>
  );
};