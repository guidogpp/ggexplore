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
      tabIndex={0}
    >
      {/* pill glass animado solo en mobile */}
      {variant === 'mobile' && (
        <span className="nav-item__pill" aria-hidden="true" />
      )}
      <Icon name={item.icon} className="nav-item__icon" />
      <span className="nav-item__label">{item.label}</span>
    </button>
  );
}
