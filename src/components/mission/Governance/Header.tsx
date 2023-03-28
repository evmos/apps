import dynamic from "next/dynamic";
import CommonWealthIcon from "../../footer/icons/CommonWealth";

const Button = dynamic(() => import("../../common/Button"));

const Header = () => {
  return (
    <div className="flex mb-6 w-full justify-between">
      <span className="text-lg text-pearl font-semibold">GOVERNANCE</span>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            console.log("click");
          }}
        >
          <div className="flex items-center space-x-2 ">
            <span>VOTE</span>
          </div>
        </Button>
        <Button
          onClick={() => {
            console.log("click");
          }}
        >
          <div className="flex items-center space-x-2 ">
            <span>DOCS</span>
          </div>
        </Button>
        <Button
          onClick={() => {
            console.log("click");
          }}
        >
          <div className="flex items-center space-x-2 ">
            <CommonWealthIcon width={16} height={16} />
            <span>DISCUSSION</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Header;
