// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useState, useEffect } from "react";

function useWindowResize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
  });
  // it may be interesting to use `useLayoutEffect` here
  // as it run before the page is painted, it might help avoiding some layout flashing before this loads
  useLayoutEffect(() => {
    // checking for window here is unnecessary, window is never undefined inside useEffect
    setWindowSize({ width: window.innerWidth });
    
    // If it's not being used elsewhere, prefer creating this inside the useEffect so you don't need to pass it as a dependency of useEffect
    // I wonder why eslint  didn't complain about that btw
   const handleResize = () => {
      setWindowSize({ width: window.innerWidth });
    };
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
