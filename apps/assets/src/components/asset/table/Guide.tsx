import Link from "next/link";
import QuestionMarkIcon from "../../common/images/icons/QuestionMarkIcon";
import AssetsGuide from "../modals/AssetsGuide";

const Guide = () => {
  return (
    <div className="flex items-center space-x-3 text-white">
      <QuestionMarkIcon width={20} height={20} />
      <div>
        Don&apos;t see your token? Find out how to {/* TODO: add link */}
        <Link
          href="https://github.com/evmos/chain-token-registry"
          rel="noopener noreferrer"
          className="text-red"
          target="_blank"
        >
          register your token
        </Link>{" "}
        or <AssetsGuide />.
      </div>
    </div>
  );
};

export default Guide;
