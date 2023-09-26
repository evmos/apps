import { Switch } from "./Switch";

const enableTestnetKey = "enableTestnet";
export const getEnableTestnet = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(enableTestnetKey) === "true";
}

export const setEnableTestnet = (value: boolean) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(enableTestnetKey, value ? "true" : "false");
}

export const TestnetToggle = () => {

  return (
    <Switch
      checked={getEnableTestnet()}
      onChange={({ target }) => {
        setEnableTestnet(target.checked);
        window.location.reload();
      }}
      label="Enable Testnet"
    />
  )
}