import { test, expect } from "vitest";
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
  // render(<StatefulHeader pageName="test" />);
  expect(true).toBe(true);
});
