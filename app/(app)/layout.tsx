import { NavigationRoot } from '@/components/navigation/NavigationRoot';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <NavigationRoot />
        <main>{children}</main>
      </body>
    </html>
  );
}
