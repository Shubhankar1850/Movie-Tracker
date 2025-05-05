import { useState, useEffect } from 'react';
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024
};
const useMobile = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setIsMobile(window.innerWidth <= BREAKPOINTS.mobile);
      setIsTablet(window.innerWidth > BREAKPOINTS.mobile && window.innerWidth <= BREAKPOINTS.tablet);
      setIsDesktop(window.innerWidth > BREAKPOINTS.tablet);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isViewportWidth: (maxWidth: number) => windowSize.width <= maxWidth
  };
};

export default useMobile;