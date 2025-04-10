import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { Toaster } from 'react-hot-toast'; // using react-hot-toast
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: 'Turn2Law',
  description: 'Instant Legal Help & AI Assistant',
  icons: {
    icon: "/favicon.png", // Or /favicon.png if using PNG
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <main className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
