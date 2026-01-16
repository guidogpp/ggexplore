'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = useCallback(
    (href?: string) => {
      if (!href) return false;
      return pathname === href;
    },
    [pathname]
  );

  const navigate = useCallback(
    (href?: string, action?: 'refresh' | 'menu') => {
      if (action === 'refresh') {
        router.refresh();
      } else if (action === 'menu') {
        // TODO: Implementar apertura de menú sheet
        console.log('Abrir menú');
      } else if (href) {
        router.push(href);
      }
    },
    [router]
  );

  return { isActive, navigate, pathname };
}
