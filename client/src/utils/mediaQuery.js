import { useMediaQuery } from "react-responsive";

export const useForMobile = () => useMediaQuery({ query: "(max-width:510px" });
export const useForTablet = () => useMediaQuery({ query: "(max-width:768px" });
export const useForLaptop = () => useMediaQuery({ query: "(max-width:1024px" });
