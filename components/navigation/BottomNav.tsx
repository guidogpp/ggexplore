

'use client';
import { useNavigation } from '@/hooks/useNavigation';
import { navigationItems } from '@/lib/navigation/navigationConfig';
import { NavItem } from './NavItem';

export function BottomNav() {
  const { isActive, navigate } = useNavigation();
  const mobileItems = navigationItems.filter(item => item.showInMobile);

  return (
    <nav className="bottom-nav" aria-label="Navegación principal móvil">
      {mobileItems.map(item => (
        <NavItem
          key={item.id}
          item={item}
          isActive={isActive(item.href)}
          onPress={() => navigate(item.href, item.action)}
          variant="mobile"
        />
      ))}
    </nav>
  );
}
