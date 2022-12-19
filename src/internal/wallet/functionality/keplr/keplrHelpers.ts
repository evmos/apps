// window?.addEventListener('keplr_keystorechange', onAccountChange);
export function unsubscribeToKeplrEvents(handler: () => Promise<void>) {
  if (!window.keplr) return;
  try {
    window.removeEventListener("keplr_keystorechange", handler);
    return;
  } catch (e) {
    return;
  }
}

export function subscribeToKeplrEvents(handler: () => Promise<void>) {
  if (!window.keplr) return;
  try {
    window.removeEventListener("keplr_keystorechange", handler);
    window.addEventListener("keplr_keystorechange", handler);
    return;
  } catch (e) {
    return;
  }
}
