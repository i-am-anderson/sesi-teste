import { useEffect, useState } from "react";

const CONTAINER_MAX = 1212;
const GUTTER = 24;

const measure = () =>
  Math.max(GUTTER, (document.documentElement.clientWidth - CONTAINER_MAX) / 2);

export function useContainerOffset() {
  const [offset, setOffset] = useState(measure);

  useEffect(() => {
    const onResize = () => setOffset(measure());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return offset;
}
