'use client';

import { BottomNav } from './BottomNav';
import { Header } from './Header';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function NavigationRoot() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <BottomNav /> : <Header />;
}
