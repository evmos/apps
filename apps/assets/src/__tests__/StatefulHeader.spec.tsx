import { test } from "vitest";
import { render } from "@testing-library/react";
import { StatefulHeader } from "../StatefulHeader";
import { vi } from "vitest";

vi.mock("evmos-wallet", async () => {
  return {
    ButtonWalletConnection: vi.fn(),
    StoreType: vi.fn(),
  };
});

vi.mock("react-redux", async () => {
  return {
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});

test("temporary test", () => {
  render(<StatefulHeader pageName="test" />);
});
