import { useEffect, useRef, RefObject } from 'react';

export function useFocusTrap(
  isOpen: boolean,
  containerRef: RefObject<HTMLElement>,
  restoreFocusRef: RefObject<HTMLElement>,
  onClose: () => void
) {
  const prevIsOpen = useRef(isOpen);

  useEffect(() => {
    if (isOpen) {
      const container = containerRef.current;
      if (!container) return;

      const focusables = container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select'
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (first) {
        setTimeout(() => first.focus(), 50);
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        } else if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last?.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first?.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    } else if (prevIsOpen.current) {
      restoreFocusRef.current?.focus();
    }
    
    prevIsOpen.current = isOpen;
  }, [isOpen, containerRef, restoreFocusRef, onClose]);
}