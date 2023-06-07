import "@testing-library/jest-dom";
import {
  CLICK_BACK_TO_MC,
  CLICK_COMMONWEALTH_OUTLINK,
  // CLICK_GOVERNANCE_PROPOSAL,
} from "tracker";
import { useRouter } from "next/router";
import Content from "../components/governance/Content";
// import { RouterContext } from "next/dist/shared/lib/router-context";
import { NAV_TO_MISSION_CONTROL } from "constants-helper";
import { successfullMixpanelEvent } from "../test-utils/utils";
// import createMockRouter from "../test-utils";
// import { RouterContext } from "next/dist/shared/lib/router-context";
// import mockRouter from "next-router-mock";
// import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
// import createMockRouter from "../mockRouter";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Testing Content governance", () => {
  // let router = createMockRouter({}, { id: "147" });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // const routerMock = createMockRouter({}, { id: undefined });
  {
    /* <RouterContext.Provider value={routerMock}></RouterContext.Provider> */
  }
  // <MemoryRouterProvider>
  it("should calls mixpanel event after clicking on back to mission control", async () => {
    // (useRouter as jest.Mock).mockReturnValue({
    //   query: {},
    //   push: () => {},
    // });
    const props = {
      comp: <Content />,
      event: CLICK_BACK_TO_MC,
      getBy: NAV_TO_MISSION_CONTROL,
    };
    await successfullMixpanelEvent(props);
  });

  it("should calls mixpanel event after clicking on commonwealth banner", async () => {
    const props = {
      comp: <Content />,
      event: CLICK_COMMONWEALTH_OUTLINK,
      getBy:
        "Have you ever wondered where proposals come from? Join us in our open and lively discussions over at Commonwealth",
    };
    await successfullMixpanelEvent(props);
  });

  // TODO: test content proposal and proposal details

  // it("renders the data when API request succeeds", async () => {
  //   const Wrapper = ({ children }: { children: JSX.Element }) => (
  //     // <RouterContext.Provider value={router}>
  //     <QueryClientProvider client={queryClient}>
  //       <MixpanelProvider token="testToken" config={{ ip: false }}>
  //         {children}
  //       </MixpanelProvider>
  //     </QueryClientProvider>
  //     // </RouterContext.Provider>
  //   );

  //   // Render the component with the wrapper
  //   const { getByText } = render(<Content />, {
  //     wrapper: Wrapper,
  //   });

  //   // Wait for the API request to complete and data to be rendered
  //   await waitFor(() => getByText(`#147`));

  //   // Assert that the data is rendered
  //   expect(getByText(`#147`)).toBeInTheDocument();

  //   await userEvent.click(getByText("#147"));

  //   expect(mixpanel.track).toHaveBeenCalledTimes(1);
  //   //  How can I show here the proposal details ?
  // });
});
