import './globals.css'

export const metadata = {
  title: 'EduInfinity-X',
  description: 'Decentralized Education Finance Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}