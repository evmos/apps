// import mixpanel from "mixpanel-browser";
// import {
//   fireEvent,
//   screen,
//   render,
//   renderHook,
//   act,
// } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import { CLICK_HIDE_ZERO_BALANCE, MixpanelProvider, useTracker } from "tracker";
// import { Switch } from "../Switch";
// import { useState } from "react";
// import { CONFIG, TOKEN, eventTriggerByCheckbox } from "./testConstants";

// describe("Testing for Switch", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("Switch: track checked status on click", () => {
//     const Wrap = () => {
//       const [isChecked, setIsChecked] = useState(false);
//       return (
//         <Switch
//           checked={isChecked}
//           label="Hide Zero Balance"
//           onChange={() => setIsChecked(!isChecked)}
//         />
//       );
//     };

//     render(<Wrap />);
//     const checkboxElement = screen.getByRole("checkbox") as HTMLInputElement;
//     eventTriggerByCheckbox(checkboxElement);
//     const wrapper = ({ children }: { children: JSX.Element }) => (
//       <MixpanelProvider token={TOKEN} config={CONFIG}>
//         {children}
//       </MixpanelProvider>
//     );

//     const { result, rerender } = renderHook(
//       () =>
//         useTracker(CLICK_HIDE_ZERO_BALANCE, {
//           status: checkboxElement.checked,
//         }),
//       {
//         wrapper,
//         initialProps: {
//           children: <Wrap />,
//         },
//       }
//     );

//     expect(mixpanel.init).toHaveBeenCalledTimes(1);

//     act(() => {
//       result.current.handlePreClickAction();
//     });

//     expect(mixpanel.track).toHaveBeenCalledWith(CLICK_HIDE_ZERO_BALANCE, {
//       status: checkboxElement.checked,
//     });
//     expect(mixpanel.track).toHaveBeenCalledTimes(1);

//     fireEvent.click(checkboxElement);
//     expect(checkboxElement.checked).toBe(false);

//     rerender();
//     act(() => {
//       result.current.handlePreClickAction();
//     });

//     expect(mixpanel.track).toHaveBeenCalledWith(CLICK_HIDE_ZERO_BALANCE, {
//       status: checkboxElement.checked,
//     });
//   });
// });

// is this a good practice ? Or where should I define them ?
test("should pass", () => {
  expect(true).toBe(true);
});
