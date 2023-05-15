import { fireEvent, screen } from "@testing-library/react";
export const TOKEN = "testToken";
export const EMPTY_TOKEN = "";
export const CONFIG = { debug: true, ip: false };

export const eventTriggerByText = (expectedText: string) => {
  const textElement = screen.getByText(expectedText);
  expect(textElement).toBeInTheDocument();
  fireEvent.click(textElement);
};
