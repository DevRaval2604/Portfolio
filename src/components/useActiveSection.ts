import { useState, useEffect, useMemo } from 'react';

const DEFAULT_OPTIONS: IntersectionObserverInit = {
  threshold: 0.5,
  rootMargin: "-20% 0px -60% 0px"
};

export function useActiveSection(sectionIds: string[], options: IntersectionObserverInit = {}) {
  const [activeSection, setActiveSection] = useState<string>('hero');

  const observerOptions = useMemo(() => ({
    threshold: options.threshold ?? DEFAULT_OPTIONS.threshold,
    rootMargin: options.rootMargin ?? DEFAULT_OPTIONS.rootMargin
  }), [options.threshold, options.rootMargin]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible) {
          setActiveSection(mostVisible.target.id);
        }
      },
      observerOptions
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, observerOptions]);

  return activeSection;
}