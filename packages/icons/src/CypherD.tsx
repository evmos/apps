// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type CypherDIconProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const CypherDIcon: React.FC<CypherDIconProps> = ({
  width = "301",
  height = "324",
  ...restProps
}) => {
  return (
    <svg
      {...restProps}
      width={width}
      height={height}
      viewBox="0 0 301 324"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M179.669 192.677C205.669 187.76 254.882 168.634 243.74 131.462C242.115 125.808 234.825 114.204 218.668 113.024C219.597 99.9942 215.186 71.4272 190.115 61.3968C190.812 59.4301 192.622 55.6441 194.294 56.2341C196.383 56.9716 217.972 51.0714 204.044 27.4704C200.097 23.2911 188.444 19.2101 173.401 36.3208C170.151 40.2543 163.094 50.4813 160.865 59.9217C154.83 60.4134 141.783 62.1343 137.883 65.0844C125.116 53.0381 95.1232 34.6982 77.2948 57.7091C74.5091 63.1177 72.6984 75.2623 87.7411 80.5725C90.0625 81.3101 96.9339 81.3101 105.848 75.4098C108.238 75.4098 112.226 76.1913 116.294 78.5589C101.205 97.1766 79.5233 143.263 113.509 178.664C108.402 180.97 96.0982 187.852 87.7411 196.934C84.3038 186.055 75.8107 164.579 69.3364 165.715C62.8622 166.85 64.3908 183.217 65.9644 191.258C67.898 199.063 72.871 216.234 77.2948 222.478C78.072 242.581 86.96 283.214 116.294 284.917C121.773 284.68 131.247 280.659 125.312 266.469L140.823 262.211C139.249 268.834 136.777 282.646 139.474 284.917C142.846 287.755 158.358 294.141 166.45 287.045C174.543 279.95 178.779 270.726 169.822 266.469C169.12 266.135 168.453 265.853 167.82 265.617C172.318 267.1 177.028 268.635 179.264 269.307C183.985 267.888 193.426 262.211 193.426 250.859C193.426 239.506 183.535 241.398 178.59 243.764C183.58 233.357 190.783 208.571 179.669 192.677Z"
        fill="#FFDE59"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M197.276 32.6221C200.342 37.9316 201.24 41.8912 201.167 44.739C201.095 47.5753 200.055 49.6592 198.613 51.2537C197.117 52.9086 195.159 54.0544 193.398 54.7402C192.529 55.0787 191.775 55.2789 191.241 55.3748C191.073 55.4048 190.944 55.4215 190.854 55.4303C189.234 55.0468 187.855 55.6898 187.01 56.3047C186.113 56.9579 185.432 57.8314 184.953 58.5465C183.973 60.0104 183.222 61.7622 182.812 62.92L181.598 66.348L184.828 67.6404C196.31 72.234 203.073 81.0401 206.906 90.3637C210.772 99.7698 211.582 109.56 211.154 115.56L210.892 119.241L214.364 119.495C228.837 120.552 235.079 130.867 236.366 135.344L236.372 135.365L236.378 135.386C238.885 143.748 237.982 150.909 234.947 157.148C231.855 163.502 226.442 169.109 219.644 173.929C206.022 183.59 187.728 189.472 174.995 191.879L169.5 192.919L172.825 197.674C177.643 204.564 178.653 213.641 177.668 222.669C176.686 231.657 173.78 240.037 171.441 244.914L166.987 254.203L175.944 249.919C178.141 248.868 181.059 248.142 183.123 248.577C184.041 248.77 184.614 249.15 184.999 249.68C185.406 250.239 185.902 251.381 185.902 253.671C185.902 258.15 184.074 261.502 181.65 263.98C179.523 266.154 177.008 267.567 175.142 268.285C172.728 267.534 168.73 266.23 164.839 264.947C164.296 264.746 163.769 264.573 163.256 264.424C161.838 263.955 160.473 263.502 159.252 263.095L160.25 245.376L153.362 244.755L150.854 268.879L157.223 271.224C157.136 271.372 157.085 271.43 157.089 271.435C157.105 271.454 158.073 270.554 161.328 271.469L162.663 271.91C163.184 272.106 163.743 272.343 164.342 272.628C166.073 273.45 166.764 274.316 167.048 274.924C167.324 275.514 167.437 276.33 167.126 277.547C166.452 280.186 164.022 283.664 160.181 287.031C157.354 289.51 152.783 289.92 147.767 288.915C145.363 288.434 143.077 287.666 141.21 286.86C139.616 286.172 138.485 285.524 137.875 285.098C137.814 284.85 137.748 284.453 137.706 283.877C137.607 282.491 137.687 280.603 137.917 278.413C138.371 274.066 139.346 269.13 140.109 265.92L141.533 259.925L116.431 266.815L118.085 270.768C120.715 277.058 119.545 279.95 118.412 281.327C117.006 283.034 114.458 283.926 112.245 284.057C99.4387 283.236 90.8053 274.025 85.1202 261.789C79.4054 249.489 77.0576 234.841 76.6825 225.14L76.6384 223.999L75.992 223.087C74.1354 220.467 71.9343 215.115 69.8848 209.032C67.9022 203.147 66.2154 197.058 65.2648 193.232C64.5179 189.382 63.809 183.663 64.0194 178.88C64.1267 176.44 64.4629 174.549 64.9632 173.323C65.3441 172.389 65.6501 172.199 65.7749 172.158C65.8182 172.179 66.4797 172.305 67.8525 173.883C69.326 175.577 70.9415 178.186 72.5706 181.377C75.8058 187.715 78.7152 195.591 80.3963 200.912L82.1949 206.605L86.1487 202.308C94.0609 193.709 105.904 187.059 110.796 184.85L115.553 182.703L111.865 178.86C95.8234 162.151 92.9406 143.071 95.836 125.771C98.511 109.788 106.134 95.3843 112.957 86.2023C115.435 88.1295 117.801 90.8403 119.583 94.6149L125.949 91.7971C125.353 89.9294 124.072 87.2167 122.08 84.6257C120.125 82.0824 117.343 79.476 113.65 78.018C109.155 75.4607 104.702 74.5553 101.781 74.5553H100.791L99.951 75.1114C91.7005 80.5723 85.8965 80.2308 84.7041 79.8837C78.1088 77.5384 75.8348 73.9989 75.1103 71.062C74.3492 67.9764 75.0912 64.7165 76.1175 62.5713C83.862 52.7997 94.1172 51.6501 104.526 54.6052C115.168 57.6261 125.391 64.8555 131.519 70.6368L133.579 72.5807L135.824 70.8825C136.31 70.5152 137.394 69.9915 139.183 69.432C140.885 68.8994 142.936 68.4198 145.12 68.0026C149.483 67.1689 154.134 66.6291 157.063 66.3905L159.547 66.1881L160.153 63.6249C162.173 55.0675 168.754 45.4122 171.9 41.5922C179.02 33.5076 184.962 30.8467 189.182 30.3708C193.162 29.9221 195.928 31.366 197.276 32.6221ZM106.683 82.8177C99.5337 92.7716 91.8311 107.74 89.0279 124.489C86.0201 142.46 88.6702 162.537 103.64 180.336C98.506 183.12 91.3533 187.627 85.157 193.265C83.4216 188.416 81.1473 182.776 78.6513 177.886C76.9182 174.49 74.9817 171.263 72.9344 168.91C71.0855 166.784 68.2129 164.294 64.7059 164.909C61.4989 165.472 59.6229 167.946 58.6174 170.41C57.6326 172.823 57.2354 175.739 57.1123 178.538C56.8635 184.194 57.6925 190.625 58.5126 194.816L58.531 194.91L58.554 195.002C59.5413 198.988 61.2964 205.335 63.3734 211.5C65.2305 217.012 67.4831 222.81 69.8225 226.529C70.3508 236.919 72.8753 252.025 78.9178 265.031C85.1792 278.508 95.6051 290.437 112.039 291.391L112.204 291.4L112.368 291.393C115.598 291.254 120.437 290.018 123.621 286.149C126.495 282.658 127.408 277.828 125.796 271.82L132.159 270.074C131.713 272.497 131.304 275.118 131.044 277.604C130.796 279.978 130.665 282.384 130.812 284.432C130.885 285.455 131.036 286.524 131.341 287.513C131.632 288.46 132.174 289.689 133.259 290.602C134.478 291.628 136.429 292.715 138.604 293.653C140.847 294.622 143.577 295.539 146.483 296.122C152.09 297.245 159.32 297.301 164.586 292.684C168.839 288.956 172.572 284.275 173.801 279.464C174.117 278.226 174.276 276.934 174.213 275.635C174.227 275.639 174.241 275.643 174.255 275.647L175.197 275.931L176.14 275.647C178.971 274.796 183.035 272.749 186.448 269.261C189.925 265.708 192.817 260.545 192.817 253.671C192.817 250.286 192.078 247.407 190.475 245.202C188.851 242.968 186.642 241.84 184.469 241.383C183.157 241.107 181.806 241.061 180.486 241.169C182.239 236.136 183.83 229.985 184.536 223.512C185.437 215.256 184.938 206.088 181.135 198.06C193.965 195.084 210.521 189.222 223.488 180.026C230.851 174.804 237.276 168.352 241.091 160.511C244.959 152.562 246.031 143.399 242.974 133.184C241.126 126.787 233.711 115.115 218.171 112.57C218.178 105.676 216.94 96.4238 213.244 87.4326C209.316 77.877 202.555 68.5059 191.516 62.7307C191.805 62.7016 192.1 62.6588 192.393 62.6062C193.385 62.4283 194.551 62.1041 195.783 61.6245C198.223 60.6739 201.183 59.0078 203.604 56.3298C206.08 53.5912 207.955 49.821 208.079 44.9363C208.201 40.1329 206.621 34.6298 202.907 28.3373L202.698 27.9832L202.42 27.688C199.705 24.813 194.772 22.3652 188.451 23.0779C182.105 23.7936 174.712 27.6392 166.806 36.6325L166.769 36.6739L166.734 36.7165C163.643 40.4579 157.078 49.8291 154.141 59.3015C151.199 59.6076 147.473 60.1009 143.894 60.7848C141.574 61.2281 139.256 61.7626 137.226 62.3977C136.236 62.7076 135.229 63.0666 134.285 63.4908C127.531 57.5435 117.276 50.6325 106.314 47.5205C94.176 44.0746 80.6158 45.2106 70.557 58.1935L70.3502 58.4604L70.194 58.7636C68.5072 62.0386 67.0585 67.3954 68.4209 72.9184C69.8531 78.7244 74.1831 83.8993 82.5826 86.8644L82.6323 86.882L82.6824 86.8979C86.1063 87.9857 93.6104 87.6381 102.683 81.9329C103.753 82.0293 105.14 82.2948 106.683 82.8177ZM65.8025 172.15C65.8144 172.147 65.8232 172.146 65.8287 172.146C65.8309 172.146 65.8325 172.145 65.8337 172.145C65.8215 172.147 65.8111 172.149 65.8025 172.15ZM190.684 55.4387C190.684 55.4393 190.698 55.44 190.728 55.4391C190.7 55.4377 190.685 55.4381 190.684 55.4387Z"
        fill="#0F3E4D"
      />
      <path
        d="M167.475 99.8963C157.161 104.152 162.662 123.303 167.475 128.977C166.1 124.012 164.587 113.515 169.538 111.245C174.489 108.976 177.56 115.974 178.477 119.756C176.826 101.599 170.455 98.9505 167.475 99.8963Z"
        fill="#0F3E4D"
      />
      <path
        d="M195.976 96.5858C189.412 98.9503 192.913 109.589 195.976 112.742C195.1 109.984 194.138 104.152 197.288 102.891C200.439 101.63 202.393 105.518 202.977 107.619C201.926 97.5315 197.872 96.0604 195.976 96.5858Z"
        fill="#0F3E4D"
      />
      <path
        d="M209.937 134.118C217.632 129.023 221.693 130.58 222.761 131.995C225.326 134.118 225.967 147.563 216.99 149.685C209.809 151.384 205.021 147.563 203.525 145.44C202.457 143.789 202.243 139.213 209.937 134.118Z"
        fill="#0F3E4D"
      />
      <path
        d="M121.781 268.716C117.739 267.958 109.015 264.622 106.462 257.343"
        stroke="#0F3E4D"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};
