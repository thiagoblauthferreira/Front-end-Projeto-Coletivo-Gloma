import React from "react";

interface IOptions {
  root?: Element | null | undefined;
  rootMargin?: string;
  threshold?: number;
}

type useInViewType = {
  inView: boolean;
  ref: React.RefObject<any> | null;
  observe: (
    element: React.RefObject<any>,
    callback: (entries: IntersectionObserverEntry[]) => void
  ) => IntersectionObserver | null;
  unObserve: (observer: IntersectionObserver) => void;
};

export default function useInView(options?: IOptions): useInViewType {
  const [inView, setInView] = React.useState(false);

  const containerRef = React.useRef(null);

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setInView(entry.isIntersecting);
  };

  React.useEffect(() => {
    const _observer = new IntersectionObserver(callback, options);
    if (containerRef.current) _observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) _observer.unobserve(containerRef.current);
    };
  }, [options]);

  const observe = (
    element: React.RefObject<any>,
    callback: (entries: IntersectionObserverEntry[]) => void
  ) => {
    const _observer = new IntersectionObserver(callback, options);
    containerRef.current = element.current;

    return _observer;
  };

  const unObserve = (observer: IntersectionObserver) => {
    if (containerRef.current) observer.unobserve(containerRef.current);
  };

  return {
    inView,
    ref: containerRef,
    observe,
    unObserve,
  };
}
