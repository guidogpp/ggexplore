'use client';

import { type NavItemConfig } from '@/lib/navigation/navigationConfig';
import { Icon } from './Icon';

type NavItemProps = {
  item: NavItemConfig;
  isActive: boolean;
  onPress: () => void;
  variant: 'mobile' | 'desktop';
};

export function NavItem({ item, isActive, onPress, variant }: NavItemProps) {
  return (
    <button
      onClick={onPress}
      className={`nav-item nav-item--${variant} ${isActive ? 'nav-item--active' : ''}`}
      aria-current={isActive ? 'page' : undefined}
      aria-label={item.label}
    >
      <Icon name={item.icon} className="nav-item__icon" />
      <span className="nav-item__label">{item.label}</span>
    </button>
  );
}
