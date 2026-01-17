
export type NavItemConfig = {
  id: string;
  label: string;
  icon: string;
  href?: string;
  action?: 'refresh' | 'menu';
  showInMobile?: boolean;
  showInDesktop?: boolean;
  showInDrawer?: boolean;
  role?: 'admin' | 'dev';
};

export const navigationItems: NavItemConfig[] = [
  {
    id: 'home',
    label: 'Inicio',
    icon: 'home',
    href: '/',
    showInMobile: true,
    showInDesktop: true,
    showInDrawer: true,
  },
  {
    id: 'explore',
    label: 'Experimentos',
    icon: 'flask',
    href: '/explore',
    showInMobile: true,
    showInDesktop: true,
    showInDrawer: true,
  },
  {
    id: 'more',
    label: 'Más',
    icon: 'more',
    href: '/more',
    showInMobile: true,
    showInDesktop: false,
    showInDrawer: false,
  },
  {
    id: 'account',
    label: 'Cuenta',
    icon: 'person',
    href: '/account',
    showInMobile: true,
    showInDesktop: true,
    showInDrawer: true,
  },
  {
    id: 'admin',
    label: 'Admin',
    icon: 'admin',
    href: '/admin/experiments',
    showInMobile: false,
    showInDesktop: true,
    showInDrawer: true,
    role: 'admin',
  },
  {
    id: 'internal',
    label: 'Herramientas',
    icon: 'tools',
    href: '/internal/test-write',
    showInMobile: false,
    showInDesktop: false,
    showInDrawer: true,
    role: 'dev',
  },
];
