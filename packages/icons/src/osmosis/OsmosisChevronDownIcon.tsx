// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type ChevronDownIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const OsmosisChevronDownIcon: React.FC<ChevronDownIconProps> = ({
  ...restProps
}) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M13.6667 1.01198C13.6667 1.27269 13.5702 1.5334 13.3819 1.73277L7.80721 7.6473C7.36316 8.1176 6.63917 8.1176 6.19512 7.6473L0.615584 1.73788C0.200497 1.29825 0.243937 0.557021 0.741076 0.178737C1.13203 -0.117757 1.67743 -0.0308533 2.02012 0.332095L7.00117 5.60763L11.9774 0.337207C12.3394 -0.0461892 12.9379 -0.117757 13.3288 0.234968C13.5557 0.439447 13.6667 0.725715 13.6667 1.01198Z"
        fill="currentColor"
      />
      ;
    </svg>
  );
};
