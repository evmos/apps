export function unsubscribeToKeplrEvents() {
  if (!window.keplr) return;
  try {
    window.dispatchEvent(new Event("cleanUpEvents"));
    return;
  } catch (e) {
    return;
  }
}

export function subscribeToKeplrEvents(handler: () => Promise<boolean>) {
  if (!window.keplr) return;
  try {
    const handlerInternal = async () => {
      await handler();
      window.addEventListener("cleanUpEvents", () => {
        window.removeEventListener("keplr_keystorechange", handlerInternal);
      });
    };
    window.addEventListener("keplr_keystorechange", handlerInternal);
    return;
  } catch (e) {
    return;
  }
}
