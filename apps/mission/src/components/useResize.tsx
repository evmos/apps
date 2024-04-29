// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useState, useEffect } from "react";

function useWindowResize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
  });

  const handleResize = () => {
    setWindowSize({ width: window.innerWidth });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth });
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowSize.width <= 640;
  const isTablet = windowSize.width >= 641 && windowSize.width <= 768;
  return {
    windowSize,
    isMobile: isMobile,
    isTablet: isTablet,
    isDesktop: !isMobile && !isTablet,
  };
}

export default useWindowResize;
