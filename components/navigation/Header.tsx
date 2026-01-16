'use client';

import { navigationItems } from '@/lib/navigation/navigationConfig';
import { NavItem } from './NavItem';
import { useNavigation } from '@/hooks/useNavigation';

export function Header() {
  const { isActive, navigate } = useNavigation();

  const desktopItems = navigationItems.filter(item => item.showInDesktop);
  const mainNavItems = desktopItems.filter(item => item.href && item.id !== 'account' && item.id !== 'refresh');
  const utilityItems = desktopItems.filter(item => item.id === 'account' || item.id === 'refresh');

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">ggexplore</div>
        
        <nav className="header__main-nav">
          {mainNavItems.map(item => (
            <NavItem
              key={item.id}
              item={item}
              isActive={isActive(item.href)}
              onPress={() => navigate(item.href, item.action)}
              variant="desktop"
            />
          ))}
        </nav>
      </div>

      <div className="header__right">
        {utilityItems.map(item => (
          <NavItem
            key={item.id}
            item={item}
            isActive={isActive(item.href)}
            onPress={() => navigate(item.href, item.action)}
            variant="desktop"
          />
        ))}
      </div>
    </header>
  );
}
