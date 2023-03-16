import { COMMONWEALTH_URL } from "../../internal/common/links";
import BannerBlack from "../common/banners/BannerBlack";

const Content = () => {
  return (
    <>
      <BannerBlack
        text="Have you ever wondered where proposals come from? Join us in our open
          and lively discussions over at Commonwealth"
        href={COMMONWEALTH_URL}
      />
    </>
  );
};

export default Content;
