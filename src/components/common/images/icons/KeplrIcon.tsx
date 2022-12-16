type KeplrIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

const KeplrIcon: React.FC<KeplrIconProps> = ({
  width = "38",
  height = "38",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M31.2047 4.47058H6.79529C5.51139 4.47058 4.47058 5.51139 4.47058 6.79529V31.2047C4.47058 32.4886 5.51139 33.5294 6.79529 33.5294H31.2047C32.4886 33.5294 33.5294 32.4886 33.5294 31.2047V6.79529C33.5294 5.51139 32.4886 4.47058 31.2047 4.47058Z"
        fill="url(#paint0_radial_825_939)"
      />
      <path
        d="M31.2047 4.47058H6.79529C5.51139 4.47058 4.47058 5.51139 4.47058 6.79529V31.2047C4.47058 32.4886 5.51139 33.5294 6.79529 33.5294H31.2047C32.4886 33.5294 33.5294 32.4886 33.5294 31.2047V6.79529C33.5294 5.51139 32.4886 4.47058 31.2047 4.47058Z"
        fill="url(#paint1_radial_825_939)"
        fillOpacity="0.57"
      />
      <path
        d="M31.2047 4.47058H6.79529C5.51139 4.47058 4.47058 5.51139 4.47058 6.79529V31.2047C4.47058 32.4886 5.51139 33.5294 6.79529 33.5294H31.2047C32.4886 33.5294 33.5294 32.4886 33.5294 31.2047V6.79529C33.5294 5.51139 32.4886 4.47058 31.2047 4.47058Z"
        fill="url(#paint2_radial_825_939)"
        fillOpacity="0.68"
      />
      <path
        d="M31.2047 4.47058H6.79529C5.51139 4.47058 4.47058 5.51139 4.47058 6.79529V31.2047C4.47058 32.4886 5.51139 33.5294 6.79529 33.5294H31.2047C32.4886 33.5294 33.5294 32.4886 33.5294 31.2047V6.79529C33.5294 5.51139 32.4886 4.47058 31.2047 4.47058Z"
        fill="url(#paint3_radial_825_939)"
        fillOpacity="0.08"
      />
      <path
        d="M31.2047 4.47058H6.79529C5.51139 4.47058 4.47058 5.51139 4.47058 6.79529V31.2047C4.47058 32.4886 5.51139 33.5294 6.79529 33.5294H31.2047C32.4886 33.5294 33.5294 32.4886 33.5294 31.2047V6.79529C33.5294 5.51139 32.4886 4.47058 31.2047 4.47058Z"
        fill="url(#paint4_linear_825_939)"
        fillOpacity="0.03"
      />
      <path
        d="M14.6993 29.1706V20.1623L23.2135 29.1706H27.9501V28.9381L18.1573 18.6803L27.1946 8.94564V8.82941H22.4289L14.6993 17.4308V8.82941H10.8635V29.1706H14.6993Z"
        fill="white"
      />
      <defs>
        <radialGradient
          id="paint0_radial_825_939"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-18.0232 18.3775) rotate(140.172) scale(49.9815 60.3139)"
        >
          <stop stopColor="#2F80F2" />
          <stop offset="0.999657" stopColor="#A942B5" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_825_939"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(3.9999 4.92317) rotate(46.3208) scale(46.2348 48.4474)"
        >
          <stop stopColor="#45F9DE" />
          <stop offset="1" stopColor="#A942B5" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_825_939"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-24.2977 -10.2735) rotate(180) scale(27.9092 14.3721)"
        >
          <stop stopColor="#E957C5" />
          <stop offset="1" stopColor="#A942B5" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint3_radial_825_939"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-21.4531 6.25463) rotate(119.938) scale(16.7529 25.1159)"
        >
          <stop stopOpacity="0.184878" />
          <stop offset="1" stopColor="#101010" />
        </radialGradient>
        <linearGradient
          id="paint4_linear_825_939"
          x1="31.8549"
          y1="21.6054"
          x2="4.47058"
          y2="4.47058"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.184878" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default KeplrIcon;
