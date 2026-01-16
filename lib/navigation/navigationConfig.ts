export type NavItemConfig = {
  id: string;
  label: string;
  icon: string;
  href?: string;
  action?: 'refresh' | 'menu';
  showInMobile: boolean;
  showInDesktop: boolean;
};

export const navigationItems: NavItemConfig[] = [
  {
    id: 'menu',
    label: 'Menú',
    icon: 'menu',
    action: 'menu',
    showInMobile: true,
    showInDesktop: false,
  },
  {
    id: 'account',
    label: 'Cuenta',
    icon: 'person',
    href: '/account',
    showInMobile: true,
    showInDesktop: true,
  },
  {
    id: 'refresh',
    label: 'Actualizar',
    icon: 'refresh',
    action: 'refresh',
    showInMobile: true,
    showInDesktop: true,
  },
  {
    id: 'explore',
    label: 'Explorar',
    icon: 'compass',
    href: '/explore',
    showInMobile: false,
    showInDesktop: true,
  },
  {
    id: 'home',
    label: 'Inicio',
    icon: 'home',
    href: '/',
    showInMobile: false,
    showInDesktop: true,
  },
];
