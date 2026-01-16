import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login | GG explorando',
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ 
        margin: 0, 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        background: '#fafafa'
      }}>
        {children}
      </body>
    </html>
  )
}
