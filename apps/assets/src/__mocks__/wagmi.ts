export { ProviderRpcError } from "wagmi";
export { configureChains, createClient } from "wagmi";
export { useAccount, useDisconnect } from "wagmi";

// Mock the `mixpanel-browser` library
const wagmi = {
  ProviderRpcError: jest.fn(),
  configureChains: jest.fn(),

  createClient: jest.fn(),
  useAccount: jest.fn(),
  useDisconnect: jest.fn(),
};

export default wagmi;
