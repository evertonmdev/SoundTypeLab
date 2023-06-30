import './globals.css';
import "@/styles/styles.scss";
import "react-toastify/dist/ReactToastify.css";

import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

import Provider from '@/components/defaults/Provider';
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'SoundTypeLab',
  description: 'Generated by create next app',
}


export default function RootLayout({ children }) {
  return (
    <Provider >
    <html lang="en">
      
        <head>
          <Script
              id='google-adsense' 
              async strategy='afterInteractive'
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7524664916655286" 
              crossorigin="anonymous"
            >
          </Script>
        </head>
        <body>
          
            {children}
            <ToastContainer />
        </body>
      <Analytics />
    </html>
    </Provider>
  )
}
