export const getSelectedNetworkMode = () => {
  if (typeof window === "undefined") return "mainnet";
  return localStorage.getItem("networkMode") || "mainnet";
};

export const setSelectedNetworkMode = (mode: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("networkMode", mode);
};
