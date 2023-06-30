import { vi } from "vitest";
const mixpanel = {
  init: vi.fn(),
  track: vi.fn(),
};

export default mixpanel;
