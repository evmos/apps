import { fireEvent, screen } from "@testing-library/react";
export const TOKEN = "testToken";
export const EMPTY_TOKEN = "";
export const CONFIG = { ip: false };

export const eventTriggerByText = (expectedText: string) => {
  const textElement = screen.getByText(expectedText);
  expect(textElement).toBeInTheDocument();
  // TODO: use userEvent.click instead of fireEvent
  fireEvent.click(textElement);
};

export const eventTriggerByCheckbox = (checkboxElement: HTMLInputElement) => {
  fireEvent.click(checkboxElement);
  expect(checkboxElement.checked).toBe(true);
};

// is this a good practice ? Or where should I define them ?
test("should pass", () => {
  expect(true).toBe(true);
});
