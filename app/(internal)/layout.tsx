export default function InternalLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ background: '#fffbe6' }}>
        <main>{children}</main>
      </body>
    </html>
  );
}
