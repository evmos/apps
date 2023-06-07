beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(window.localStorage.__proto__, "setItem");
  jest.spyOn(window.localStorage.__proto__, "getItem");
});

afterEach(() => {
  window.localStorage.__proto__.setItem.mockRestore();
  window.localStorage.__proto__.getItem.mockRestore();
});
