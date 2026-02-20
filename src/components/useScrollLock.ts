import { useEffect } from 'react';

export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isLocked);
  }, [isLocked]);
}