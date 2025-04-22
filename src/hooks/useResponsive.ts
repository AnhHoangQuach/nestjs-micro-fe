import { useWindowSize } from "react-use"

const useResponsive = () => {
  const { width } = useWindowSize()
  return {
    isDesktop: width >= 1200,
    isMobile: width < 600,
    isTablet: width >= 600 && width < 1200,
  }
}

export default useResponsive
