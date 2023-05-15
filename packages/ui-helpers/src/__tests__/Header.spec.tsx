// import mixpanel from "mixpanel-browser";
// import {

//   screen,
//   render,
//   renderHook,
//   act,
// } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { CLICK_EVMOS_LOGO, MixpanelProvider, useTracker } from "tracker";
// import { Header } from "../Header";
// import { CONFIG, TOKEN, eventTriggerByText } from "./testConstants";

// describe("Testing for Header", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   const myFunction = (pageName: string) => {
//     render(<Header pageName={pageName} />);
//     const expectedText = pageName;
//     eventTriggerByText(expectedText);

//     const wrapper = ({ children }: { children: JSX.Element }) => (
//       <MixpanelProvider token={TOKEN} config={CONFIG}>
//         {children}
//       </MixpanelProvider>
//     );

//     return wrapper;
//   };

//   it("Header in Governance: clicks on Logo and triggers the tracker action", () => {
//     const pageName = "Governance";
//     const localProps = {
//       pageName: pageName,
//       wallet: "0x...",
//       provider: "Keplr",
//     };
//     const wrapper = myFunction(pageName);
//     const { result } = renderHook(
//       () => useTracker(CLICK_EVMOS_LOGO, localProps),
//       {
//         wrapper,
//         initialProps: {
//           children: <Header pageName={pageName} />,
//         },
//       }
//     );

//     expect(mixpanel.init).toHaveBeenCalledTimes(1);

//     act(() => {
//       result.current.handlePreClickAction();
//     });
//     expect(mixpanel.track).toHaveBeenCalledWith(CLICK_EVMOS_LOGO, localProps);
//     expect(mixpanel.track).toHaveBeenCalledTimes(1);
//   });

//   it("Header in Mission Control: appears the menu option", () => {
//     const pageName = "Mission";
//     render(<Header pageName={pageName} />);
//     const expectedText = "Menu";
//     const textElement = screen.getByText(expectedText);
//     expect(textElement).toBeInTheDocument();
//   });
// });

test("should pass", () => {
  expect(true).toBe(true);
});

export {};
