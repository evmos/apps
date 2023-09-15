// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type WizardProps = React.SVGAttributes<SVGElement> & {
  color?: string;
};

export const WizardIcon: React.FC<WizardProps> = ({
  width = "49",
  height = "49",
  color = "currentColor",
  ...restProps
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 49 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      {...restProps}
    >
      <g clipPath="url(#clip0_719_486)">
        <path
          opacity="0.2"
          d="M24.2573 48.3018C37.5122 48.3018 48.2573 37.5566 48.2573 24.3018C48.2573 11.0469 37.5122 0.301758 24.2573 0.301758C11.0025 0.301758 0.257324 11.0469 0.257324 24.3018C0.257324 37.5566 11.0025 48.3018 24.2573 48.3018Z"
          fill="#FCDBD6"
        />
        <mask
          id="mask0_719_486"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="49"
          height="49"
        >
          <path
            d="M24.2573 48.3018C37.5122 48.3018 48.2573 37.5566 48.2573 24.3018C48.2573 11.0469 37.5122 0.301758 24.2573 0.301758C11.0025 0.301758 0.257324 11.0469 0.257324 24.3018C0.257324 37.5566 11.0025 48.3018 24.2573 48.3018Z"
            fill="black"
          />
        </mask>
        <g mask="url(#mask0_719_486)">
          <path
            d="M34.2735 39.0107H16.4671C13.7025 39.0107 11.331 40.7642 10.316 43.2622C9.90871 42.7943 9.32667 42.4946 8.67672 42.4946C7.45254 42.4946 6.45093 43.5397 6.45093 44.8171V48.3011H40.9509V45.9785C40.9509 42.1311 37.9605 39.0107 34.2735 39.0107Z"
            fill="#FF745D"
          />
          <path
            d="M20.9187 37.8501H29.822C29.822 37.8501 30.9348 48.3018 25.3703 48.3018C19.8059 48.3018 20.9187 37.8501 20.9187 37.8501Z"
            fill="#ED4E33"
          />
          <path
            d="M25.3703 32.6857C34.59 32.6857 42.0638 30.8509 42.0638 28.5875C42.0638 26.3241 34.59 24.4893 25.3703 24.4893C16.1507 24.4893 8.67676 26.3241 8.67676 28.5875C8.67676 30.8509 16.1507 32.6857 25.3703 32.6857Z"
            fill="#292F33"
          />
          <path
            d="M34.6506 26.8914C33.7503 22.7107 29.9375 16.8462 25.3701 16.8462C20.8029 16.8462 16.9901 22.7107 16.0896 26.8914C15.1593 26.9471 14.427 27.4952 14.427 29.085C14.427 30.7666 15.2439 32.1299 16.251 32.1299C16.2677 32.1299 16.2823 32.123 16.2989 32.1218C17.483 37.2036 21.0956 41.4272 25.3712 41.4272C29.6471 41.4272 33.2595 37.2036 34.4437 32.1218C34.4604 32.123 34.4749 32.1299 34.4915 32.1299C35.4988 32.1299 36.3156 30.7666 36.3156 29.085C36.3134 27.4952 35.5822 26.9482 34.6506 26.8914Z"
            fill="#FFDC5D"
          />
          <path
            d="M20.9186 30.544C20.3066 30.544 19.8058 30.0214 19.8058 29.3826V28.2214C19.8058 27.5826 20.3066 27.0601 20.9186 27.0601C21.5307 27.0601 22.0315 27.5826 22.0315 28.2214V29.3826C22.0315 30.0214 21.5307 30.544 20.9186 30.544ZM29.8219 30.544C29.2097 30.544 28.7089 30.0214 28.7089 29.3826V28.2214C28.7089 27.5826 29.2097 27.0601 29.8219 27.0601C30.434 27.0601 30.9348 27.5826 30.9348 28.2214V29.3826C30.9348 30.0214 30.434 30.544 29.8219 30.544Z"
            fill="#662113"
          />
          <path
            d="M26.205 31.8391H24.5357C24.076 31.8391 23.701 31.4478 23.701 30.9682C23.701 30.4886 24.076 30.0972 24.5357 30.0972H26.205C26.6647 30.0972 27.0397 30.4886 27.0397 30.9682C27.0397 31.4478 26.6647 31.8391 26.205 31.8391ZM27.782 35.5657H22.9598C22.5012 35.5657 22.1251 35.1743 22.1251 34.6947V34.3103C22.1251 33.8319 22.5001 33.4393 22.9598 33.4393H27.782C28.2417 33.4393 28.6167 33.8307 28.6167 34.3103V34.6947C28.6167 35.1732 28.2406 35.5657 27.782 35.5657Z"
            fill="#C1694F"
          />
          <path
            d="M34.7454 27.2196C34.9602 27.1128 35.1327 26.9594 35.2451 26.7562C35.7059 25.9236 35.0014 24.5974 33.6703 23.7961C32.3392 22.9948 30.8869 23.0203 30.4262 23.8529C29.9654 24.6857 30.6699 26.0118 32.001 26.8132C32.5786 27.1604 33.1739 27.3439 33.7059 27.3809C33.381 27.9896 33.1607 29.0916 33.1607 30.3643C33.1607 31.5988 33.3666 32.6764 33.6758 33.2954C33.2207 33.2768 32.6153 33.7553 32.2392 34.1827C31.4501 33.3244 30.1903 32.3839 28.7669 32.09C26.4832 31.6186 25.5384 32.5382 25.3302 33.1736C25.1277 32.5382 24.185 31.6081 21.8914 32.0819C20.4903 32.3711 19.2493 33.2873 18.458 34.1339C18.0808 33.7193 17.501 33.278 17.0635 33.2954C17.3741 32.6764 17.58 31.5977 17.58 30.3643C17.58 29.0858 17.3573 27.9791 17.0291 27.374C17.659 27.4484 18.4469 27.2696 19.2026 26.8143C20.5336 26.0129 21.2381 24.6868 20.7774 23.8542C20.3166 23.0216 18.8643 22.996 17.5332 23.7973C16.2022 24.5985 15.4978 25.9247 15.9584 26.7574C16.0141 26.8584 16.0864 26.9467 16.1688 27.0233C15.7002 27.4321 15.3541 28.7653 15.3541 30.3643C15.3541 32.2886 15.8527 33.8483 16.4671 33.8483C16.4893 33.8483 16.5104 33.832 16.5327 33.8273C16.4916 33.9852 16.4671 34.178 16.4671 34.4207C16.4671 36.5377 17.2094 36.5377 17.2094 36.5377C16.4671 38.6548 17.9517 40.7881 17.9517 40.7881C17.9517 43.9642 20.1775 43.9642 20.1775 43.9642C20.1764 47.1403 23.1445 46.0824 23.1445 46.0824C23.8868 47.1403 25.3702 47.1403 25.3702 47.1403C25.3702 47.1403 26.8538 47.1403 27.5961 46.0824C27.5961 46.0824 30.5642 47.1403 30.5642 43.9654C30.5642 43.9654 32.7901 43.9654 32.7901 40.7893C32.7901 40.7893 34.2735 38.656 33.5323 36.539C33.5323 36.539 34.2746 36.539 34.2746 34.4219C34.2746 34.178 34.2501 33.9852 34.209 33.8273C34.2312 33.832 34.2523 33.8483 34.2746 33.8483C34.8889 33.8483 35.3875 32.2886 35.3875 30.3643C35.3864 28.9708 35.1237 27.777 34.7454 27.2196ZM28.3384 36.5377C26.2394 35.042 25.3702 35.4799 25.3702 35.4799C25.3702 35.4799 24.5011 35.042 22.4021 36.5377C21.2749 37.3414 20.1497 36.3148 19.3472 35.3103C20.1797 34.9909 21.2213 34.588 22.3242 34.3604C24.362 34.3952 25.1444 34.0991 25.3302 33.6648C25.5161 34.0874 26.304 34.3592 28.3351 34.3685C29.4624 34.6008 30.5275 35.0188 31.3689 35.3404C30.5686 36.3345 29.4536 37.3344 28.3384 36.5377Z"
            fill="#E6E7E8"
          />
          <path
            d="M34.012 24.0968C32.6453 20.9764 26.2529 6.49512 25.3703 6.49512C24.4878 6.49512 18.0953 20.9764 16.7287 24.0968C11.3644 25.0769 8.67676 26.9281 8.67676 28.5596C15.3541 26.237 20.9187 25.7226 25.3703 25.7226C29.822 25.7226 35.3864 26.237 42.0638 28.5596C42.0638 26.9281 39.3762 25.0769 34.012 24.0968Z"
            fill="#FF745D"
          />
          <path
            d="M10.9024 48.3023H8.67662V20.2711L7.56372 15.7861H12.0153L10.9024 20.2711V48.3023Z"
            fill="#CE825E"
          />
          <path
            d="M9.78964 16.9473C11.6335 16.9473 13.1284 15.3874 13.1284 13.4633C13.1284 11.5393 11.6335 9.97949 9.78964 9.97949C7.94572 9.97949 6.45093 11.5393 6.45093 13.4633C6.45093 15.3874 7.94572 16.9473 9.78964 16.9473Z"
            fill="#FC9280"
          />
          <path
            d="M9.2332 14.6241C10.1552 14.6241 10.9026 13.8441 10.9026 12.882C10.9026 11.92 10.1552 11.1401 9.2332 11.1401C8.31124 11.1401 7.56384 11.92 7.56384 12.882C7.56384 13.8441 8.31124 14.6241 9.2332 14.6241Z"
            fill="#FCDBD6"
          />
          <path
            d="M13.1284 41.914C13.1284 44.1587 11.6337 45.9785 9.78964 45.9785C7.94555 45.9785 6.45093 44.1587 6.45093 41.914C6.45093 39.6692 7.94555 39.0107 9.78964 39.0107C11.6337 39.0107 13.1284 39.6692 13.1284 41.914Z"
            fill="#FFDC5D"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_719_486">
          <rect
            width="48"
            height="48"
            fill="white"
            transform="translate(0.257324 0.301758)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};