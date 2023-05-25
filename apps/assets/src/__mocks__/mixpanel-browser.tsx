// Mock the `mixpanel-browser` library
const mixpanel = {
  init: jest.fn(),
  track: jest.fn(),
  get_config: jest.fn(() => ({
    /* mocked config object */
  })),
};

export default mixpanel;
