import { useCallback, useEffect, useRef } from "react";

type Intersect = (
  // eslint-disable-next-line no-unused-vars
  entry: IntersectionObserverEntry,
  // eslint-disable-next-line no-unused-vars
  observer: IntersectionObserver
) => void;

export const useIntersect = <T extends HTMLElement>(
  onIntersect: Intersect,
  loading: boolean
) => {
  const ref = useRef<T>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && loading) onIntersect(entry, observer);
      });
    },
    [onIntersect, loading]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback, {
      threshold: 0.5,
    });
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [callback]);

  return ref;
};
