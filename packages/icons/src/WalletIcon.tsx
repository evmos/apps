// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ReactNode } from "react";

type WalletIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
  children?: ReactNode | React.FC;
};

export const WalletIcon: React.FC<WalletIconProps> = ({
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
      <path d="M17.8435 3.59998H6.15653C5.48056 3.60653 4.83416 3.8735 4.35616 4.34357C3.87815 4.81363 3.60667 5.44929 3.60001 6.11403V15.452C3.62574 16.1394 3.87379 16.8008 4.30809 17.34C4.74239 17.8792 5.34028 18.2681 6.01482 18.4502L14.1657 20.3328C14.476 20.4118 14.8003 20.4212 15.1147 20.3605C15.4291 20.2997 15.7256 20.1702 15.9823 19.9816C16.2306 19.7817 16.4288 19.5284 16.5615 19.2412C16.6942 18.9539 16.758 18.6405 16.7478 18.3252V11.3634C16.7467 10.6953 16.5234 10.046 16.1121 9.5143C15.7008 8.98261 15.124 8.59774 14.4696 8.41835L6.56265 6.27422C6.4933 6.25535 6.4284 6.22324 6.37167 6.17971C6.31494 6.13618 6.26749 6.08209 6.23201 6.02052C6.19654 5.95896 6.17374 5.89113 6.16493 5.8209C6.15611 5.75067 6.16145 5.67942 6.18063 5.61122C6.19982 5.54302 6.23247 5.47921 6.27674 5.42342C6.321 5.36763 6.37601 5.32096 6.43861 5.28608C6.50121 5.25119 6.57019 5.22878 6.64161 5.22011C6.71302 5.21144 6.78547 5.21668 6.85482 5.23555L14.764 7.38328L17.6676 7.44325H19.1217C19.267 7.44325 19.5668 6.75453 19.6696 6.85556C19.7723 6.95659 19.1217 6.33174 19.1217 6.47462C19.1217 6.6175 19.064 6.75453 18.9613 6.85556C18.8586 6.95659 18.7192 7.01335 18.5739 7.01335H14.7501C14.7059 7.01326 14.6631 7.02895 14.6298 7.05751C14.5964 7.08607 14.5748 7.12556 14.5688 7.16865C14.5628 7.21173 14.5729 7.25549 14.5973 7.29179C14.6216 7.32809 14.6585 7.35447 14.7012 7.36604L14.764 7.38328C15.5961 7.61054 16.3361 8.08583 16.8822 8.74374C16.8996 8.76413 17.4783 9.48592 17.6676 10.2009C17.692 10.2122 19.948 11.0494 19.3044 10.2042L19.3186 8.9669C19.4639 8.9669 18.8586 8.86587 18.9613 8.9669C19.064 9.06793 19.1217 9.20495 19.1217 9.34783C19.1217 9.49071 19.064 9.62774 18.9613 9.72877C18.8586 9.8298 18.7192 9.88656 18.5739 9.88656H17.8157C17.7869 9.88639 17.7584 9.89297 17.7326 9.90577C17.7068 9.91857 17.6845 9.93721 17.6676 9.96016C17.6506 9.98311 17.6394 10.0097 17.6349 10.0378C17.6305 10.0658 17.6328 10.0945 17.6419 10.1214C17.7762 10.5228 17.8454 10.9423 17.8471 11.3648V16.3513C17.8471 16.3989 17.8664 16.4446 17.9006 16.4783C17.9349 16.5119 17.9813 16.5309 18.0297 16.5309H17.8435C18.5215 16.5309 19.1718 16.266 19.6512 15.7945C20.1307 15.323 20.4 14.6836 20.4 14.0168V6.11547C20.4002 5.7852 20.3342 5.45813 20.2058 5.15294C20.0774 4.84776 19.8891 4.57044 19.6517 4.33683C19.4143 4.10323 19.1324 3.91792 18.8222 3.79148C18.5119 3.66505 18.1793 3.59998 17.8435 3.59998ZM14.9217 14.3745C14.9217 14.6586 14.8361 14.9364 14.6755 15.1727C14.515 15.4089 14.2869 15.593 14.0199 15.7018C13.753 15.8105 13.4593 15.8389 13.1759 15.7835C12.8925 15.7281 12.6322 15.5913 12.4279 15.3903C12.2236 15.1894 12.0844 14.9335 12.0281 14.6548C11.9717 14.3761 12.0006 14.0873 12.1112 13.8247C12.2218 13.5622 12.409 13.3379 12.6493 13.18C12.8895 13.0222 13.1719 12.9379 13.4609 12.9379C13.8483 12.9379 14.2199 13.0893 14.4939 13.3587C14.7678 13.6281 14.9217 13.9935 14.9217 14.3745Z" />
    </svg>
  );
};