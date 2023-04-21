// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type LogoProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const Logo: React.FC<LogoProps> = ({
  width = "501",
  height = "111",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 501 111"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path d="M69.2986 3.69235C38.5094 15.5387 35.689 45.877 26.8605 60.0458C17.9274 74.3827 -2.53795 82.2932 0.260629 89.5994C3.0592 96.9056 23.5489 89.0584 39.7592 93.7204C55.7774 98.3263 78.1271 118.982 108.916 107.136C124.601 101.102 135.959 88.6806 141.181 73.9684C141.743 72.3892 140.693 70.7004 139.027 70.5444C137.991 70.4469 136.997 70.9904 136.53 71.9213C131.806 81.3525 123.702 89.1193 113.096 93.1989C95.5872 99.9347 76.43 94.6464 64.6643 81.3818C61.9922 78.3696 59.7066 74.9408 57.9025 71.1512C57.4065 70.1082 56.9348 69.0481 56.5166 67.9514C56.096 66.8548 55.7385 65.7508 55.4103 64.642C64.6643 60.3187 75.3431 55.7396 87.4492 51.0824C99.3195 46.5155 110.122 42.8112 119.741 39.8478C126.248 37.8446 132.212 36.1777 137.597 34.8154C137.986 34.7179 138.371 34.6204 138.752 34.5254C139.567 34.3231 140.403 34.7594 140.705 35.5441L140.71 35.5587C140.887 36.0242 141.04 36.4921 141.206 36.96C142.271 39.9794 143.068 43.0306 143.596 46.089C143.827 47.4269 145.286 48.1556 146.482 47.5122C150.902 45.1337 154.946 42.8137 158.559 40.5814C172.022 32.2712 179.486 25.2233 177.954 21.2291C176.425 17.2324 166.174 17.0033 150.62 19.8546C145.677 20.7612 140.197 21.9797 134.291 23.4882C133.27 23.7489 132.236 24.0194 131.191 24.2973C126.221 25.6181 120.979 27.1315 115.52 28.8252C105.369 31.9763 94.4785 35.7512 83.2356 40.0769C72.7172 44.1248 62.7483 48.3213 53.6062 52.5032C53.4943 34.7545 64.1999 17.9757 81.7086 11.2398C92.3121 7.16021 103.521 7.49408 113.329 11.3372C114.297 11.7174 115.399 11.4542 116.106 10.6866C117.239 9.45587 116.891 7.49652 115.42 6.69718C101.717 -0.728388 84.9838 -2.34169 69.2986 3.69235Z" />
      <path d="M249.267 78.1941H218.414V59.4018H247.607C248.541 59.4018 249.164 58.7719 249.164 57.827V48.2734C249.164 47.3286 248.541 46.6987 247.607 46.6987H218.414V30.1111H249.164C250.098 30.1111 250.721 29.4812 250.721 28.5363V18.9827C250.721 18.0378 250.098 17.4079 249.164 17.4079H205.749C204.815 17.4079 204.192 18.0378 204.192 18.9827V89.3224C204.192 90.2673 204.815 90.8972 205.749 90.8972H249.267C250.202 90.8972 253.456 90.2673 253.456 89.3224V79.7688C253.456 78.824 250.202 78.1941 249.267 78.1941Z" />
      <path d="M294.554 40.7145L282.201 74.7296L269.744 40.7145C269.433 39.8747 268.706 39.4547 267.876 39.4547H257.184C256.042 39.4547 255.523 40.0846 255.938 41.2395L275.039 89.6374C275.35 90.4773 276.077 90.8972 276.907 90.8972H287.495C288.326 90.8972 289.052 90.4773 289.364 89.6374L308.36 41.2395C308.775 40.0846 308.256 39.4547 307.114 39.4547H296.422C295.592 39.4547 294.865 39.8747 294.554 40.7145Z" />
      <path d="M378.823 38.2999C370.519 38.2999 364.498 42.2893 360.865 47.8535C357.647 41.6594 351.938 38.2999 345.19 38.2999C337.82 38.2999 332.422 42.3943 329.101 47.8535V47.7485L328.685 41.0295C328.582 40.0846 328.063 39.4547 327.128 39.4547H316.955C316.021 39.4547 315.398 40.0846 315.398 41.0295V89.3224C315.398 90.2673 316.021 90.8972 316.955 90.8972H327.543C328.478 90.8972 329.101 90.2673 329.101 89.3224V61.1865C329.101 58.7719 332.63 51.108 340.311 51.108C345.294 51.108 349.862 54.0476 349.862 62.5513V89.3224C349.862 90.2673 350.484 90.8972 351.419 90.8972H362.007C362.941 90.8972 363.564 90.2673 363.564 89.3224V60.9766C363.564 57.3021 367.093 51.108 374.775 51.108C379.654 51.108 384.221 54.0476 384.221 62.5513V89.3224C384.221 90.2673 384.844 90.8972 385.778 90.8972H396.366C397.3 90.8972 397.923 90.2673 397.923 89.3224V60.0317C397.923 46.2787 389.93 38.2999 378.823 38.2999Z" />
      <path d="M430.313 92.262C444.949 92.262 456.679 80.3988 456.679 65.281C456.679 50.1632 444.949 38.2999 430.313 38.2999C415.676 38.2999 403.946 50.1632 403.946 65.281C403.946 80.3988 415.676 92.262 430.313 92.262ZM430.313 79.4539C422.942 79.4539 417.129 73.5747 417.129 65.281C417.129 56.9872 422.942 51.108 430.313 51.108C437.579 51.108 443.496 56.9872 443.496 65.281C443.496 73.5747 437.579 79.4539 430.313 79.4539Z" />
      <path d="M475.843 53.8376C475.843 51.213 478.231 49.4283 481.449 49.4283C485.082 49.4283 487.469 50.7931 491.414 53.4177C492.348 54.1526 493.075 54.3625 493.698 53.5227L497.642 48.2734C498.161 47.6435 498.369 46.8036 497.746 46.0688C493.49 41.0295 486.846 38.2999 480.307 38.2999C471.172 38.2999 462.66 44.074 462.66 53.9426C462.66 71.2651 487.262 68.1155 487.262 76.3043C487.262 79.5589 484.044 80.6087 480.722 80.6087C476.674 80.6087 472.21 78.614 468.058 75.8844C467.124 75.1495 466.397 74.9395 465.774 75.7794L461.726 81.5536C461.311 82.1835 461.103 82.9184 461.726 83.6533C465.359 87.9576 472.418 92.262 481.137 92.262C490.48 92.262 500.549 86.4879 500.549 76.5143C500.549 57.6171 475.843 62.2364 475.843 53.8376Z" />
    </svg>
  );
};
