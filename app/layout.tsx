import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Navbar from './components/nav/Navbar';
import Footer from './components/footer/Footer';
import { CartProvider } from '@/providers/CartProvider';
import { Toaster } from 'react-hot-toast';
import { getCurrentUser } from '@/actions/getCurrentUser';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });


export const metadata: Metadata = {
  title: 'Ecommere',
  description: 'Ecommerce website built with Next.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentuser = await getCurrentUser();

  
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster toastOptions={{style: {
          background: 'rgb(51 65 85)',
          color: '#fff'
        }}} />
        <CartProvider>
        <div className='flex flex-col min-h-screen'>
        <Navbar/>
        <main className='flex-grow' style={{backgroundColor: "#fafafa"}}>{children}</main>
        <Footer/>
        </div>
        </CartProvider>
        
        </body>
    </html>
  )
}
