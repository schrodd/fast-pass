import { Inter } from 'next/font/google'
import './globals.css'
import ToastProvider from './providers/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FastPass',
  description: 'FastPass es una aplicación que te permite ordenar comida más rápido en tus locales favoritos',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}