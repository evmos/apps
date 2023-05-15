// import mixpanel from "mixpanel-browser";
import { render, screen } from "@testing-library/react";
// renderHook
import "@testing-library/jest-dom";
// import { , MixpanelProvider, useTracker } from "tracker";
import { eventTriggerByText } from "../testConstants";
//CONFIG, TOKEN
import DropdownChainDeposit from "../components/asset/dropdown/DropdownChainDeposit";

describe("Testing for Dropdown Chain Deposit", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const dropChainProps = {
    placeholder: "Select chain",
    data: [
      { chain: "Evmos", elements: [] },
      { chain: "Stride", elements: [] },
    ],
    token: undefined,
    chain: undefined,
    setChain: jest.fn(),
    setAddress: jest.fn(),
    setToken: jest.fn(),
  };

  //   export type DropdownChainsDepositProps = {
  //     placeholder: string;
  //     data: DepositElement[];
  //     token: TableDataElement | undefined;
  //     chain: DepositElement | undefined;
  //     setChain: Dispatch<SetStateAction<DepositElement | undefined>>;
  //     setAddress: Dispatch<SetStateAction<string>>;
  //     setToken: Dispatch<SetStateAction<TableDataElement | undefined>>;
  //   };

  //   const myFunction = () => {
  //     render(<DropdownChainDeposit dropChainProps={dropChainProps} />);
  //     const expectedText = "Select chain";
  //     eventTriggerByText(expectedText);

  //     // const wrapper = ({ children }: { children: JSX.Element }) => (
  //     //   <MixpanelProvider token={TOKEN} config={CONFIG}>
  //     //     {children}
  //     //   </MixpanelProvider>
  //     // );

  //     // return wrapper;
  //   };

  it("Displays correct chain options", () => {
    render(<DropdownChainDeposit dropChainProps={dropChainProps} />);
    const expectedText = "Select chain";
    eventTriggerByText(expectedText);

    expect(screen.getByText("Stride")).toBeInTheDocument();
    // const wrapper = myFunction();
    // const { result } = renderHook(() => useTracker(CLICK_BACK_TO_MC), {
    //   wrapper,
    //   initialProps: {
    //     children: <DropdownChainDeposit dropChainProps={dropChainProps} />,
    //   },
    // });

    // expect(mixpanel.init).toHaveBeenCalledTimes(1);
    // console.log(result);

    // act(() => {
    //   result.current.handlePreClickAction();
    // });
    // expect(mixpanel.track).toHaveBeenCalledWith(CLICK_BACK_TO_MC, {});
    // expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });
});
