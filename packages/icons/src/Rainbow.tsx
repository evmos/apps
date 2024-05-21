// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type RainbowIconProps = React.SVGAttributes<SVGElement> & {
  color?: string | undefined;
};

export const RainbowIcon: React.FC<RainbowIconProps> = ({
  width = "40",
  height = "38",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M0 54.4C0 35.3582 0 25.8373 3.70578 18.5643C6.96547 12.1668 12.1668 6.96547 18.5643 3.70578C25.8373 0 35.3582 0 54.4 0H65.6C84.6418 0 94.1627 0 101.436 3.70578C107.833 6.96547 113.035 12.1668 116.294 18.5643C120 25.8373 120 35.3582 120 54.4V65.6C120 84.6418 120 94.1627 116.294 101.436C113.035 107.833 107.833 113.035 101.436 116.294C94.1627 120 84.6418 120 65.6 120H54.4C35.3582 120 25.8373 120 18.5643 116.294C12.1668 113.035 6.96547 107.833 3.70578 101.436C0 94.1627 0 84.6418 0 65.6V54.4Z"
        fill="url(#paint0_linear_34_327)"
      />
      <path
        d="M20 38H26C56.9279 38 82 63.0721 82 94V100H94C97.3137 100 100 97.3137 100 94C100 53.1309 66.8691 20 26 20C22.6863 20 20 22.6863 20 26V38Z"
        fill="url(#paint1_radial_34_327)"
      />
      <path
        d="M84 94H100C100 97.3137 97.3137 100 94 100H84V94Z"
        fill="url(#paint2_linear_34_327)"
      />
      <path
        d="M26 20L26 36H20L20 26C20 22.6863 22.6863 20 26 20Z"
        fill="url(#paint3_linear_34_327)"
      />
      <path
        d="M20 36H26C58.0325 36 84 61.9675 84 94V100H66V94C66 71.9086 48.0914 54 26 54H20V36Z"
        fill="url(#paint4_radial_34_327)"
      />
      <path d="M68 94H84V100H68V94Z" fill="url(#paint5_linear_34_327)" />
      <path
        d="M20 52L20 36L26 36L26 52H20Z"
        fill="url(#paint6_linear_34_327)"
      />
      <path
        d="M20 62C20 65.3137 22.6863 68 26 68C40.3594 68 52 79.6406 52 94C52 97.3137 54.6863 100 58 100H68V94C68 70.804 49.196 52 26 52H20V62Z"
        fill="url(#paint7_radial_34_327)"
      />
      <path
        d="M52 94H68V100H58C54.6863 100 52 97.3137 52 94Z"
        fill="url(#paint8_radial_34_327)"
      />
      <path
        d="M26 68C22.6863 68 20 65.3137 20 62L20 52L26 52L26 68Z"
        fill="url(#paint9_radial_34_327)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_34_327"
          x1="60"
          y1="0"
          x2="60"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#174299" />
          <stop offset="1" stopColor="#001E59" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_34_327"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(26 94) rotate(-90) scale(74)"
        >
          <stop offset="0.770277" stopColor="#FF4000" />
          <stop offset="1" stopColor="#8754C9" />
        </radialGradient>
        <linearGradient
          id="paint2_linear_34_327"
          x1="83"
          y1="97"
          x2="100"
          y2="97"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#8754C9" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_34_327"
          x1="23"
          y1="20"
          x2="23"
          y2="37"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8754C9" />
          <stop offset="1" stopColor="#FF4000" />
        </linearGradient>
        <radialGradient
          id="paint4_radial_34_327"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(26 94) rotate(-90) scale(58)"
        >
          <stop offset="0.723929" stopColor="#FFF700" />
          <stop offset="1" stopColor="#FF9901" />
        </radialGradient>
        <linearGradient
          id="paint5_linear_34_327"
          x1="68"
          y1="97"
          x2="84"
          y2="97"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF700" />
          <stop offset="1" stopColor="#FF9901" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_34_327"
          x1="23"
          y1="52"
          x2="23"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFF700" />
          <stop offset="1" stopColor="#FF9901" />
        </linearGradient>
        <radialGradient
          id="paint7_radial_34_327"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(26 94) rotate(-90) scale(42)"
        >
          <stop offset="0.59513" stopColor="#00AAFF" />
          <stop offset="1" stopColor="#01DA40" />
        </radialGradient>
        <radialGradient
          id="paint8_radial_34_327"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(51 97) scale(17 45.3333)"
        >
          <stop stopColor="#00AAFF" />
          <stop offset="1" stopColor="#01DA40" />
        </radialGradient>
        <radialGradient
          id="paint9_radial_34_327"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(23 69) rotate(-90) scale(17 322.37)"
        >
          <stop stopColor="#00AAFF" />
          <stop offset="1" stopColor="#01DA40" />
        </radialGradient>
      </defs>
    </svg>
  );
};
