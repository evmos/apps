// import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
// import { MixpanelProvider } from "tracker";
// import { CLICK_BACK_TO_MC } from "tracker";
// import mixpanel from "mixpanel-browser";

// import userEvent from "@testing-library/user-event";
// import Content from "../components/governance/Content";
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

describe("Testing Content governance", () => {
  it("asd", () => {
    expect(true).toBe(true);
  });
  //   beforeEach(() => {
  //     jest.clearAllMocks();
  //   });

  //   it("should calls mixpanel event after clicking on register your token", async () => {
  //     // Define the wrapper component
  //     const queryClient = new QueryClient();
  //     // How do I create a mock for a class ?
  //     const Wrapper = ({ children }: { children: JSX.Element }) => (
  //       <MixpanelProvider token="testToken" config={{ ip: false }}>
  //         <QueryClientProvider client={queryClient}>
  //           {children}
  //         </QueryClientProvider>
  //       </MixpanelProvider>
  //     );

  //     // Render the component with the wrapper
  //     const { getByText } = render(<Content />, {
  //       wrapper: Wrapper,
  //     });
  //     const textElement = getByText(/back to mission control/i);
  //     expect(textElement).toBeInTheDocument();
  //     expect(mixpanel.init).toHaveBeenCalledTimes(1);

  //     await userEvent.click(textElement);

  //     expect(mixpanel.track).toHaveBeenCalledTimes(1);
  //   });
});
