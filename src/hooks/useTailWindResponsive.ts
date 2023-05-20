/*
Using:
  const isLarge = useTailWindResponsive('lg');
  const match = useTailWindResponsive('sm', 'max');
  */
import { useEffect, useState } from "react";
import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "../../tailwind.config.js";
type defaultScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type defaultScreenConstraint = "min" | "max";
type Screens = {
  [key in defaultScreenSize]: string;
};
const tailwindConfigResolved = resolveConfig(tailwindConfig);
const screenSizes = tailwindConfigResolved.theme?.screens as unknown as Screens;

export function useTailWindResponsive(
  query: defaultScreenSize,
  screenConstraint: defaultScreenConstraint = "min"
): boolean {
  const inputQueryMapped = screenSizes[query];
  const inputMediaQuery = `(${screenConstraint}-width: ${inputQueryMapped})`;
  const [matches, setMatches] = useState<boolean>(false);
  useEffect(() => {
    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }
    const matchQueryList = window.matchMedia(inputMediaQuery);
    setMatches(matchQueryList.matches);

    matchQueryList.addEventListener("change", handleChange);

    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
  }, [inputMediaQuery, query]);
  return matches;
}
