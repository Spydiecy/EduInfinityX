import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './globals.css'
import ChatbotIntegration from './ChatBot'

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
      <body>
      <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    removeDelay: 1000,
    style: {
    
     
    },

    // Default options for specific types
    success: {
      duration: 3000,
      iconTheme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>

      <Navbar></Navbar>
        {children}
       
      <Footer></Footer>
  <ChatbotIntegration></ChatbotIntegration>

        </body>
        
    </html>
  )
}