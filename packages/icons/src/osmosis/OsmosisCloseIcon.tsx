// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type CloseIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const OsmosisCloseIcon: React.FC<CloseIconProps> = ({
  ...restProps
}) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.4759 17.5102L12.6266 14.6609L9.77286 17.5146C9.09654 18.1909 8.00868 18.1918 7.33342 17.5165C6.65815 16.8412 6.64253 15.7369 7.31884 15.0606L10.1726 12.2069L7.33974 9.37406C6.66448 8.69879 6.64886 7.59446 7.32517 6.91815C8.01798 6.22534 9.12231 6.24096 9.79757 6.91623L12.6304 9.74905L15.4841 6.89533C16.1604 6.21901 17.2648 6.23464 17.94 6.9099C18.6153 7.58517 18.6144 8.67302 17.9381 9.34934L15.0844 12.2031L17.9337 15.0523C18.609 15.7276 18.6246 16.8319 17.9318 17.5248C17.2555 18.2011 16.1511 18.1854 15.4759 17.5102Z"
        fill="currentColor"
      />
    </svg>
  );
};
