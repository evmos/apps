// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type TransakIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const TransakIcon: React.FC<TransakIconProps> = ({
  width = "34",
  height = "34",
  ...restProps
}) => {
  return (
    <svg
      {...restProps}
      width={width}
      height={height}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="128" height="128" fill="url(#transakIcon)" />
      <defs>
        <pattern
          id="transakIcon"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use href="#image0_1161_1605" transform="scale(0.0078125)" />
        </pattern>
        <image
          id="image0_1161_1605"
          width="128"
          height="128"
          // eslint-disable-next-line no-secrets/no-secrets
          href="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};
