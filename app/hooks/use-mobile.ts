import * as React from 'react';

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function useIsMobile({ isTablet = false }: { isTablet?: boolean } = {}) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(
      `(max-width: ${isTablet ? TABLET_BREAKPOINT - 1 : MOBILE_BREAKPOINT - 1}px)`
    );
    const onChange = () => {
      setIsMobile(window.innerWidth < (isTablet ? TABLET_BREAKPOINT : MOBILE_BREAKPOINT));
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < (isTablet ? TABLET_BREAKPOINT : MOBILE_BREAKPOINT));
    return () => mql.removeEventListener('change', onChange);
  }, [isTablet]);

  return !!isMobile;
}

export default function useWindowResize() {
  const [windowWidth, setWindowWidth] = React.useState<null | number>(null);
  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });
  return { windowWidth };
}
