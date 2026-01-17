export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ background: '#f5f5f5' }}>
        <main>{children}</main>
      </body>
    </html>
  );
}
