import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/footer'

export const metadata = {
  title: 'Turn2Law',
  description: 'Instant Legal Help & AI Assistant',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />      
        {children}
        <Footer />
      </body>
    </html>
  )
}
