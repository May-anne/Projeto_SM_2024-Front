import './globals.css'
import { ReactNode } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { FaRegEye } from "react-icons/fa6";
export const metadata = {
  title: 'EditalView 👁️‍🗨️',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={`m-0 p-0 box-border`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
