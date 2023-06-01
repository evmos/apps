// Mock the `mixpanel-browser` library
const mixpanel = {
  init: jest.fn(),
  track: jest.fn(),
  // which value should have config ? Check in console.log in the browser
  // if the token is not defined, I shouldn't have this config
  // how should I manage this ?
  config: jest.fn(),
  // get_config: jest.fn(() => ({
  /* mocked config object */
  // })),
};

export default mixpanel;
