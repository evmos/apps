import { COMMONWEALTH_URL } from "../../internal/common/links";
import BannerBlack from "../common/banners/BannerBlack";
import ContainerProposals from "./proposals/ContainerProposals";

const Content = () => {
  return (
    <div className="mt-5 overflow-y-auto max-h-[65vh] xl:scrollbar-hide text-white font-[IBM] w-full">
      <BannerBlack
        text="Have you ever wondered where proposals come from? Join us in our open
          and lively discussions over at Commonwealth"
        href={COMMONWEALTH_URL}
      />
      <ContainerProposals />
    </div>
  );
};

export default Content;
