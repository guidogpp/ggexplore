"use client";
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { NavigationRoot } from '@/components/navigation/NavigationRoot';

export function NavigationConditional({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname === '/login';

  return (
    <>
      {children}
      {!hideNav && <NavigationRoot />}
    </>
  );
}
